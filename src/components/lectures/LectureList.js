import React from "react";
import Preloader from "../Preloader";
import Emoji from "../Emoji";

export default function LectureList() {
  const [lectureList, setLectureList] = React.useState([]);
  const [preloader, setPreloader] = React.useState(false)

  React.useEffect(() => {
    setPreloader(true)
    fetch(process.env.REACT_APP_SERVER_URL + "/api/lectures")
      .then((res) => res.json())

      .then((data) => {
        setPreloader(false)
        setLectureList(data);
      });
  }, []);
  return (
    <>
    <h1 className="text-6xl text-right mb-9">Všechno, co potřebujete vědět o <strong>změně klimatu <Emoji label="planet" symbol="🌍"/></strong></h1>
    {preloader ? <div className="flex justify-center"><Preloader/></div> : ""}
      {lectureList.map((l) => {
        return (
          <div className="text-lg font-medium">
            <a className="text-2xl text-gray-700"href={`/lectures/${l.number}`}>{l.number + ". " + l.name}</a>
          </div>
        );
      })}
    </>
  );
}
