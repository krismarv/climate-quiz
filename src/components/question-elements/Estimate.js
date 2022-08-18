import React from "react";
import Emoji from "../Emoji";
import "../../css/estimate.css";
import { Processor } from "postcss";

export default function Estimate(props) {
  const [estimate, setEstimate] = React.useState(
    (props.question.Min + props.question.Max) / 2
  );

  function isRight(e) {
    e.preventDefault();
    let range = document.querySelector(`#range-${props.id}`);
    range.classList.add("no-click");
    let right = Number(props.question.Right_answer);
    props.setQClicked((oldQClicked) => {
      return {
        ...oldQClicked,
        [props.id]: true,
      };
    });
    if (estimate > right - right * 0.1 && estimate < right + right * 0.1) {
      props.setScore((oldScore) => oldScore + 1);
      // state up in Quiz.js, sets all Estimates to true / false
      // state should be in Question or Estimate
      props.setIsCorrect(true);
      props.setCorrectAnswer(true);
    } else {
      props.setIsCorrect(false);
      props.setCorrectAnswer(false);
    }
  }

  React.useEffect(() => {
    if (props.reset) {
      props.setCorrectAnswer("");
      props.setReset(false)
    }
  }, [props.reset]);

  return (
    <div>
      <div className="estimate-value text-sm text-gray-600">
        Odhadněte hodnotu
      </div>
      <div className="range-container">
        <div className="minmax-container flex justify-between w-1/2 mt-5">
          <div className="min-label">{props.question.Min}</div>
          <div className="max-label">{props.question.Max}</div>
        </div>
        <input
          className="block range-input w-1/2 appearance-none rounded-full border-2 border-gray-600 "
          type="range"
          value={estimate}
          min={props.question.Min}
          max={props.question.Max}
          name="estimate"
          onChange={(e) => {
            setEstimate(e.target.value);
          }}
          id={`range-${props.id}`}
        ></input>
        <div className="current-value text-xl font-semibold mt-5  w-12 h-12">
          {estimate}
        </div>
      </div>
      {props.correctAnswer === "" ? (
        <button
          className="mt-5 text-base inline-flex"
          onClick={isRight}
          data-id={props.id}
        >
          Potvrdit
        </button>
      ) : props.correctAnswer === true ? (
        <div className="text-green-600 font-semibold text-xl">
          Trefili jste se! Správná hodnota je {props.question.Right_answer}.
        </div>
      ) : props.correctAnswer === false ? (
        <div className="text-logo font-semibold text-xl">
          Ne tak docela. Správná hodnota je {props.question.Right_answer}.
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
