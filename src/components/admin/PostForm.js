import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../css/post-form.css";
import Repeater from "./Repeater";
import Tags from "./Tags";
import Abcd from "./Abcd";
import Estimate from "./Estimate";
import TiptapMenu from "../TiptapMenu";
import { EditorContent, useEditor, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "react-router-dom";

export default function PostForm(props) {
  const [questionType, setQuestionType] = React.useState({});
  const [selectElement, setSelectElement] = React.useState(<></>);
  const [question, setQuestion] = React.useState({});
  const [inputState, setInputState] = React.useState({ 0: "" });
  const [editorContent, setEditorContent] = React.useState();
  const [editor2Content, setEditor2Content] = React.useState();
  const [prefillContent, setPrefillContent] = React.useState();

  // prefilling content in edit mode
  let editMode = props.editable;
  // question ID from url params
  let { questionID } = useParams();
  let questionParam = JSON.stringify([questionID]);

    // initialize questionType in edit mode
    function initializeQuestionType() {
      let basicOptions = {
        abcd: false, 
        estimate: true, 
        // match: false
      }
      if (editMode&&prefillContent?.[0].Question_type) {
        Object.keys(basicOptions).forEach((k)=>{
          basicOptions[k] = false;
          if (prefillContent[0].Question_type === k) basicOptions[k] = true
        })
        return basicOptions
      } else {
        return basicOptions
      }
    }

    React.useEffect(()=>{
      setQuestionType(initializeQuestionType())
    }, [editMode, prefillContent])

  // getting the content for edit mode
  async function getContent() {
    const getData = await fetch(
      process.env.REACT_APP_SERVER_URL +
        `/api/questions?questions=${questionParam}&limit=1`
    );
    const jsonData = await getData.json();
    setPrefillContent(jsonData);
  }

  React.useEffect(() => {
    if (editMode) {
      getContent();
    }
  }, []);

  // EXPLANATION editor
  const editor1 = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
    },
  });

  // prefill explanation editor if in edit mode
  // CRASHES ON HOT LOAD
  React.useEffect(() => {
    if (editMode && prefillContent?.[0].Explanation) {
      editor1.commands.setContent(prefillContent[0].Explanation || "");
    }
  }, [prefillContent]);

  const editor2 = useEditor({
    extensions: [StarterKit, Image],
    content: ``,
    onUpdate({ editor }) {
      setEditor2Content(editor.getJSON());
    },
  });

  console.log(prefillContent)
  React.useEffect(() => {
    if (editMode && prefillContent?.[0].Sources) {
      editor2.commands.setContent(prefillContent[0]?.Sources || "");
    }
  }, [prefillContent]);

  // select question type elements
  // CRASHES ON HOT LOAD
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
    setQuestion((oldQuestion) => {
      return { ...oldQuestion, Question_type: selected[0] };
    });
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
        Explanation: editorContent,
      };
    });
  }, [editorContent]);

  // COMMON
  //essentially onChange for rich text editor 1
  React.useEffect(() => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        Sources: editor2Content,
      };
    });
  }, [editor2Content]);

  // COMMON
  // handle FORM submit
  function handleSubmit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_CUSTOM_BACKEND_URL + "/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    }).then((res) => console.log(res));
  }

  return (
    <>
      <div className="choose-type flex bg-yellow-200 p-4 rounded-md">
        <div className="mr-5">Vyberte typ otázky:</div>
        {selectElement}
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
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
        {questionType.abcd ? (
          <Abcd
            question={question}
            setQuestion={setQuestion}
            handleChange={handleChange}
            inputState={inputState}
            setInputState={setInputState}
          />
        ) : questionType.estimate ? (
          <Estimate question={question} handleChange={handleChange} />
        ) : (
          ""
        )}
        <div className="form-label">Vysvětlení otázky:</div>
        <div className="editor-wrapper">
          <TiptapMenu editor={editor1} />
          <EditorContent editor={editor1} />
        </div>
        <div className="form-label">Zdroje:</div>
        <div className="editor-wrapper">
          <TiptapMenu editor={editor2} />
          <EditorContent editor={editor2} />
        </div>
        <Tags question={question} setQuestion={setQuestion} />
        <input type="submit" className="form-submit"></input>
      </form>
    </>
  );
}
