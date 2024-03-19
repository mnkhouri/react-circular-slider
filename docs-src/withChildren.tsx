import { default as React, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CircularSlider, CircularSliderWithChildren } from "../src";

export const WithChildrenExample: React.FunctionComponent = () => {
  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);

    return (
      <div>
        <CircularSliderWithChildren
          handle1={{
            value: value1,
            onChange: (v) => setValue1(v),
          }}
          arcColor="#690"
        >
          <div style={{ textAlign: "center" }}>This is a child component!</div>
        </CircularSliderWithChildren>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: 200, flexShrink: 0 }}>
        <MyApp />
      </div>
      <SyntaxHighlighter language="tsx" style={syntaxStyle}>
        {`  import { CircularSliderWithChildren } from 'react-circular-slider-svg';

  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const [endingValue, setEndingValue] = useState();

    return (
      <div>
        <CircularSliderWithChildren
          handle1={{
            value: value1,
            onChange: (v) => setValue1(v),
          }}
          arcColor="#690"
        >
          <div style={{ textAlign: "center" }}>
            This is a child component!
          </div>
        </CircularSliderWithChildren>
      </div>
    );
  };
`}
      </SyntaxHighlighter>
    </div>
  );
};
