import React from "react";

export default function Win(props) {
  let otazek = "";
  switch (props.score) {
    case 1:
      otazek = "otázku";
      break;
    case 2:
    case 3:
    case 4:
      otazek = "otázky";
      break;
    default:
      otazek = "otázek";
  }
  return (
    <div className="m-2 p-2 flex flex-col items-center">
      <div className="win m-2 font-bold text-lg">
        Odpověděli jste správně na {props.score} {otazek} z{" "}
        {props.numberOfQuestions}.
      </div>
      {props.restartButtons && (
        <>
          <button className="restart-button" onClick={(e)=>props.restart(e)}>
            Nový kvíz
          </button>
          <button className="main-button">Hlavní stránka</button>
        </>
      )}
    </div>
  );
}
