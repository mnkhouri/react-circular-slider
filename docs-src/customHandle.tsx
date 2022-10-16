import { default as React, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CircularSlider, CircularSliderWithChildren } from "../src";

import { ApiDocs } from "./api";

export const CustomHandleExample: React.FunctionComponent = () => {
  const MyCustomHandle: React.FunctionComponent = () => (
    <React.Fragment>
      <filter id="handleShadow" x="-50%" y="-50%" width="16" height="16">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
      <polygon
        points="100,10 40,198 190,78 10,78 160,198"
        fill="lime"
        stroke="purple"
        strokeWidth="5"
        fillRule="evenodd"
      />
    </React.Fragment>
  );

  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const [value2, setValue2] = useState(60);

    return (
      <CircularSlider
        handle1={{
          value: value1,
          onChange: (v) => setValue1(v),
          customComponent: MyCustomHandle,
        }}
        handle2={{
          value: value2,
          onChange: (v) => setValue2(v),
        }}
        arcColor="#690"
        startAngle={40}
        endAngle={320}
      />
    );
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: 200, flexShrink: 0 }}>
        <MyApp />
      </div>
      <SyntaxHighlighter language="tsx" style={syntaxStyle}>
        {`import CircularSlider from 'react-circular-slider-svg';

const MyCustomHandle =

const MyApp = () => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(60);

  return (
    <CircularSlider
      handle1={{
        value: value1,
        onChange: v => setValue1(v)
      }}
      handle2={{
        value: value2,
        onChange: v => setValue2(v)
      }}
      arcColor="#690"
      startAngle={40}
      endAngle={320}
    />
  );
};
`}
      </SyntaxHighlighter>
    </div>
  );
};
