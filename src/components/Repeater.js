import React from "react";

export default function Repeater(props) {
  const [innerElement, setInnerElement] = React.useState([]);
  const [inputState, setInputState] = React.useState({rep_0:""});
  function add() {
    setInnerElement((oldInner) => {
      let newInner = oldInner.map((element, index) => {
        return (
          <div className="row-container flex">
            <input
              className="rep_input"
              name={`rep_${index + 1}`}
              onChange={handleChange}
              value={inputState[`rep_${index + 1}`]}
            ></input>
            <button className="minus-button" onClick={subtract}>
              -
            </button>
          </div>
        );
      });

      newInner.push(
        <div className="row-container flex">
          <input
            className="rep_input"
            name={`rep_${oldInner.length + 1}`}
            onChange={handleChange}
            value={inputState[`rep_${oldInner.length + 1}`]}
          ></input>
          <button className="plus-button" onClick={add}>
            +
          </button>
        </div>
      );
      return newInner;
    });
  }

  function subtract() {}

  function handleChange(e) {
    setInputState((oldInput)=>{
        return (
            {
                ...oldInput, 
                [e.target.name]:e.target.value
            }
        )
    })
  }

  return (
    <div id="field-container">
      <div className="row-container flex">
        <input
          className="rep_input"
          name="rep_0"
          onChange={handleChange}
          value={inputState["rep_0"]}
        ></input>
        {!innerElement.length ? (
          <button className="plus-button" onClick={add}>
            +
          </button>
        ) : (
          <button className="subtract-button" onClick={subtract}>
            -
          </button>
        )}
      </div>
      {innerElement.length ? innerElement : ""}
    </div>
  );
}
