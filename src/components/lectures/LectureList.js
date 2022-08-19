import React from "react";
import Preloader from "../Preloader";
import Emoji from "../Emoji";
import { authContext } from "../../App";

export default function LectureList() {
  const [lectureList, setLectureList] = React.useState([]);
  const [preloader, setPreloader] = React.useState(false);
  const [finishedLectures, setFinishedLectures] = React.useState();

  let auth = React.useContext(authContext);
  let userId = auth.id;

  React.useEffect(() => {
    setPreloader(true);
    fetch(process.env.REACT_APP_SERVER_URL + "/api/lectures")
      .then((res) => res.json())

      .then((data) => {
        setPreloader(false);
        setLectureList(data);
      });
  }, []);

  // fetch finished lectures (ticks)
  React.useEffect(() => {
    async function fetchFinished() {
      let rs = await fetch(
        process.env.REACT_APP_SERVER_URL +
          `/api/users/get-user-lectures/${userId}`
      );
      let rsJson = await rs.json();
      setFinishedLectures(rsJson);
    }
    userId && fetchFinished();
  }, [userId]);

  return (
    <>
      <h1 className="text-4xl mb-9">
        Změna klimatu - <span className="font-handwritten">témata</span>
        <Emoji label="planet" symbol="🌍" />
      </h1>
      {preloader ? (
        <div className="flex justify-center">
          <Preloader />
        </div>
      ) : (
        ""
      )}
      {lectureList.map((l) => {
        return (
          <div className={`flex items-center justify-between pr-5 pl-5 py-4  ${finishedLectures && finishedLectures.includes(l._id) ? "bg-amber-100" : ""}`}>
            <div className="text-lg font-medium">
              <a
                className="text-xl text-gray-700 inline-block"
                href={`/lectures/${l.number}`}
              >
                {l.number + ". " + l.name}
              </a>
            </div>
            {finishedLectures && finishedLectures.includes(l._id) ? <Emoji label="check" symbol="✔️"/> : ""}
          </div>
        );
      })}
    </>
  );
}
