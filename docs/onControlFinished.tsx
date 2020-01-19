import { default as React, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CircularSlider, CircularSliderWithChildren } from "../src";

import { ApiDocs } from "./api";

export const OnControlFinishedExample: React.FunctionComponent = () => {
  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const [endingValue, setEndingValue] = useState();

    return (
      <div>
        <CircularSlider
          handle1={{
            value: value1,
            onChange: v => setValue1(v)
          }}
          onControlFinished={() => setEndingValue(value1)}
          arcColor="#690"
        />
        Current value: {value1}
        <br />
        Result of last control: {endingValue}
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

  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const [endingValue, setEndingValue] = useState();

    return (
      <div>
        <CircularSlider
          handle1={{
            value: value1,
            onChange: v => setValue1(v)
          }}
          onControlFinished={() => setEndingValue(value1)}
          arcColor="#690"
        />
        Current value: {value1}
        <br />
        Result of last control: {endingValue}
      </div>
    );
  };
`}
      </SyntaxHighlighter>
    </div>
  );
};
