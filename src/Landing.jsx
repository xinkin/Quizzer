import React from "react";
import { Link } from "react-router-dom";
import bg1 from "./layered-waves-haikei.png";
export default function Landing() {
  const backgroundImage = `url(${bg1})`;
  const styles = {
    backgroundImage,
    backgroundSize: "59% 59%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  };
  return (
    <div className="landing-comp" style={styles}>
      <h1 className="l_ti">Quizzer</h1>
      <h3 className="l_subti">Triviaaa Time!</h3>
      <Link to="/quiz">
        <button className="l_Btn">Start Quiz</button>
      </Link>
    </div>
  );
}
