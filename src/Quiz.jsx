import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import he from "he";

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [qCard, setqCard] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [flag, setFlag] = useState(false);
  const [score, setScore] = useState(0);
  //Api call
  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const decodeData = data.results.map((item) => ({
          ...item,
          question: he.decode(item.question),
          correct_answer: he.decode(item.correct_answer),
          incorrect_answers: item.incorrect_answers.map((ans) =>
            he.decode(ans)
          ),
        }));
        setqCard(decodeData);
        setLoading(false);
      });
  }, [reset]);
  useEffect(() => {
    //deconstructing the array and forming a new array of choices
    const choices1 = qCard.map((info) => [
      info.correct_answer,
      ...info.incorrect_answers,
    ]);
    //shuffling the choices
    setChoices(choices1.map((item) => item.sort(() => Math.random() - 0.5)));
  }, [qCard]);
  //giving ids to selected answers
  function handleAnsSelect(questionId, choice) {
    setAnswers({ ...answers, [questionId]: choice });
  }
  //calculating score by matching ids of selected answers and correct answers
  function scoreCalc() {
    let score = 0;
    for (let i = 0; i < qCard.length; i++) {
      if (qCard[i].correct_answer === answers[i]) {
        setScore((score) => score + 1);
      }
    }
    setFlag(true);
  }
  function playAgain() {
    setReset((prev) => !prev);
    setFlag(false);
    setAnswers([]);
    setScore(0);
    setAnswers([]);
  }
  const quesList = flag
    ? qCard.map((info, index) => (
        <Question
          key={nanoid()}
          ques={info.question}
          choices={
            choices[index] &&
            choices[index].map((item, x) => (
              <div
                className="ansbox"
                style={{
                  backgroundColor:
                    answers[index] === info.correct_answer &&
                    answers[index] === item
                      ? "#94D7A2"
                      : answers[index] === item &&
                        answers[index] !== info.correct_answer
                      ? "#F8BCBC"
                      : "#F5F7FB",
                  opacity:
                    answers[index] === item &&
                    answers[index] === info.correct_answer
                      ? "1"
                      : "0.5",
                }}
                key={item}
              >
                {item}
              </div>
            ))
          }
        />
      ))
    : qCard.map((info, index) => (
        <Question
          key={nanoid()}
          ques={info.question}
          choices={
            choices[index] &&
            choices[index].map((item) => (
              <div
                className="ansbox"
                style={{
                  backgroundColor:
                    answers[index] === item ? "#D6DBF5" : "#F5F7FB",
                }}
                key={item}
                onClick={() => handleAnsSelect(index, item)}
              >
                {item}
              </div>
            ))
          }
        />
    ));
  const style1= {
    backgroundColor: "red"
  };
  const style2 = {
    backgroundColor: "green"
  };
  return (
    <>
      {flag ? (
        <>
          <div className="List">{quesList}</div>
          <span className="foot_sec">
            <h1 className="score">
              <b>
                Your scored {score}/{qCard.length} correct answers
              </b>
            </h1>
            <button className="Play-Btn" onClick={playAgain}>
              Play Again
            </button>
          </span>
        </>
      ) : loading ? (
          <div class="loader"></div>
      ) : (
        <>
          <div className="List">{quesList}</div>
          <button className="Check-Btn" onClick={scoreCalc}>
            Check Answers
          </button>
        </>
      )}
    </>
  );
}
