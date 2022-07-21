import React from "react";
import ReactMarkdown from "react-markdown";

export default function Explanation(props) {
  return (
    <section className="mt-5 bg-white opacity-75 p-5 rounded-lg">
      <div
        className="explanation"
        dangerouslySetInnerHTML={{ __html: props.explanation }}
      ></div>
      <div className="sources-container bg-stone-50 p-2">
        <h2 className="text-lg font-bold mt-6">Zdroje</h2>
        <div
          className="sources"
          dangerouslySetInnerHTML={{ __html: props.sources }}
        ></div>
      </div>
    </section>
  );
}
