import React from "react";
import ReactMarkdown from "react-markdown";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export default function Explanation(props) {
  return (
    <section className="mt-5 bg-white opacity-75 p-5 rounded-lg">
      <div
        className="explanation"
        dangerouslySetInnerHTML={{__html: props.question.Explanation ? generateHTML(props.question.Explanation, [
          StarterKit,
          Image.configure({
            HTMLAttributes: {
              class: "inline-image",
            },
            inline: true,
          }),
        ]) : ""}}
      ></div>
      <div className="sources-container bg-stone-50 p-2">
        <h2 className="text-lg font-bold mt-6">Zdroje</h2>
        <div
          className="sources"
          dangerouslySetInnerHTML={{__html: props.question.Sources ? generateHTML(props.question.Sources, [
            StarterKit,
            Image.configure({
              HTMLAttributes: {
                class: "inline-image",
              },
              inline: true,
            }),
          ]) : ""}}
        ></div>
      </div>
    </section>
  );
}
