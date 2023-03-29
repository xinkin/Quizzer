import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing-comp">
      <h1 className="l_ti">Quizzer</h1>
      <h3 className="l_subti">Triviaaa Time!</h3>
      <Link to="/quiz">
        <button className="l_Btn">Start Quiz</button>
      </Link>
    </div>
  );
}
