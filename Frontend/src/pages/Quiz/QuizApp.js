import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [userChoices, setUserChoices] = useState({});
  const [totalMark, setTotalMark] = useState(0);

  useEffect(() => {
    // Fetch questions from the backend and update the state
    axios.get("http://localhost:5000/Question/questions").then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const handleChoiceSelect = (questionId, choiceLabel, choiceMark) => {
    setUserChoices((prevChoices) => ({
      ...prevChoices,
      [questionId]: { choice: choiceLabel, mark: choiceMark },
    }));
  };

  const calculateTotalMark = () => {
    let mark = 0;
    questions.forEach((question) => {
      const userChoice = userChoices[question._id];
      if (userChoice) {
        mark += userChoice.mark;
      }
    });
    setTotalMark(mark);
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>question.que_title</h3>
          {question.choices.map((choice) => (
            <div key={choice.label}>
              <label>
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={choice.label}
                  onChange={() =>
                    handleChoiceSelect(question._id, choice.label, choice.mark)
                  }
                />
                {choice.label} - {choice.mark}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={calculateTotalMark}>Calculate Total Mark</button>
      <p>Total Mark: {totalMark}</p>
    </div>
  );
};

export default QuizApp;