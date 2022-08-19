import React from "react";
import Emoji from "../Emoji";
import Preloader from "../Preloader";

export default function Admin() {
  const [questions, setQuestions] = React.useState();
  const [lectures, setLectures] = React.useState();
  const [preLoader1, setPreLoader1] = React.useState(false);
  const [preLoader2, setPreLoader2] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setPreLoader1(true);
      const fetchedQuestions = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/questions?limit=1000"
      );
      const jsonQuestions = await fetchedQuestions.json();
      setQuestions(jsonQuestions);
      setPreLoader1(false);
      setPreLoader2(true);
      const fetchedLectures = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/lectures"
      );
      const jsonLectures = await fetchedLectures.json();
      setLectures(jsonLectures);
      setPreLoader2(false);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="mt-5 text-xl ">
        <h2 className="mb-5">Otázky</h2>
        <Emoji label="hand" symbol="👉" />{" "}
        <a href="/admin/post-questions">
          <span className="font-medium">Přidat otázky</span>
        </a>
        <div className="flex justify-center">{preLoader1 && <Preloader />}</div>
        {questions &&
          questions.map((q) => {
            return (
              <div className="text-xs mt-2 mb-2 text-gray-600">
                <a href={`/admin/questions/${q._id}`}>{q.Question_text}</a>
              </div>
            );
          })}
      </div>
      <div className="mt-5 text-xl">
        <h2 className="mb-5">Lekce</h2>
        <Emoji label="hand" symbol="👉" />{" "}
        <a href="/admin/post-lecture">
          <span className="font-medium">Přidat lekce</span>
        </a>
        <div className="flex justify-center">{preLoader2 && <Preloader />}</div>
        {lectures &&
          lectures.map((l) => {
            return (
              <div className="text-xs mt-2 mb-2 text-gray-600">
                <a className="mb-5" href={`/admin/lectures/${l._id}`}>
                  {l.number + ". " + l.name}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
