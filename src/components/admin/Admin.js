import React from "react";
import Emoji from "../Emoji";

export default function Admin() {
  return (
    <>
      <div className="mt-5">
        <Emoji label="hand" symbol="👉" />{" "}
        <a href="/admin/post-questions">
          <span className="text-lg font-medium">Přidat otázky</span>
        </a>
      </div>
      <div className="mt-5">
        <Emoji label="hand" symbol="👉" />{" "}
        <a href="/admin/post-lecture">
          <span className="text-lg font-medium">Přidat lekce</span>
        </a>{" "}
      </div>
    </>
  );
}
