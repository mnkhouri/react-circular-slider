import { default as React, useState } from "react";
import ReactDOM from "react-dom/client";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
SyntaxHighlighter.registerLanguage("tsx", tsx);

import { CircularSlider, CircularSliderWithChildren } from "../src";

import { ApiDocs } from "./api";
import { OnControlFinishedExample } from "./onControlFinished";
import { WithChildrenExample } from "./withChildren";
import { StopCrossoverExample } from "./stopCrossover";

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>React Circular Slider</h1>
        <HeadlineExample />
        <ApiDocs />
        <h3>Examples:</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Example title="Basic" />
          <Example
            title="Min value: 15, max value: 30"
            opts={{ minValue: 15, maxValue: 30 }}
          />
          <Example title="Arc color #00ff00" opts={{ arcColor: "#00ff00" }} />
          <Example
            title="Start angle: 120, end angle: 300"
            opts={{ startAngle: 120, endAngle: 300 }}
          />
          <Example
            title="Handle 1 color #800080"
            handleOpts={{ color: "#800080" }}
          />
        </div>
        <h3>Nest children inside the slider:</h3>
        You can use "CircularSliderWithChildren" to nest children inside the
        slider. All props are the same as "CircularSlider".
        <WithChildrenExample />
        <h3>Take action when user is done:</h3>
        You can use the "onControlFinished" prop to pass a function that will be
        called when the user finishes their control (i.e. onMouseUp or
        onMouseLeave). You could use this callback, for example, to write the
        final value of the control to a database.
        <OnControlFinishedExample />
        <h3>Prevent the slider from crossing the start point</h3>
        If you want to stop the slider from moving between 0% and 100% (and vice
        versa), you can use some additional logic within the "onChange"
        function.
        <StopCrossoverExample />
      </div>
    );
  }
}

const HeadlineExample: React.FunctionComponent = () => {
  const MyApp: React.FunctionComponent = () => {
    const [value1, setValue1] = useState(20);
    const [value2, setValue2] = useState(60);

    return (
      <CircularSlider
        handle1={{
          value: value1,
          onChange: (v) => setValue1(v),
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

type SliderProps = React.ComponentProps<typeof CircularSliderWithChildren>;
type ExampleProps = {
  opts?: Partial<SliderProps>;
  handleOpts?: Partial<{ color: string }>;
  title: string;
};
const Example: React.FunctionComponent<ExampleProps> = (props) => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(60);
  const [showConfig, setShowConfig] = useState(false);
  const { opts, handleOpts, title } = props;
  const config = {
    arcColor: "#690",
    ...opts,
    handle1: {
      value: value1,
      onChange: (v: number) => setValue1(v),
      ...handleOpts,
    },
  };

  return (
    <div
      style={{
        flexShrink: 0,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {title}
      <CircularSliderWithChildren {...config}>
        Slider value: {value1.toFixed()}
        <button onClick={() => setShowConfig(!showConfig)}>Show props</button>
      </CircularSliderWithChildren>
      {showConfig && (
        <SyntaxHighlighter language="javascript" style={syntaxStyle}>
          {JSON.stringify(config, null, 2)}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#main") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
