import React from "react";

export default function Question(props) {
  return (
    <div className="QuesList">
      <h1 className="questions">{props.ques}</h1>
      <span className="options">{props.choices}</span>
    </div>
  );
}
