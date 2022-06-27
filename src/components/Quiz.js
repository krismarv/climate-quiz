import React from "react";
import Question from "./Questions";

export default function Quiz () {

    const [questions, setQuestions] = React.useState([])

    React.useEffect(()=>{
        
        fetch(process.env.REACT_APP_SERVER_URL+"/api/questions?populate=*")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.data)
            })
    }, [])


        let questionElements = questions.map (question => {

            let answers = question.attributes.Wrong_answer.map(answer => {
                return answer.Wrong_answer
            })
            answers.splice(Math.floor(Math.random()*answers.length), 0, question.attributes.Right_answer)

            return (
                <Question 
                    questionType={question.attributes.Question_type}
                    questionText={question.attributes.Question_text}
                    answers={answers}
                />
            )
        })

    return (
        <>
            {questionElements}
        </>
    )
}