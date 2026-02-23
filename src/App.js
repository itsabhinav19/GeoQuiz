/*import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quiz Questions</h1>

      {questions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        questions.map((q, index) => (
          <div key={q._id} style={{ marginBottom: "20px" }}>
            <h3>{q.question}</h3>

            <ul>
              {q.options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
*/


// timer with correct-incorrect color -> working 

/*import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);

        // 🔀 Randomize and take 5
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ⏱ Timer logic
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

  if (quizQuestions.length === 0) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  const question = quizQuestions[currentQuestion];

  const handleOptionClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setTimeLeft(15);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());

  setQuizQuestions(shuffled.slice(0, 5));
  setCurrentQuestion(0);
  setScore(0);
  setSelectedAnswer(null);
  setTimeLeft(15);
  setQuizFinished(false);
};

  if (quizFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>

        <h1>Quiz Finished 🎉</h1>
        <h2>
          Your Score: {score} / {quizQuestions.length}
        </h2>
        <h3>
          Percentage: {((score / quizQuestions.length) * 100).toFixed(2)}%
        </h3>

        <button
        onClick={handleRestart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        >
        🔄 Restart Quiz
      </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>
        Question {currentQuestion + 1} of {quizQuestions.length}
      </h2>

      <h3 style={{ color: "red" }}>⏳ Time Left: {timeLeft}s</h3>

      <h3>{question.question}</h3>

      {question.options.map((option, index) => {
        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        return (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
              width: "100%",
              backgroundColor: selectedAnswer
                ? isCorrect
                  ? "green"
                  : isSelected
                  ? "red"
                  : "#eee"
                : "#eee",
              color:
                selectedAnswer && (isCorrect || isSelected)
                  ? "white"
                  : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        );
      })}

      {selectedAnswer && (
        <button
          onClick={handleNext}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}

export default App;*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
