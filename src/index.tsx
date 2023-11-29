import * as React from "react";
import {
  angleToPosition,
  positionToAngle,
  AngleDescription,
  valueToAngle,
  angleToValue,
} from "./circularGeometry";
import { arcPathWithRoundedEnds } from "./svgPaths";

type Props = {
  size: number;
  minValue: number;
  maxValue: number;
  startAngle: number; // 0 - 360 degrees
  endAngle: number; // 0 - 360 degrees
  angleType: AngleDescription;
  handleSize: number;
  handle1: {
    value: number;
    onChange?: (value: number) => void;
  };
  handle2?: {
    value: number;
    onChange: (value: number) => void;
  };
  onControlFinished?: () => void;
  disabled?: boolean;
  arcColor: string;
  arcBackgroundColor: string;
  coerceToInt?: boolean;
  outerShadow?: boolean;
};

export class CircularSlider extends React.Component<
  React.PropsWithChildren<Props>
> {
  static defaultProps: Pick<
    Props,
    | "size"
    | "minValue"
    | "maxValue"
    | "startAngle"
    | "endAngle"
    | "angleType"
    | "arcBackgroundColor"
    | "handleSize"
  > = {
    size: 200,
    minValue: 0,
    maxValue: 100,
    startAngle: 0,
    endAngle: 360,
    angleType: {
      direction: "cw",
      axis: "-y",
    },
    handleSize: 8,
    arcBackgroundColor: "#aaa",
  };
  svgRef = React.createRef<SVGSVGElement>();

  onMouseEnter = (ev: React.MouseEvent<SVGSVGElement>) => {
    if (ev.buttons === 1) {
      // The left mouse button is pressed, act as though user clicked us
      this.onMouseDown(ev);
    }
  };

  onMouseDown = (ev: React.MouseEvent<SVGSVGElement>) => {
    const svgRef = this.svgRef.current;
    if (svgRef) {
      svgRef.addEventListener("mousemove", this.handleMousePosition);
      svgRef.addEventListener("mouseleave", this.removeMouseListeners);
      svgRef.addEventListener("mouseup", this.removeMouseListeners);
    }
    this.handleMousePosition(ev);
  };

  removeMouseListeners = () => {
    const svgRef = this.svgRef.current;
    if (svgRef) {
      svgRef.removeEventListener("mousemove", this.handleMousePosition);
      svgRef.removeEventListener("mouseleave", this.removeMouseListeners);
      svgRef.removeEventListener("mouseup", this.removeMouseListeners);
    }
    if (this.props.onControlFinished) {
      this.props.onControlFinished();
    }
  };

  handleMousePosition = (ev: React.MouseEvent<SVGSVGElement> | MouseEvent) => {
    const x = ev.clientX;
    const y = ev.clientY;
    this.processSelection(x, y);
  };

  onTouch = (ev: React.TouchEvent<SVGSVGElement>) => {
    /* This is a very simplistic touch handler. Some optimzations might be:
        - Right now, the bounding box for a touch is the entire element. Having the bounding box
          for touched be circular at a fixed distance around the slider would be more intuitive.
        - Similarly, don't set `touchAction: 'none'` in CSS. Instead, call `ev.preventDefault()`
          only when the touch is within X distance from the slider
    */

    // This simple touch handler can't handle multiple touches. Therefore, bail if there are either:
    // - more than 1 touches currently active
    // - a touchEnd event, but there is still another touch active
    if (
      ev.touches.length > 1 ||
      (ev.type === "touchend" && ev.touches.length > 0)
    ) {
      return;
    }

    // Process the new position
    const touch = ev.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    this.processSelection(x, y);

    // If the touch is ending, fire onControlFinished
    if (ev.type === "touchend" || ev.type === "touchcancel") {
      if (this.props.onControlFinished) {
        this.props.onControlFinished();
      }
    }
  };

  processSelection = (x: number, y: number) => {
    const {
      size,
      maxValue,
      minValue,
      angleType,
      startAngle,
      endAngle,
      handle1,
      disabled,
      handle2,
      coerceToInt,
    } = this.props;
    if (!handle1.onChange) {
      // Read-only, don't bother doing calculations
      return;
    }
    const svgRef = this.svgRef.current;
    if (!svgRef) {
      return;
    }
    // Find the coordinates with respect to the SVG
    const svgPoint = svgRef.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;
    const coordsInSvg = svgPoint.matrixTransform(
      svgRef.getScreenCTM()?.inverse()
    );

    const angle = positionToAngle(coordsInSvg, size, angleType);
    let value = angleToValue({
      angle,
      minValue,
      maxValue,
      startAngle,
      endAngle,
    });
    if (coerceToInt) {
      value = Math.round(value);
    }

    if (!disabled) {
      if (
        handle2 &&
        handle2.onChange &&
        // make sure we're closer to handle 2 -- i.e. controlling handle2
        Math.abs(value - handle2.value) < Math.abs(value - handle1.value)
      ) {
        handle2.onChange(value);
      } else {
        handle1.onChange(value);
      }
    }
  };

  render() {
    const {
      size,
      handle1,
      handle2,
      handleSize,
      maxValue,
      minValue,
      startAngle,
      endAngle,
      angleType,
      disabled,
      arcColor,
      arcBackgroundColor,
      outerShadow,
    } = this.props;
    const trackWidth = 4;
    const shadowWidth = 20;
    const trackInnerRadius = size / 2 - trackWidth - shadowWidth;
    const handle1Angle = valueToAngle({
      value: handle1.value,
      minValue,
      maxValue,
      startAngle,
      endAngle,
    });
    const handle2Angle =
      handle2 &&
      valueToAngle({
        value: handle2.value,
        minValue,
        maxValue,
        startAngle,
        endAngle,
      });
    const handle1Position = angleToPosition(
      { degree: handle1Angle, ...angleType },
      trackInnerRadius + trackWidth / 2,
      size
    );
    const handle2Position =
      handle2Angle &&
      angleToPosition(
        { degree: handle2Angle, ...angleType },
        trackInnerRadius + trackWidth / 2,
        size
      );

    const controllable = !disabled && Boolean(handle1.onChange);

    return (
      <svg
        width={size}
        height={size}
        ref={this.svgRef}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onClick={
          /* TODO: be smarter about this -- for example, we could run this through our
          calculation and determine how close we are to the arc, and use that to decide
          if we propagate the click. */
          (ev) => controllable && ev.stopPropagation()
        }
        onTouchStart={this.onTouch}
        onTouchEnd={this.onTouch}
        onTouchMove={this.onTouch}
        onTouchCancel={this.onTouch}
        style={{ touchAction: "none" }}
      >
        {
          /* Shadow */
          outerShadow && (
            <React.Fragment>
              <radialGradient id="outerShadow">
                <stop offset="90%" stopColor={arcColor} />
                <stop offset="100%" stopColor="white" />
              </radialGradient>

              <circle
                fill="none"
                stroke="url(#outerShadow)"
                cx={size / 2}
                cy={size / 2}
                // Subtract an extra pixel to ensure there's never any gap between slider and shadow
                r={trackInnerRadius + trackWidth + shadowWidth / 2 - 1}
                strokeWidth={shadowWidth}
              />
            </React.Fragment>
          )
        }

        {handle2Angle === undefined ? (
          /* One-handle mode */
          <React.Fragment>
            {/* Arc Background  */}
            <path
              d={arcPathWithRoundedEnds({
                startAngle: handle1Angle,
                endAngle,
                angleType,
                innerRadius: trackInnerRadius,
                thickness: trackWidth,
                svgSize: size,
                direction: angleType.direction,
              })}
              fill={arcBackgroundColor}
            />
            {/* Arc (render after background so it overlays it) */}
            <path
              d={arcPathWithRoundedEnds({
                startAngle,
                endAngle: handle1Angle,
                angleType,
                innerRadius: trackInnerRadius,
                thickness: trackWidth,
                svgSize: size,
                direction: angleType.direction,
              })}
              fill={arcColor}
            />
          </React.Fragment>
        ) : (
          /* Two-handle mode */
          <React.Fragment>
            {/* Arc Background Part 1  */}
            <path
              d={arcPathWithRoundedEnds({
                startAngle,
                endAngle: handle1Angle,
                angleType,
                innerRadius: trackInnerRadius,
                thickness: trackWidth,
                svgSize: size,
                direction: angleType.direction,
              })}
              fill={arcBackgroundColor}
            />
            {/* Arc Background Part 2  */}
            <path
              d={arcPathWithRoundedEnds({
                startAngle: handle2Angle,
                endAngle,
                angleType,
                innerRadius: trackInnerRadius,
                thickness: trackWidth,
                svgSize: size,
                direction: angleType.direction,
              })}
              fill={arcBackgroundColor}
            />
            {/* Arc (render after background so it overlays it) */}
            <path
              d={arcPathWithRoundedEnds({
                startAngle: handle1Angle,
                endAngle: handle2Angle,
                angleType,
                innerRadius: trackInnerRadius,
                thickness: trackWidth,
                svgSize: size,
                direction: angleType.direction,
              })}
              fill={arcColor}
            />
          </React.Fragment>
        )}

        {
          /* Handle 1 */
          controllable && (
            <React.Fragment>
              <filter
                id="handleShadow"
                x="-50%"
                y="-50%"
                width="16"
                height="16"
              >
                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                <feColorMatrix
                  result="matrixOut"
                  in="offOut"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feGaussianBlur
                  result="blurOut"
                  in="matrixOut"
                  stdDeviation="5"
                />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
              <circle
                r={handleSize}
                cx={handle1Position.x}
                cy={handle1Position.y}
                fill="#ffffff"
                filter="url(#handleShadow)"
              />
            </React.Fragment>
          )
        }

        {
          /* Handle 2 */
          handle2Position && (
            <React.Fragment>
              <circle
                r={handleSize}
                cx={handle2Position.x}
                cy={handle2Position.y}
                fill="#ffffff"
                filter="url(#handleShadow)"
              />
            </React.Fragment>
          )
        }
      </svg>
    );
  }
}

export class CircularSliderWithChildren extends React.Component<
  React.PropsWithChildren<Props>
> {
  static defaultProps = CircularSlider.defaultProps;
  render() {
    const { size } = this.props;
    return (
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
        }}
      >
        <CircularSlider {...this.props} />
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CircularSlider;
