import React from "react";
import { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import Error from "../Error";
import { useLocation } from "react-router-dom";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Preloader from "../Preloader";
import Question from "../Question";
import Emoji from "../Emoji";
import Win from "../Win";
import { authContext } from "../../App";

export default function LectureSingle() {

  let auth = React.useContext(authContext)
  let userID = auth.id


  const [lectureNo, setLectureNo] = React.useState();
  const [lectureData, setLectureData] = React.useState();
  const [error, setError] = React.useState(false);
  const [useLoc, setUseLoc] = React.useState(useLocation().pathname);
  const [textOutput, setTextOutput] = React.useState();
  const [noArray, setNoArray] = React.useState();
  const [preloader, setPreloader] = React.useState(false);
  const [questionData, setQuestionData] = React.useState();
  const [questionElements, setQuestionElements] = React.useState();

  // question states
  const [qClicked, setQClicked] = React.useState({});
  const [finished, setFinished] = React.useState(false);
  const [correct, setIsCorrect] = React.useState("");
  const [score, setScore] = React.useState(0);

  // get all lecture numbers
  React.useEffect(() => {
    setPreloader(true);
    fetch(process.env.REACT_APP_SERVER_URL + "/api/lectures/lecture-numbers")
      .then((res) => res.json())
      .then((data) => setNoArray(data.data));
  }, []);

  // get lecture no from URL params
  React.useEffect(() => {
    let lectureNo = useLoc.replace("/lectures/", "");
    if (parseInt(lectureNo)) {
      setLectureNo(lectureNo);
      setError(false);
    } else {
      setError(true);
    }
  }, [useLoc]);

  // fetch from db using lecture no
  React.useEffect(() => {
    if (lectureNo) {
      fetch(process.env.REACT_APP_SERVER_URL + `/api/lectures/${lectureNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error || !data.data) {
            setError(true);
          } else if (data.data) {
            setError(false);
            console.log(data.data);
            setLectureData(data.data);
            setPreloader(false);
            setTextOutput(
              generateHTML(data.data.Text, [
                StarterKit,
                Image.configure({
                  HTMLAttributes: {
                    class: "inline-image",
                  },
                  inline: true,
                }),
              ])
            );
          }
        });
    }
  }, [lectureNo]);

  React.useEffect(() => {
    if (lectureData) {
      if (lectureData.Questions.length) {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            `/api/questions?questions=${JSON.stringify(lectureData.Questions)}&limit=1000`
        )
          .then((res) => res.json())
          .then((data) => {
            let dataAll = data.map((q) => {
              if (q.Question_type === "abcd") {
                let answers = [...q.Wrong_answers];
                answers.splice(
                  Math.floor(Math.random() * answers.length),
                  0,
                  q.Right_answer
                );
                return {
                  ...q,
                  allAnswers: answers,
                };
              } else {
                return { ...q };
              }
            });
            setQuestionData(dataAll);
          });
      }
    }
  }, [lectureData]);

  React.useEffect(() => {
    if (questionData) {
      setQuestionElements(
        questionData.map((question) => {
          return (
            <Question
              explanation={question?.Explanation}
              sources={question?.Sources}
              questionID={question._id}
              qClicked={qClicked}
              key={question._id}
              question={question}
              setScore={setScore}
              setQClicked={setQClicked}
              finished={finished}
              correct={correct}
              setIsCorrect={setIsCorrect}
              answers={question.allAnswers}
            />
          );
        })
      );
    }
  }, [questionData, qClicked]);

  // winning
  React.useEffect(() => {
    if (
      Object.keys(qClicked)?.length === questionData?.length &&
      Object.keys(qClicked)?.length !== 0
    ) {
      setFinished(true);
    } else if (Object.keys(qClicked)?.length === 0) {
      setFinished(false);
    }
  }, [qClicked, questionData?.length]);

  // save finished lecture (ticks in lecture list)
  React.useEffect(()=>{
    if (finished&&userID) {
      console.log("saving")
      fetch(process.env.REACT_APP_SERVER_URL+"/api/users/finish-lecture", {
        method: "PATCH", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userID: userID, 
          lectureID: lectureData._id
        })
      })
    }
  }, [finished])

  return (
    <>
      {preloader && (
        <div className="flex justify-center">
          <Preloader />
        </div>
      )}
      {error && <Error />}
      {/* LECTURE BODY */}
      {!error && lectureData && (
        <div>
          <div className="lecture-inner">
            <h1 className="text-dark font-bold">{lectureData.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: textOutput }}></div>
          </div>
          {/* QUESTIONS */}
          {questionElements && (
            <div className="questions-section">
              <hr className="mb-5 mt-5"></hr>
              <h2 className="text-dark font-bold">
                Ověřte si znalosti <Emoji label="brain" symbol="🧠" />
              </h2>
              <div className="question-wrapper flex justify-center flex-col">
                {questionElements}
              </div>
            </div>
          )}
          {finished && (
            <Win
              score={score}
              numberOfQuestions={questionData.length}
              restart={() => {}}
              restartButtons={false}
            />
          )}
          {/* back and forth CHEVRONS */}
          <div className="arrow-container flex w-full justify-between text-2xl max-w-4xl">
            {noArray?.indexOf(lectureNo) > 0 ? (
              <a
                href={`/lectures/${noArray[noArray.indexOf(lectureNo) - 1]}`}
                className="border-none"
              >
                <ChevronLeftIcon className="h-10 w-10 text-logo" />
              </a>
            ) : (
              <div></div>
            )}
            {noArray?.indexOf(lectureNo) < noArray?.length - 1 ? (
              <a
                href={`/lectures/${noArray[noArray.indexOf(lectureNo) + 1]}`}
                className="border-none"
              >
                <ChevronRightIcon className="h-10 w-10 text-logo" />
              </a>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
