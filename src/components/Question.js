import React from "react";
import "../css/question.css";
import Explanation from "./Explanation";
import Abcd from "./question-elements/Abcd";
import Estimate from "./question-elements/Estimate";

const Question = React.memo(function Question(props) {
  console.log(props.question.Question_type);
  let answerElements;
  switch (props.question.Question_type) {
    case "abcd":
      answerElements = (
        <Abcd
          answers={props.question.allAnswers}
          isRight={props.isRight}
          questionID={props.questionID}
          question={props.question}
          setScore={props.setScore}
          setQClicked={props.setQClicked}
        />
      );
      break;
    case "estimate":
      answerElements = (
        <Estimate
          question={props.question}
          setScore={props.setScore}
          id={props.questionID}
          setQClicked={props.setQClicked}
          finished={props.finished}
          correct={props.correct}
            setIsCorrect={props.setIsCorrect}
        />
      );
      break;
    default:
      answerElements = <></>;
  }
  // ok!!
  return (
    <div className="question-container w-full max-w-4xl m-2 p-4 bg-neutral rounded-md">
      <div className="question-text font-semibold mb-3 text-lg">
        {props.question.Question_text}
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
