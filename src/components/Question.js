import React from "react";
import "../css/question.css"
import Explanation from "./Explanation";

export default function Question (props) {
    // ok!!
    if (props.questionType === "abcd") {

        console.log(props.qClicked)

        let answerElements = props.answers.map(answer => {
            return (
                <div 
                    className="answer inline-flex m-2 p-4 border-2 border-gray-600 rounded-full cursor-pointer hover:font-semibold hover:text-gray-600"
                    onClick={props.isRight}
                    data-question={props.questionID}
                    data-value={answer}>
                    {answer}
                </div>
            )
        })
       console.log(props.qClicked) 
        return (
            <div className="question-container w-full max-w-4xl m-2 p-4 bg-neutral rounded-md">
                <div className="question-text font-semibold mb-3 text-lg">{props.questionText}</div>
                {answerElements}
                {props.qClicked[props.questionID]&&props.explanation ? <Explanation explanation={props.explanation}/> : ""}
            </div>
            )
    }
    else return (
        <>
        </>
    )
}