import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import "../css/tiptap.css"

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`tiptap-button ${`tiptap-button ${editor.isActive('bold') ? 'is-active' : ''}`}`}
      >
        bold
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`tiptap-button ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        italic
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`tiptap-button ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        strike
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`tiptap-button ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        code
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`tiptap-button ${editor.isActive('paragraph') ? 'is-active' : ''}`}
      >
        paragraph
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 1}) ? 'is-active' : ''}`}
      >
        h1
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 2}) ? 'is-active' : ''}`}
      >
        h2
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 3}) ? 'is-active' : ''}`}
      >
        h3
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 4}) ? 'is-active' : ''}`}
      >
        h4
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 5}) ? 'is-active' : ''}`}
      >
        h5
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`tiptap-button ${editor.isActive('heading', {level: 6}) ? 'is-active' : ''}`}
      >
        h6
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`tiptap-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        bullet list
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`tiptap-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        ordered list
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`tiptap-button ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
      >
        code block
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`tiptap-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        blockquote
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().undo().run()}>
        undo
      </button>
      <button type="button" className="tiptap-button" onClick={() => editor.chain().focus().redo().run()}>
        redo
      </button>
    </>
  )
}

export default (props) => {


  return (
    <div>
      <MenuBar editor={props.editor} />
    </div>
  )
}