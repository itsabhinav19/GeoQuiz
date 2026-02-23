// src/pages/Quiz.js

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizFinished, setQuizFinished] = useState(false);

  // ✅ Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Fetch Questions
  useEffect(() => {
    fetch("https://geo-quiz-server.vercel.app/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ✅ Next Question (memoized for ESLint + CI)
  const handleNext = useCallback(() => {
    setSelectedAnswer(null);
    setTimeLeft(15);

    setCurrentQuestion((prev) => {
      if (prev + 1 < quizQuestions.length) {
        return prev + 1;
      } else {
        setQuizFinished(true);
        return prev;
      }
    });
  }, [quizQuestions.length]);

  // ✅ Timer Logic
  useEffect(() => {
    if (quizFinished) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizFinished, handleNext]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Handle Option Click
  const handleOptionClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === quizQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // ✅ Restart Quiz
  const handleRestart = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());

    setQuizQuestions(shuffled.slice(0, 5));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(15);
    setQuizFinished(false);
  };

  // ⏳ Loading State
  if (quizQuestions.length === 0) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  // 🎉 Quiz Finished Screen
  if (quizFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div style={{ textAlign: "right", padding: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "crimson",
              marginRight: "100px",
              marginTop: "10px",
              border: "none",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div className="glass-card">
          <h1>Quiz Finished 🎉</h1>
          <h2>
            Score: {score} / {quizQuestions.length}
          </h2>
          <h3>
            Percentage: {((score / quizQuestions.length) * 100).toFixed(2)}%
          </h3>

          <button
            onClick={handleRestart}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#28a328",
              color: "white",
              border: "none",
              borderRadius: "7px",
            }}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>
          Question {currentQuestion + 1} / {quizQuestions.length}
        </h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="timer">⏳ Time Left: {timeLeft}s</div>

      <div className="question-text">{question.question}</div>

      {question.options.map((option, index) => {
        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        return (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="option-btn"
            style={{
              backgroundColor: selectedAnswer
                ? isCorrect
                  ? "#2eba4f"
                  : isSelected
                  ? "#ef4354"
                  : "white"
                : "white",
              color:
                selectedAnswer && (isCorrect || isSelected)
                  ? "white"
                  : "black",
            }}
          >
            {option}
          </button>
        );
      })}

      {selectedAnswer && (
        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      )}
    </div>
  );
}

export default Quiz;