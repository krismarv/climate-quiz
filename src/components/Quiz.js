import React from "react";
import Question from "./Question";
import Win from "./Win";
import Empty from "./Empty";
import Preloader from "./Preloader";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";


export default function Quiz(props) {
  const [questions, setQuestions] = React.useState([]);
  const [questionElements, setQuestionElements] = React.useState("");
  const [qClicked, setQClicked] = React.useState({});
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = React.useState(10);
  const [pagination, setPagination] = React.useState(
    JSON.parse(localStorage.getItem("pagination")) || 1
  );
  const [questionsEmpty, setQuestionsEmpty] = React.useState(false);
  const [correct, setIsCorrect] = React.useState("");
  const [preLoader, setPreLoader] = React.useState(false)

  // initialize question list
  function initialize() {
    setQuestionsEmpty(false);
    setPreLoader(true)
    fetch(process.env.REACT_APP_SERVER_URL + `/api/questions?page=${pagination}&limit=${numberOfQuestions}`)
      .then((res) => res.json())
      .then((data) => {
        setPreLoader(false)
        let dataAll = data.map((question) => {
          if (question.Question_type === "abcd") {
            let answers = [...question.Wrong_answers];
            answers.splice(
              Math.floor(Math.random() * answers.length),
              0,
              question.Right_answer
            );
            return { ...question, allAnswers: answers };
          } else {
            return { ...question };
          }
        });
        setQuestions(dataAll);
        if (!data.length) {
          setQuestionsEmpty(true);
        }
        return data;
      });
  }

  // responsible for 2 initial renders
  React.useEffect(() => {
    initialize();
  }, []);

  // question JSX elements
  React.useEffect(() => {
    setQuestionElements(
      questions.map((question) => {
        return (
          <Question
            // will have to convert from raw, -att
            explanation={"jj"}
            sources={"question.Sources"}
            questionID={questions.indexOf(question)}
            qClicked={qClicked}
            key={question._id}
            question={question}
            setScore={setScore}
            setQClicked={setQClicked}
            finished={finished}
            correct={correct}
            setIsCorrect={setIsCorrect}
          />
        );
      })
    );
  }, [questions, qClicked]);

  // winning
  React.useEffect(() => {
    if (
      Object.keys(qClicked).length === questions.length &&
      Object.keys(qClicked).length !== 0
    ) {
      setFinished(true);
    } else if (Object.keys(qClicked).length === 0) {
      setFinished(false);
    }
  }, [qClicked, numberOfQuestions, questions.length]);

  // restart the quiz
  function restart() {
    setPagination((oldPagination) => {
      return oldPagination + 1;
    });
    // setQClicked({});
    
    // initialize();
    // setFinished(false);
    // setScore(0);
    // setIsCorrect("");
  }

  // persist pagination
  React.useEffect(() => {
    localStorage.setItem("pagination", JSON.stringify(pagination));
    let allQAnswers = document.querySelectorAll(".answer");
    allQAnswers.forEach((a) => {
      a.classList.remove("no-click");
      a.classList.remove("wrong");
      a.classList.remove("right");
    });
    let rangeInputs = document.querySelectorAll(".range-input");
    rangeInputs.forEach((r) => {
      r.classList.remove("no-click");
    });
    initialize();
    setQClicked({});
    setFinished(false);
    setScore(0);
    setIsCorrect("");
  }, [pagination]);

  function startAgain() {
    setPagination(1);
    console.log("setting pagination")
  }

  return (
    <div className="page flex items-center flex-col pl-5 pr-5">
      {preLoader ?  <Preloader/> : ""}
      {questionElements}
      {finished ? (
        <Win
          score={score}
          numberOfQuestions={questions.length}
          restart={restart}
          restartButtons={true}
        />
      ) : (
        ""
      )}
      {questionsEmpty ? <Empty startAgain={startAgain} /> : ""}
    </div>
  );
}
