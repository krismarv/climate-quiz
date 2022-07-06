import React from "react";
import Question from "./Question";
import Win from "./Win";
import Empty from "./Empty";

export default function Quiz (props) {
    
    const [questions, setQuestions] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState("")
    const [qClicked, setQClicked] = React.useState({})
    const [score, setScore] = React.useState(0)
    const [clicked, setClicked] = React.useState(0)
    const [finished, setFinished] = React.useState(false)
    const [numberOfQuestions, setNumberOfQuestions] = React.useState(10)
    const [pagination, setPagination] = React.useState(JSON.parse(localStorage.getItem('pagination')) || 1)
    const [questionsEmpty, setQuestionsEmpty] = React.useState(false)
    
    // initialize question list
    function initialize () {
        setQuestionsEmpty(false)
        fetch(process.env.REACT_APP_SERVER_URL+`/api/questions?populate=*&pagination[pageSize]=${numberOfQuestions}&pagination[page]=${pagination}`)
        .then(res => res.json())
        .then(data => {
    
            setQuestions(data.data);
            setQuestions(oldQuestions => {
                return oldQuestions.map(question => {
                    let answers = question.attributes.Wrong_answer.map(answer => {
                        return answer.Wrong_answer
                    })
                    answers.splice(Math.floor(Math.random()*answers.length), 0, question.attributes.Right_answer)
                    return {...question, allAnswers: answers}
                })
            })
            if (!data.data.length) {
                
                setQuestionsEmpty(true)
            }
        })
    }
    React.useEffect(()=>{
        initialize()
    }, [])


        // question JSX elements
        React.useEffect(()=> {
            
            setQuestionElements(
                questions.map (question => {
    
                    // let answers = question.attributes.Wrong_answer.map(answer => {
                    //     return answer.Wrong_answer
                    // })
                    // answers.splice(Math.floor(Math.random()*answers.length), 0, question.attributes.Right_answer)
            
                    return (
                        <Question
                            questionType={question.attributes.Question_type}
                            questionText={question.attributes.Question_text}
                            explanation={question.attributes.Explanation}
                            questionID={questions.indexOf(question)}
                            answers={question.allAnswers}
                            isRight={isRight}
                            qClicked={qClicked}
                        />
                    )
                })
            ) 
    },[questions, qClicked])

    // right answer
    function isRight (event) {
        event.preventDefault()
        let currentQ = questions[event.target.getAttribute("data-question")]

        if (event.target.getAttribute("data-value")===currentQ.attributes.Right_answer) {
            event.target.classList.add("right");
            setScore(prevScore => {return prevScore+1});
            setClicked(oldClicked => oldClicked+1)
        } else {
            event.target.classList.add("wrong");
            setClicked(oldClicked => oldClicked+1)
        }
        // remaining answers unclickable
        let allQAnswers = document.querySelectorAll(`[data-question="${String(event.target.getAttribute("data-question"))}"]`)
        allQAnswers.forEach(a=> a.classList.add("no-click"))

        setQClicked(oldQClicked => {
            return {...oldQClicked, [event.target.getAttribute("data-question")]:true}
        })
        
    }
   
    // winning
    React.useEffect(()=>{
        if (clicked === questions.length && clicked!==0) {
            setFinished(true)
        } else if (clicked === 0) {
            setFinished(false)
        }
    }, [clicked, numberOfQuestions])

    // restart the quiz
    function restart () {
        setPagination(oldPagination => {
            return oldPagination+1
        })
    }

    // persist pagination
    React.useEffect(() => {
        localStorage.setItem('pagination', JSON.stringify(pagination));
      }, [pagination]);

    function startAgain() {
        setPagination(1)
        setQClicked({})
    }

    React.useEffect(()=>{
        initialize()
        setFinished(false)
        setScore(0)
        setClicked(0)
        setQClicked({})
    }, [pagination])

    return (
        <div className="page flex items-center flex-col pl-5 pr-5">
            {questionElements}
            {finished ? <Win 
                score={score}
                numberOfQuestions={questions.length}
                restart={restart}/> : ""
                }
            {questionsEmpty ? <Empty
                startAgain={startAgain}
                /> : ""}
        </div>
    )
}