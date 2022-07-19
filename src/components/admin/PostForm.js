import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../css/post-form.css";
import Repeater from "./Repeater";
import Abcd from "./Abcd";

export default function PostForm() {
  const [questionType, setQuestionType] = React.useState({
    abcd: false,
    estimate: false,
    match: true,
  });
  const [selectElement, setSelectElement] = React.useState(<></>);
  const [question, setQuestion] = React.useState({});
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [editor2State, setEditor2State] = React.useState(
    EditorState.createEmpty()
  );
  const [inputState, setInputState] = React.useState({ 0: "" });

  //  COMMON
  // select question type elements
  React.useEffect(() => {
    let keys = Object.keys(questionType);
    let selected = keys.filter((k) => {
      if (questionType[k]) {
        return k;
      }
    });
    setSelectElement(
      <select value={selected[0]} onChange={handleSubmitChange}>
        {keys.map((k) => {
          return (
            <option value={k} name={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </option>
          );
        })}
      </select>
    );
    setQuestion((oldQuestion)=>{
      return {...oldQuestion, Question_type:selected[0]}
    })
  }, [questionType]);

  // COMMON
  // handle submit element change (type selector)
  function handleSubmitChange(e) {
    setQuestionType((oldType) => {
      let newType = { ...oldType };
      let keys = Object.keys(newType);
      keys.forEach((k) => {
        newType[k] = false;
      });
      newType[e.target.value] = true;
      return newType;
    });
  }

  // COMMON
  // handle FORM change
  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        [name]: value,
      };
    });
  }
  //COMMON
  //essentially onChange for rich text editor 1
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        Explanation: convertToRaw(editorState.getCurrentContent()),
      };
    });
  }, [editorState]);

  // COMMON
  //essentially onChange for rich text editor 1
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        Sources: convertToRaw(editor2State.getCurrentContent()),
      };
    });
  }, [editor2State]);

  // COMMON
  // handle FORM submit
  function handleSubmit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_CUSTOM_BACKEND_URL + "/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    })
      .then(res => console.log(res));
  }

  return (
    <>
      <div className="post-form">
        <h2>Vyberte typ otázky:</h2>
        {selectElement}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Znění otázky:
              <input
                type="text"
                name="Question_text"
                value={question.Question_text || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          {questionType.abcd 
          ? 
          <Abcd
            question={question}
            setQuestion={setQuestion}
            handleChange={handleChange}
            inputState={inputState}
            setInputState={setInputState}
          />
          : ""
        }
          <div className="form-label">Vysvětlení otázky:</div>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="wysiwyg-editor"
            onEditorStateChange={setEditorState}
          />
          <div className="form-label">Zdroje:</div>
          <Editor
            editorState={editor2State}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="wysiwyg-editor"
            onEditorStateChange={setEditor2State}
          />
          <input type="submit" className="form-submit"></input>
        </form>
      </div>
    </>
  );
}
