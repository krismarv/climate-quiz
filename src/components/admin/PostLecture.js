import React from "react";
import "../../css/post-form.css";
import Question from "../Question";
import Emoji from "../Emoji";
import xImage from "../../x.png";
import TiptapMenu from "../TiptapMenu";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function PostLecture() {
  const [editorContent, setEditorContent] = React.useState();
  const [questions, setQuestions] = React.useState();
  const [questionOptions, setQuestionOptions] = React.useState();
  const [activeQuestion, setActiveQuestion] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);
  const [input, setInput] = React.useState({});

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: `
      <h2>
        Hi there,
      </h2>
    `,
    onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
    },
  });

  // load questions, create question elements
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/questions?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        let newData = data.map((q) => {
          if (q.Question_type === "abcd") {
            let allAnswers = q.Wrong_answers.concat(q.Right_answer);
            q.allAnswers = allAnswers;
            return q;
          } else {
            return q;
          }
        });
        setQuestions(newData);
        setQuestionOptions(
          data.map((q) => {
            return (
              <div
                className="question-option"
                data-value={q._id}
                onClick={clickQuestion}
              >
                {q.Question_text}
              </div>
            );
          })
        );
      });
  }, []);

  React.useEffect(() => {
    active && setActiveQuestion(questions.filter((q) => q._id === active)[0]);
  }, [questions, active]);

  // onclick questions
  function clickQuestion(e) {
    e.preventDefault();
    setActive(e.target.getAttribute("data-value"));
    document
      .querySelectorAll(".question-option")
      .forEach((e) => e.classList.remove("active"));
    e.target.classList.add("active");
  }

  // select question
  function selectQuestion(e) {
    e.preventDefault();
    setSelectedQuestions((old) => {
      return old.concat(activeQuestion);
    });
  }

  function removeSelected(e) {
    setSelectedQuestions((old) => {
      return old.filter((q) => q._id != e.target.getAttribute("data-id"));
    });
  }
  function handleInputChange(e) {
    setInput((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }

  React.useEffect(() => {
    setInput((old) => {
      return {
        ...old,
        Questions: selectedQuestions.map((q) => q._id),
      };
    });
  }, [selectedQuestions]);

  React.useEffect(() => {
    setInput((old) => {
      return {
        ...old,
        Text: editorContent,
      };
    });
  }, [editorContent]);

  function formSubmit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER_URL + "/api/lectures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }
  return (
    <form className="">
      <label htmlFor="number" className="mr-5">
        Číslo přednášky
      </label>
      <input
        type="number"
        name="number"
        step="1"
        min="1"
        value={input.number}
        onChange={handleInputChange}
      ></input>
      <label htmlFor="lecture-name" className="mr-5">
        Jméno přednášky
      </label>
      <input
        type="text"
        name="name"
        className="w-full"
        value={input.name}
        onChange={handleInputChange}
      ></input>
      <div className="form-label">Text:</div>

      <div className="editor-wrapper">
        <TiptapMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <label htmlFor="question-select">Vybrat otázku</label>
      <div name="question-select" className="bg-white p-5 overflow-scroll h-32">
        {questionOptions}
      </div>
      {activeQuestion && (
        <>
          Náhled:
          <div className="grayscale opacity-60 p-5 pointer-events-none">
            <Question
              explanation=""
              sources=""
              questionID={activeQuestion._id}
              qClicked={false}
              key={activeQuestion._id}
              question={activeQuestion}
              setScore={() => {}}
              setQClicked={() => {}}
              finished={false}
              correct={false}
              setIsCorrect={() => {}}
              answers={activeQuestion.allAnswers}
              reset={false}
              setReset={()=>{}}
            />
          </div>
        </>
      )}
      <button className="check-button" onClick={selectQuestion}>
        <Emoji label="plus" symbol="➕" />
        &nbsp;Přidat
      </button>
      {selectedQuestions &&
        selectedQuestions.map((q) => {
          return (
            <div className="bg-logo p-2 px-7 inline-flex items-center rounded-3xl text-white font-medium mr-2 my-3 w-auto">
              {q.Question_text}
              <img
                src={xImage}
                className="w-3 h-3 ml-2 cursor-pointer"
                onClick={removeSelected}
                data-id={q._id}
              ></img>
            </div>
          );
        })}
      <button type="submit" className="mt-5" onClick={formSubmit}>
        Odeslat
      </button>
    </form>
  );
}
