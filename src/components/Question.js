import React from "react";
import "../css/question.css";
import Explanation from "./Explanation";
import Abcd from "./question-elements/Abcd";
import Estimate from "./question-elements/Estimate";

const Question = React.memo(function Question(props) {

  const [correctAnswer, setCorrectAnswer] = React.useState()
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
          correct={props.correct}
          setIsCorrect={props.setIsCorrect}
          setCorrectAnswer={setCorrectAnswer}
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
          setCorrectAnswer={setCorrectAnswer}
        />
      );
      break;
    default:
      answerElements = <></>;
  }
  
  // on answering correctly, add into db
  React.useEffect(()=>{
    if (correctAnswer) {
      console.log("Now sending");
      fetch(process.env.REACT_APP_SERVER_URL+"/api/users/assign-question", {
        method: "PATCH",
        headers: {"Content-type": "application/json"}, 
        body: {
          
        }
      })
    }
  },[ correctAnswer])

  return (
    <div className="question-container w-11/12 max-w-4xl m-2 p-4 bg-neutral rounded-md">
      <div className="question-text font-semibold mb-3 text-lg">
        {props.question.Question_text}
      </div>
      {answerElements}
      {props.qClicked[props.questionID] && props.explanation ? (
        <Explanation question={props.question}/>
      ) : (
        ""
      )}
    </div>
  );
});
export default Question;
