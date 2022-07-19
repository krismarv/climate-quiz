import React from "react";
import Repeater from "./Repeater";

export default function Abcd(props) {
  
  React.useEffect(() => {

    props.setQuestion((oldQuestion) => {
      return { ...oldQuestion, Wrong_answers: Object.values(props.inputState) };
    });
  }, [props.inputState]);

  return(
  <>
    <div className="input-group">
      <label>
        Správná odpověď:
        <input
          type="text"
          name="Right_answer"
          value={props.question.Right_answer || ""}
          onChange={props.handleChange}
        />
      </label>
    </div>
    <div className="form-label">Špatné odpovědi:</div>
    <Repeater
      inputState={props.inputState}
      setInputState={props.setInputState}
    />
  </>);
}
