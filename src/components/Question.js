import React from "react";
import "../css/question.css";
import Explanation from "./Explanation";
import Abcd from "./question-elements/Abcd";
import Estimate from "./question-elements/Estimate";
import { authContext } from "../App";

const Question = React.memo(function Question(props) {
  let auth = React.useContext(authContext);
  let userId = auth.id;

  const [correctAnswer, setCorrectAnswer] = React.useState("");



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
          correctAnswer={correctAnswer}
          reset={props.reset}
          qClicked={props.qClicked}
        />
      );
      break;
    default:
      answerElements = <></>;
  }

  // on answering correctly, add into db (or localStorage if not logged in)
  React.useEffect(() => {
    if (correctAnswer && userId) {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/users/assign-question", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          questionId: props.question._id,
        }),
      });
    } else if (correctAnswer&&!userId) {
      let localCorrect = localStorage.getItem("correctAnswers");
      if (localCorrect) localCorrect = JSON.parse(localCorrect);
      localStorage.setItem(
        "correctAnswers",
        localCorrect?.length
          ? JSON.stringify(localCorrect.concat(props.question._id))
          : JSON.stringify([props.question._id])
      );
    }
  }, [correctAnswer, userId]);

  // 


  return (
    <div className="question-container w-11/12 max-w-4xl m-2 p-4 bg-neutral rounded-md">
      <div className="question-text font-semibold mb-3 text-lg">
        {props.question.Question_text}
      </div>
      {answerElements}
      {props.qClicked[props.questionID] && props.explanation ? (
        <Explanation question={props.question} />
      ) : (
        ""
      )}
    </div>
  );
});
export default Question;
