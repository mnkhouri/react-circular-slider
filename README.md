## React Circular Slider

A full-featured circular slider React component, with full TypeScript definitions. See [the docs and examples](https://marc.khouri.ca/react-circular-slider/)

## Features:

- Simple to use
- No dependencies
- Customizable:
  - Start/stop angle
  - Min/max value
  - 0, 1, or 2 handles
- SVG based

## Example

Install [from npm](https://www.npmjs.com/package/react-circular-slider-svg): `npm i react-circular-slider-svg`

```typescript
import CircularSlider from "react-circular-slider-svg";

export default () => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(60);
  return (
    <CircularSlider
      size={200}
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
