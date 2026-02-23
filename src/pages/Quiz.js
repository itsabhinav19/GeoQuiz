// src/pages/Quiz.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

// function Quiz() {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [score, setScore] = useState(0);
//   const token = localStorage.getItem("token");

//   /*useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     axios.get("http://localhost:5000/api/quiz", {
//       headers: { Authorization: token }
//     })
//     .then(res => setQuestions(res.data))
//     .catch(err => console.log(err));
//   }, [navigate, token]);
//   */

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleAnswer = (option) => {
//   const newScore =
//     option === questions[current].correctAnswer
//       ? score + 1
//       : score;

//   if (option === questions[current].correctAnswer) {
//     setScore(newScore);
//   }

//   if (current + 1 < questions.length) {
//     setCurrent(current + 1);
//   } else {
//     navigate("/result", { state: { score: newScore } });
//   }
//   };

//   if (questions.length === 0) return <h3>Loading...</h3>;

//   return (
    
//     <div style={styles.container}>

//       <div style={{ textAlign: "right" }}>
//       <button
//         onClick={handleLogout}
//         style={{
//           padding: "6px 12px",
//           backgroundColor: "crimson",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         🚪 Logout
//       </button>
//       </div>

//       <h3>Question {current + 1} of {questions.length}</h3>
//       <h2>{questions[current].question}</h2>

//       {questions[current].options.map((option, index) => (
//         <button
//           key={index}
//           onClick={() => handleAnswer(option)}
//           style={styles.button}
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: "center", marginTop: "80px" },
//   button: {
//     display: "block",
//     margin: "10px auto",
//     padding: "10px 20px",
//     width: "200px"
//   }
// };

// export default Quiz;


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
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);

        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ✅ Timer Logic
  useEffect(() => {
    if (quizFinished) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizFinished]);

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
      setScore(score + 1);
    }
  };

  // ✅ Next Question
  const handleNext = () => {
    setSelectedAnswer(null);
    setTimeLeft(15);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
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
          <button onClick={handleLogout} 
          style={{
            padding: "8px 16px",
            background: "crimson",
            marginRight: "100px",
            marginTop:"10px",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s"
          }}>Logout</button>
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
            borderRadius: "7px"
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

    <div className="timer">
      ⏳ Time Left: {timeLeft}s
    </div>

    <div className="question-text">
      {question.question}
    </div>

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


// this code is running good, if any problem occurs use it

// { <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       {/* Logout */}
//       <div style={{ textAlign: "right" }}>
//         <button
//           onClick={handleLogout}
//           style={{
//             padding: "6px 12px",
//             backgroundColor: "crimson",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           🚪 Logout
//         </button>
//       </div>

//       <h2>
//         Question {currentQuestion + 1} of {quizQuestions.length}
//       </h2>

//       <h3 style={{ color: "red" }}>⏳ Time Left: {timeLeft}s</h3>

//       <h3>{question.question}</h3>

//       {question.options.map((option, index) => {
//         const isCorrect = option === question.correctAnswer;
//         const isSelected = option === selectedAnswer;

//         return (
//           <button
//             key={index}
//             onClick={() => handleOptionClick(option)}
//             style={{
//               display: "block",
//               margin: "10px 0",
//               padding: "10px",
//               width: "100%",
//               backgroundColor: selectedAnswer
//                 ? isCorrect
//                   ? "green"
//                   : isSelected
//                   ? "red"
//                   : "#eee"
//                 : "#eee",
//               color:
//                 selectedAnswer && (isCorrect || isSelected)
//                   ? "white"
//                   : "black",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {option}
//           </button>
//         );
//       })}

//       {selectedAnswer && (
//         <button
//           onClick={handleNext}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Next →
//         </button>
//       )}
//     </div> }
