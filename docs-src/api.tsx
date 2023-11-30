import * as React from "react";

export const ApiDocs: React.FunctionComponent = () => {
  const props = [
    {
      name: "size",
      required: false,
      default: "200",
      type: "number",
      description: "Width and height of slider",
    },
    {
      name: "trackWidth",
      required: false,
      default: "4",
      type: "number",
      description: "Width of the track",
    },
    {
      name: "handle1",
      required: true,
      default: "",
      type: {
        value: "number",
        onChange: "(v: number) => void",
      },
      description: "",
    },
    {
      name: "handle2",
      required: false,
      default: "",
      type: {
        value: "number",
        onChange: "(v: number) => void",
      },
      description: "",
    },
    {
      name: "minValue",
      required: false,
      default: "0",
      type: "number",
      description: "Minimum value of the handle(s)",
    },
    {
      name: "maxValue",
      required: false,
      default: "100",
      type: "number",
      description: "Minimum value of the handle(s)",
    },
    {
      name: "coerceToInt",
      required: false,
      default: "false",
      type: "boolean",
      description: "Coerces the value of the handle to an integer",
    },
    {
      name: "handleSize",
      required: false,
      default: "8",
      type: "number",
      description: "Size of the handle(s)",
    },
    {
      name: "startAngle",
      required: false,
      default: "0",
      type: "number",
      description: "Start of the track, 0 - 360 degrees",
    },
    {
      name: "endAngle",
      required: false,
      default: "360",
      type: "number",
      description: "End of the track, 0 - 360 degrees",
    },
    {
      name: "angleType",
      required: false,
      default: '{direction: "cw", axis: "-y"}',
      type: {
        direction: ["cw", "ccw"],
        axis: ["+x", "-x", "+y", "-y"],
      },
      description: "Coordinate system for the startAngle and endAngle",
    },
    {
      name: "arcColor",
      required: true,
      default: "",
      type: "string",
      description: "",
    },
    {
      name: "arcBackgroundColor",
      required: false,
      default: "#aaa",
      type: "string",
      description: "Background color for the arc",
    },

    {
      name: "outerShadow",
      required: false,
      default: "false",
      type: "boolean",
      description: "Draws a shadow outside the arc",
    },
    {
      name: "onControlFinished",
      required: false,
      default: "",
      type: "( ) => void",
      description:
        "Called when the user is done controlling (i.e. mouseUp / mouseLeave)",
    },
    {
      name: "disabled",
      required: false,
      default: "false",
      type: "boolean",
      description: "Makes the slider read-only",
    },
  ];
  return (
    <>
      <h3>Props:</h3>
      <table>
        <tr>
          <th style={{ textAlign: "left" }}>prop</th>
          <th style={{ textAlign: "left" }}>required</th>
          <th style={{ textAlign: "left" }}>type</th>
          <th style={{ textAlign: "left" }}>default</th>
          <th style={{ textAlign: "left" }}>description</th>
        </tr>
        {props.map((p) => (
          <tr key={p.name}>
            <td>{p.name}</td>
            <td>{p.required ? <b>Yes</b> : "No"}</td>
            <td>
              {typeof p.type === "string" ? p.type : JSON.stringify(p.type)}
            </td>
            <td>{p.default}</td>
            <td>{p.description}</td>
          </tr>
        ))}
      </table>
    </>
  );
};
