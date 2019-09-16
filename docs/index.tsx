import { default as React, useState } from "react";
import ReactDOM from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CircularSlider, CircularSliderWithChildren } from "../src";

type SliderProps = React.ComponentProps<typeof CircularSliderWithChildren>;

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
        </div>
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
    />
  );
};
`}
      </SyntaxHighlighter>
    </div>
  );
};

const ApiDocs: React.FunctionComponent = () => {
  return (
    <>
      <h3>API:</h3>
      <SyntaxHighlighter language="tsx" style={syntaxStyle}>
        {`type Props = {
  size: number; // width and height of slider
  minValue: number;
  maxValue: number;
  startAngle: number; // 0 - 360 degrees
  endAngle: number; // 0 - 360 degrees
  angleType: {
    direction: "cw" | "ccw";
    axis: "+x" | "-x" | "+y" | "-y";
  };
  handleSize?: number;
  handle1: {
    value: number;
    onChange?: (value: number) => void;
  };
  handle2?: {
    value: number;
    onChange: (value: number) => void;
  };
  disabled?: boolean;
  arcColor: string;
  arcBackgroundColor?: string;
  coerceToInt?: boolean;
  outerShadow?: boolean;
};
`}
      </SyntaxHighlighter>
    </>
  );
};

type ExampleProps = { opts?: Partial<SliderProps>; title: string };
type ExampleState = { value: number; showConfig: boolean };

class Example extends React.Component<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props);
    this.state = {
      value: 20,
      showConfig: false
    };
  }

  render() {
    const { showConfig, value } = this.state;
    const { opts, title } = this.props;
    const config = {
      size: 200,
      arcColor: "#690",
      ...opts,
      handle1: {
        value: this.state.value,
        onChange: (v: number) => this.setState({ value: v })
      }
    };
    return (
      <div
        style={{
          flexShrink: 0,
          width: config.size + 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {title}
        <CircularSliderWithChildren {...config}>
          Slider value: {value.toFixed()}
          <button onClick={() => this.setState({ showConfig: !showConfig })}>
            Show config
          </button>
        </CircularSliderWithChildren>
        {showConfig && (
          <SyntaxHighlighter language="javascript" style={syntaxStyle}>
            {JSON.stringify(config, null, 2)}
          </SyntaxHighlighter>
        )}
      </div>
    );
  }
}

const domContainer = document.querySelector("#main");
ReactDOM.render(<Main />, domContainer);
