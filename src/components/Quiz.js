import React from "react";
import Question from "./Question";
import Win from "./Win";
import Empty from "./Empty";
import Preloader from "./Preloader";
import { authContext } from "../App";

export default function Quiz(props) {
  let auth = React.useContext(authContext);
  let userId = auth.id;

  const [questions, setQuestions] = React.useState([]);
  const [questionElements, setQuestionElements] = React.useState("");
  const [qClicked, setQClicked] = React.useState({});
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = React.useState(10);
  const [pagination, setPagination] = React.useState(
    JSON.parse(localStorage.getItem("pagination")) || 1
  );
  const [loggedInRestart, setLoggedInRestart] = React.useState(false);
  const [questionsEmpty, setQuestionsEmpty] = React.useState(false);
  const [correct, setIsCorrect] = React.useState("");
  const [preLoader, setPreLoader] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  // initialize question list
  // should rewrite for clarity
  function initialize() {
    setQuestionsEmpty(false);
    setPreLoader(true);
    // get notQuestions array (previously correctly answered questions that will get filtered out)
    let correctAnswers = [];
    if (!userId) {
      if (localStorage.getItem("correctAnswers"))
        correctAnswers = [localStorage.getItem("correctAnswers")];
      getQuestions(correctAnswers);
    } else {
      correctAnswers = [];
      async function getCorrect() {
        let rs = await fetch(
          process.env.REACT_APP_SERVER_URL +
            `/api/users/get-user-questions/${userId}`
        );
        correctAnswers = await rs.json();
        return JSON.stringify(correctAnswers);
      }
      async function fetchWithId() {
        getQuestions(await getCorrect());
      }
      fetchWithId();
    }
    async function getQuestions(correctAnswers) {
      let rsQuiz = await fetch(
        process.env.REACT_APP_SERVER_URL +
          `/api/questions?page=${pagination}&limit=${numberOfQuestions}&notQuestions=${correctAnswers}`
      );
      let data = await rsQuiz.json();
        setPreLoader(false);
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
    }
  }

  // responsible for 2 initial renders
  React.useEffect(() => {
    if (userId) {
      initialize();
    }
  }, [userId]);

  // question JSX elements
  React.useEffect(() => {
    setQuestionElements(
      questions.map((question) => {
        return (
          <Question
            // will have to convert from raw, -att
            questionID={questions.indexOf(question)}
            qClicked={qClicked}
            key={question._id}
            question={question}
            setScore={setScore}
            setQClicked={setQClicked}
            finished={finished}
            correct={correct}
            setIsCorrect={setIsCorrect}
            reset={reset}
            // needs to be set inside Estimate so question doesn't stay marked wrong
            setReset={setReset}
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

  // NEW quiz (after NEW QUIZ button)
  // if user is not logged in, the quiz loads with pagination incremented
  // if user is logged in, the pagination doesn't increment but previously correct answers will filter out
  function restart() {
    setPagination((oldPagination) => {
      return oldPagination + 1;
    });
    setReset(true);
  }

  // does the RESTARTing
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

  // doesn't trigger rerender when logged in!
  function startAgain() {
    if (userId) {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          `/api/users/restart-questions/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      ).then((res) => {
        if (res.status > 199 && res.status < 300) {
          setPagination((old) => old + 1);
        }
      });
    } else {
      localStorage.setItem("correctAnswers", null);
      setPagination(1);
    }
  }

  return (
    <div className="page flex items-center flex-col pl-5 pr-5">
      {preLoader ? <Preloader /> : ""}
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
