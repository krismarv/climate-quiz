import React from "react";
import Repeater from "./Repeater";

export default function Abcd(props) {
  return (
    <>
      <div className="input-group">
        <label>
          Správná odpověď:
          <input
            type="number"
            step="0.1"
            name="Right_answer"
            value={props.question.Right_answer || ""}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Min:
          <input
            type="number"
            step="0.1"
            name="Min"
            value={props.question.Min || ""}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Max
          <input
            type="number"
            step="0.1"
            name="Max"
            value={props.question.Max || ""}
            onChange={props.handleChange}
          />
        </label>
      </div>
    </>
  );
}
