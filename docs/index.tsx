import * as React from "react";
import ReactDOM from "react-dom";
import { CircularSliderWithChildren } from "../src";

class Example extends React.Component<{}, { value: number }> {
  state = {
    value: 20
  };
  render() {
    return (
      <div>
        <CircularSliderWithChildren
          size={200}
          minValue={0}
          maxValue={100}
          startAngle={40}
          endAngle={320}
          angleType={{ direction: "cw", axis: "-y" }}
          arcColor={"#f00"}
          arcBackgroundColor={"#aaa"}
          handle1={{
            value: this.state.value,
            onChange: v => this.setState({ value: v })
          }}
        >
          {this.state.value.toFixed()}
        </CircularSliderWithChildren>
      </div>
    );
  }
}

const domContainer = document.querySelector("#main");
ReactDOM.render(<Example />, domContainer);
