import React from "react";

const QuizOption = ({ quiz ,onAnswer}) => {
  const { question, options } = quiz || {};
  let content = null;
  if (options?.length > 0) {
    content = options?.map((option) => (
      <label key={option.id} htmlFor={`option${option.id}_q${quiz.id}`}>
        <input
          type="checkbox"
          id={`option${option.id}_q${quiz.id}`}
          onChange={() => onAnswer(quiz.id, option.isCorrect)}
        />
        {option.option}
      </label>
    ));
  }
  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <form className="quizOptions">
        
        {content}
      </form>
    </div>
  );
};

export default QuizOption;