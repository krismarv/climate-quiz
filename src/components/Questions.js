import React from "react";

export default function Question (props) {

    if (props.questionType === "abcd") {

        let answerElements = props.answers.map(answer => {
            return (
                <div className="answer">
                    {answer}
                </div>
            )
        })

        return (
            <div className="question-container">
                <div className="question-text">{props.questionText}</div>
                {answerElements}
            </div>
            )
    }
    else return (
        <>
        </>
    )
}