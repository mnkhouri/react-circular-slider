import * as React from "react";

export const ApiDocs: React.FunctionComponent = () => {
  const props = [
    {
      name: "size",
      required: false,
      default: "",
      type: "number",
      description: "width and height of slider",
    },
    {
      name: "minValue",
      required: false,
      default: "",
      type: "number",
      description: "",
    },
    {
      name: "maxValue",
      required: false,
      default: "",
      type: "number",
      description: "",
    },
    {
      name: "startAngle",
      required: false,
      default: "",
      type: "number",
      description: "0 - 360 degrees",
    },
    {
      name: "endAngle",
      required: false,
      default: "",
      type: "number",
      description: "0 - 360 degrees",
    },
    {
      name: "handleSize",
      required: false,
      default: "",
      type: "number",
      description: "",
    },
    {
      name: "disabled",
      required: false,
      default: "",
      type: "boolean",
      description: "",
    },
    {
      name: "arcColor",
      required: false,
      default: "",
      type: "string",
      description: "",
    },
    {
      name: "arcBackgroundColor",
      required: false,
      default: "",
      type: "string",
      description: "",
    },
    {
      name: "coerceToInt",
      required: false,
      default: "",
      type: "boolean",
      description: "",
    },
    {
      name: "outerShadow",
      required: false,
      default: "",
      type: "boolean",
      description: "",
    },
    {
      name: "angleType",
      required: false,
      default: "",
      type: {
        direction: ["cw", "ccw"],
        axis: ["+x", "-x", "+y", "-y"],
      },
      description: "",
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
      name: "handle1",
      required: false,
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
  ];
  return (
    <>
      <h3>Props:</h3>
      <table>
        <tr>
          <th>prop</th>
          <th>required</th>
          <th>type</th>
          <th>default</th>
          <th>description</th>
        </tr>
        {props.map((p) => (
          <tr key={p.name}>
            <td>{p.name}</td>
            <td>{p.required}</td>
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
