import React from "react";

export default function Abcd (props) {

  // specific to abcd!!
  function isRight(event) {
    event.preventDefault();
    let currentQ = props.question[event.target.getAttribute("data-question")];

    if (event.target.getAttribute("data-value") === props.question.Right_answer) {
      event.target.classList.add("right");
      props.setScore((prevScore) => {
        return prevScore + 1;
      });
    } else {
      event.target.classList.add("wrong");
    }
    // remaining answers unclickable
    let allQAnswers = document.querySelectorAll(
      `[data-question="${String(event.target.getAttribute("data-question"))}"]`
    );
    allQAnswers.forEach((a) => a.classList.add("no-click"));

    props.setQClicked((oldQClicked) => {
      return {
        ...oldQClicked,
        [event.target.getAttribute("data-question")]: true,
      };
    });
  }

    let answerElements = props.answers.map((answer, index) => {
        return (
          <div
            className="answer inline-flex m-2 p-4 border-2 border-gray-600 rounded-full cursor-pointer hover:font-semibold hover:text-gray-600"
            onClick={isRight}
            data-question={props.questionID}
            data-value={answer}
            key={index}
          >
            {answer}
          </div>
        );
})
    return answerElements
}