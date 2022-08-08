import React from "react";
import { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import Error from "../Error";
import { useLocation } from "react-router-dom";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";

export default function LectureSingle() {
  const [lectureNo, setLectureNo] = React.useState();
  const [lectureData, setLectureData] = React.useState();
  const [error, setError] = React.useState(false);
  const [useLoc, setUseLoc] = React.useState(useLocation().pathname);
  const [textOutput, setTextOutput] = React.useState();
  const [noArray, setNoArray] = React.useState();
  const [displayChevron, setDisplayChevron] = React.useState({
    left: true,
    right: true,
  });

  // get all lecture numbers
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/lectures/lecture-numbers")
      .then((res) => res.json())
      .then((data) => setNoArray(data.data));
  }, []);

  // get lecture no from URL params
  React.useEffect(() => {
    let lectureNo = useLoc.replace("/lectures/", "");
    if (parseInt(lectureNo)) {
      setLectureNo(lectureNo);
      setError(false);
    } else {
      setError(true);
    }
  }, [useLoc]);

  // fetch from db using lecture no
  React.useEffect(() => {
    if (lectureNo) {
      fetch(process.env.REACT_APP_SERVER_URL + `/api/lectures/${lectureNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error || !data.data) {
            setError(true);
          } else if (data.data) {
            setError(false);
            setLectureData(data.data);
            setTextOutput(
              generateHTML(data.data.Text, [
                Document,
                Text,
                Paragraph,
                Bold,
                Italic,
                Heading,
              ])
            );
          }
        });
    }
  }, [lectureNo]);

  return (
    <>
      {error && <Error />}
      {!error && lectureData && (
        <div>
          <div className="lecture-inner">
            <h1 className="text-logo">{lectureData.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: textOutput }}></div>
          </div>
          <div className="arrow-container flex w-full justify-between text-2xl max-w-4xl">
            {noArray?.indexOf(lectureNo) > 0 ? (
              <a
                href={`/lectures/${noArray[noArray.indexOf(lectureNo) - 1]}`}
                className="border-none"
              >
                <ChevronLeftIcon className="h-10 w-10 text-logo" />
              </a>
            ) : (
              <div></div>
            )}
            {noArray?.indexOf(lectureNo) < noArray?.length - 1 ? (
              <a
                href={`/lectures/${noArray[noArray.indexOf(lectureNo) + 1]}`}
                className="border-none"
              >
                <ChevronRightIcon className="h-10 w-10 text-logo" />
              </a>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
