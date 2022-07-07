import React from "react";
import ReactMarkdown from 'react-markdown'

export default function Explanation (props) {
    return (
        <section className="mt-5 bg-white opacity-75 p-5 rounded-lg">
            <ReactMarkdown>
            {props.explanation}
            </ReactMarkdown>
        </section>
    )
}