import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/post-form.css";
import Repeater from "./Repeater";

export default function PostForm() {
  const [question, setQuestion] = React.useState({});
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [editor2State, setEditor2State] = React.useState(
    EditorState.createEmpty()
  );
  const [inputState, setInputState] = React.useState({ 0: "" });

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

  //essentially onChange for rich text editor 1
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        Explanation: convertToRaw(editorState.getCurrentContent()),
      };
    });
  }, [editorState]);

  //essentially onChange for rich text editor 1
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        Sources: convertToRaw(editor2State.getCurrentContent()),
      };
    });
  }, [editor2State]);

  //onChange for Repeater
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return { ...oldQuestion, Wrong_answers: Object.values(inputState) };
    });
  }, [inputState]);

  // handle FORM submit
  function handleSubmit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_CUSTOM_BACKEND_URL + "/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
  }

  return (
    <div className="post-form">
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
        <div className="input-group">
          <label>
            Správná odpověď:
            <input
              type="text"
              name="Right_answer"
              value={question.Right_answer || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-label">Špatné odpovědi:</div>
        <Repeater inputState={inputState} setInputState={setInputState} />
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
  );
}
