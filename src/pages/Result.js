// src/pages/Result.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.post("https://geo-quiz-server.vercel.app/api/quiz/save-score",
      { score },
      { headers: { Authorization: token } }
    );
  }, [score, token, navigate]);

  return (
    <div style={styles.container}>
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score}</h2>
      <button onClick={() => navigate("/quiz")}>Play Again</button>
      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "100px" }
};

export default Result;