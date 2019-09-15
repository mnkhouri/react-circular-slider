export function angleToValue(params: {
  angle: number;
  minValue: number;
  maxValue: number;
  startAngle: number;
  endAngle: number;
}) {
  const { angle, minValue, maxValue, startAngle, endAngle } = params;
  if (endAngle <= startAngle) {
    // math assumes endAngle > startAngle
    throw new Error("endAngle must be greater than startAngle");
  }

  if (angle < startAngle) {
    return minValue;
  } else if (angle > endAngle) {
    return maxValue;
  } else {
    const ratio = (angle - startAngle) / (endAngle - startAngle);
    const value = ratio * (maxValue - minValue) + minValue;
    return value;
  }
}

export function valueToAngle(params: {
  value: number;
  minValue: number;
  maxValue: number;
  startAngle: number;
  endAngle: number;
}) {
  const { value, minValue, maxValue, startAngle, endAngle } = params;
  if (endAngle <= startAngle) {
    // math assumes endAngle > startAngle
    throw new Error("endAngle must be greater than startAngle");
  }
  const ratio = (value - minValue) / (maxValue - minValue);
  const angle = ratio * (endAngle - startAngle) + startAngle;
  return angle;
}

export type AngleDescription = {
  direction: "cw" | "ccw";
  axis: "+x" | "-x" | "+y" | "-y";
};

export type AngleWithDescription = {
  degree: number;
} & AngleDescription;

function convertAngle(
  degree: number,
  from: AngleDescription,
  to?: AngleDescription
) {
  to = to || { direction: "ccw", axis: "+x" };

  if (from.direction !== to.direction) {
    degree = degree === 0 ? 0 : 360 - degree;
  }

  if (from.axis === to.axis) {
    // e.g. +x to +x
    return degree;
  }

  if (from.axis[1] === to.axis[1]) {
    // e.g. +x to -x
    return (180 + degree) % 360;
  }

  switch (to.direction + from.axis + to.axis) {
    case "ccw+x-y":
    case "ccw-x+y":
    case "ccw+y+x":
    case "ccw-y-x":
    case "cw+y-x":
    case "cw-y+x":
    case "cw-x-y":
    case "cw+x+y":
      return (90 + degree) % 360;
    case "ccw+y-x":
    case "ccw-y+x":
    case "ccw+x+y":
    case "ccw-x-y":
    case "cw+x-y":
    case "cw-x+y":
    case "cw+y+x":
    case "cw-y-x":
      return (270 + degree) % 360;
    default:
      // This is impossible, just for TS
      throw new Error("Unhandled conversion");
  }
}

export function angleToPosition(
  angle: AngleWithDescription,
  radius: number,
  svgSize: number
) {
  // js functions need radians, counterclockwise from positive x axis
  const angleConverted = convertAngle(angle.degree, angle, {
    direction: "ccw",
    axis: "+x"
  });
  const angleInRad = (angleConverted / 180) * Math.PI;
  let dX: number;
  let dY: number;

  if (angleInRad <= Math.PI) {
    // we are in the upper two quadrants
    if (angleInRad <= Math.PI / 2) {
      dY = Math.sin(angleInRad) * radius;
      dX = Math.cos(angleInRad) * radius;
    } else {
      dY = Math.sin(Math.PI - angleInRad) * radius;
      dX = Math.cos(Math.PI - angleInRad) * radius * -1;
    }
  } else {
    // we are in the lower two quadrants
    if (angleInRad <= Math.PI * 1.5) {
      dY = Math.sin(angleInRad - Math.PI) * radius * -1;
      dX = Math.cos(angleInRad - Math.PI) * radius * -1;
    } else {
      dY = Math.sin(2 * Math.PI - angleInRad) * radius * -1;
      dX = Math.cos(2 * Math.PI - angleInRad) * radius;
    }
  }

  // dX and dY are calculated based on having (0, 0) at the center
  // Now, translate dX and dY to svg coordinates, where (0, 0) is at the top left
  const x = dX + svgSize / 2;
  const y = svgSize / 2 - dY;

  return { x, y };
}

export function positionToAngle(
  position: { x: number; y: number },
  svgSize: number,
  angleType: AngleDescription
) {
  const dX = position.x - svgSize / 2;
  const dY = svgSize / 2 - position.y; // position.y increases downwards in svg
  let theta = Math.atan2(dY, dX); // radians, counterclockwise from positive x axis
  if (theta < 0) {
    theta = theta + 2 * Math.PI;
  }
  const degree = (theta / Math.PI) * 180; // degrees, counterclockwise from positive x axis
  return convertAngle(
    degree,
    {
      direction: "ccw",
      axis: "+x"
    },
    angleType
  );
}

export function semiCircle(opts: {
  startAngle: number;
  endAngle: number;
  angleType: AngleDescription;
  radius: number;
  svgSize: number;
  direction: "cw" | "ccw";
}) {
  const { startAngle, endAngle, radius, svgSize, direction, angleType } = opts;
  const startPosition = angleToPosition(
    { degree: startAngle, ...angleType },
    radius,
    svgSize
  );
  const endPosition = angleToPosition(
    { degree: endAngle, ...angleType },
    radius,
    svgSize
  );
  return `
    M ${svgSize / 2},${svgSize / 2}
    L ${startPosition.x},${startPosition.y}
    A ${radius} ${radius} 0 ${direction === "cw" ? "1 1" : "0 0"}
      ${endPosition.x} ${endPosition.y}
    Z
  `;
}
