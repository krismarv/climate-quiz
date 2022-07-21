import React from "react";
import "../css/question.css";
import Explanation from "./Explanation";
import Abcd from "./question-elements/Abcd";

const Question = React.memo(function Question(props) {
  let answerElements;
  switch (props.questionType) {
    case "abcd":
      answerElements = (
        <Abcd
          answers={props.answers}
          isRight={props.isRight}
          questionID={props.questionID}
        />
      );
      break;
    default:
      answerElements = (
        <Abcd
          answers={props.answers}
          isRight={props.isRight}
          questionID={props.questionID}
        />
      );
  }
  // ok!!
  return (
    <div className="question-container w-full max-w-4xl m-2 p-4 bg-neutral rounded-md">
      <div className="question-text font-semibold mb-3 text-lg">
        {props.questionText}
      </div>
      {answerElements}
      {props.qClicked[props.questionID] && props.explanation ? (
        <Explanation explanation={props.explanation} sources={props.sources} />
      ) : (
        ""
      )}
    </div>
  );
});
export default Question;
