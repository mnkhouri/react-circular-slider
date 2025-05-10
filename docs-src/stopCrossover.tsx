import { default as React, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CircularSlider, CircularSliderWithChildren } from "../src";

import { ApiDocs } from "./api";

export const StopCrossoverExample: React.FunctionComponent = () => {
  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const CHANGE_THRESHOLD = 10;

    const setValue1WithLimits = (
      currentValue: number,
      newValue: number,
      limit: number,
    ) => {
      if (newValue > currentValue + limit) {
        // the handle is probably crossing over from 0% -> 100%, don't move it
        setValue1(currentValue);
      } else if (newValue < currentValue - limit) {
        // the handle is probably crossing over from 100% -> 0%, don't move it
        setValue1(currentValue);
      } else {
        setValue1(newValue);
      }
    };

    return (
      <div>
        <CircularSlider
          handle1={{
            value: value1,
            onChange: (v) => setValue1WithLimits(value1, v, CHANGE_THRESHOLD),
          }}
          arcColor="#690"
        />
        Current value: {value1}
      </div>
    );
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: 200, flexShrink: 0 }}>
        <MyApp />
      </div>
      <SyntaxHighlighter language="tsx" style={syntaxStyle}>
        {`  import CircularSlider from 'react-circular-slider-svg';

    const [value1, setValue1] = useState(20);
    const CHANGE_THRESHOLD = 10;

    const setValue1WithLimits = (
      currentValue: number,
      newValue: number,
      limit: number
    ) => {
      if (newValue > currentValue + limit) {
        // the handle is probably crossing over from 0% -> 100%, don't move it
        setValue1(currentValue);
      } else if (newValue < currentValue - limit) {
        // the handle is probably crossing over from 100% -> 0%, don't move it
        setValue1(currentValue);
      } else {
        setValue1(newValue);
      }
    };

    return (
      <div>
        <CircularSlider
          handle1={{
            value: value1,
            onChange: (v) => setValue1WithLimits(value1, v, CHANGE_THRESHOLD),
          }}
          arcColor="#690"
        />
        Current value: {value1}
      </div>
    );
  };
`}
      </SyntaxHighlighter>
    </div>
  );
};
