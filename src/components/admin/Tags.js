import React from "react";
import xImage from "../../x.png";

export default function Tags(props) {
  const [tag, setTag] = React.useState("");
  const [tagList, setTagList] = React.useState([]);
  const [autoActive, setAutoActive] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState();
  const [slctTagList, setSlctTagList] = React.useState();
  const [active, setActive] = React.useState();
  const [enterAuto, setEnterAuto] = React.useState(false);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/tags")
      .then((res) => res.json())
      .then((data) => setTagList(data));
  }, []);

  function handleTags(e) {
    if (e.keyCode === 13) {
      if (!enterAuto) {
        props.setQuestion((oldQuestion) => {
          let tagsArray = oldQuestion.tags || [];
          tagsArray.push(tag);
          return { ...oldQuestion, tags: tagsArray };
        });
        setTag("");
        setAutoActive(false);
        setEnterAuto(false);
      } else {
        setTag(slctTagList[active]);
        setAutoActive(false);
        setEnterAuto(false);
      }
    } else if (e.keyCode === 40) {
      setEnterAuto(true);
      if (active + 1 < selectedTags.length) {
        setActive((oldAct) => oldAct + 1);
      } else if (active + 1 === selectedTags.length) {
        setActive(0);
      }
    } else if (e.keyCode === 38) {
      setEnterAuto(true);
      if (active > 0) {
        setActive((oldAct) => oldAct - 1);
      } else if (active === 0) {
        setActive(selectedTags.length - 1);
      }
    } else if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122)
    ) {
      setEnterAuto(false);
      setActive(0);
    }
  }

  function handleInput(e) {
    setAutoActive(true);
  }

  function handleActiveTag (e) {
    console.log(e.target)
    setActive(e.target.getAttribute("data-index"))
    setTag(slctTagList[e.target.getAttribute("data-index")]);
    // setAutoActive(false);
    // setEnterAuto(false);
  }

  React.useEffect(() => {
    console.log("creating list");
    if (autoActive) {
      if (!tag) {
        setAutoActive(false);
      } else {
        let slctTags = tagList.filter((tg) => {
          return tg.slice(0, tag.length) === tag;
        });
        setSlctTagList(slctTags);
        setSelectedTags(
          slctTags.map((tg, i) => {
            return (
              <div className={`auto-tag ${i === active ? "tag-active" : ""}`} onClick={handleActiveTag} data-index={i}>
                {tg}
                <input
                  className={`${i === active ? "tag-active" : ""}`}
                  type="hidden"
                  value={tg}
                ></input>
              </div>
            );
          })
        );
      }
    }
  }, [tag, active, autoActive]);

  return (
    <div className="mt-5">
      Tagy:
      <div className="tags-container bg-white w-full flex flex-wrap p-1">
        {props.question.tags
          ? props.question.tags.map((tag) => {
              return (
                <>
                  <div className="bg-logo p-2 px-7 flex items-center rounded-3xl text-white font-medium mr-2 my-3">
                    {tag}
                    <img src={xImage} className="w-3 h-3 ml-2"></img>
                  </div>
                </>
              );
            })
          : ""}

        <input
          type="text"
          placeholder="napište a stiskněte enter"
          className="tag-input"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
          onKeyDown={(e) => handleTags(e)}
          onInput={(e) => handleInput(e)}
        ></input>
      </div>
      {autoActive ? (
        <div className="autocomplete h-5 w-full bg-pink-500">
          {selectedTags}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
