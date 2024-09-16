## React Circular Slider

A full-featured circular slider React component, with full TypeScript definitions. See [the docs and examples](https://marc.khouri.ca/react-circular-slider/).
This fork contains additional features which includes addition of gradiant background for the slider.

## Features:

- Simple to use
- No dependencies
- Customizable:
  - Start/stop angle
  - Min/max value
  - 0, 1, or 2 handles
- SVG based

## Example 1


```typescript
import CircularSlider from "react-circular-slider-svg";

export default () => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(60);
  return (
    <CircularSlider
      size={200}
      trackWidth={4}
      minValue={0}
      maxValue={100}
      startAngle={40}
      endAngle={320}
      angleType={{
        direction: "cw",
        axis: "-y"
      }}
      handle1={{
        value: value1,
        onChange: v => setValue1(v)
      }}
      handle2={{
        value: value2,
        onChange: v => setValue2(v)
      }}
      arcColor="#690"
      arcBackgroundColor="#aaa"
    />
  );
};
```

## Example 2


```typescript
import CircularSlider from "react-circular-slider-svg";

export default () => {
  const [value1, setValue1] = useState(20);
  return (
    <CircularSlider
        size={200}
        trackWidth={10}
        minValue={0}
        maxValue={100}
        startAngle={90}
        endAngle={270}
        angleType={{
          direction: "cw",
          axis: "-y"
        }}
        handle1={{
          value: value1,
          onChange: v => setValue1(v)
        }}
        arcColor="transparent"
        handleSize={10}
        handleColor='#00008B'
        handleStrokeColor='white'
        handleStrokeWidth='5'
        arcBackgroundColor="url(#colorRainbow)"
        arcSecondaryColor='#aaa'
        svgDefs={<linearGradient
          id="colorRainbow"
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0117206" stop-color="#F45A57" />
          <stop offset="0.457758" stop-color="#FBC445" />
          <stop offset="1" stop-color="#74B96A" />
        </linearGradient>}
      />
  );
};
```
## Output


![Gradient Slider](docs/gradient-slider.png?raw=true "Gradient Slider")
