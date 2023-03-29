import Landing from "./Landing";
import "./App.css";
import Quiz from "./Quiz";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}
