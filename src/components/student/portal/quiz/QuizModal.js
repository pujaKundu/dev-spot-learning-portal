import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuizzesQuery } from "../../../../features/quiz/quizApi";
import QuizOption from "./QuizOption";

const QuizModal = () => {
  const { videoId } = useParams();
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery(videoId);
  const quiz = quizzes ? quizzes[0] : null;
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <p className="error">There was an error occured</p>;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((quiz) => (
      <QuizOption
        key={quiz.id}
        quiz={quiz}
        // onAnswer={(optionId, isCorrect) =>
        //   handleAnswer(quiz.id, optionId, isCorrect)
        // }
      />
    ));
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <div className="my-4">
            <h1 className="text-2xl font-bold">
              Quizzes for "Debounce Function in JavaScript - JavaScript Job
              Interview question"
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            {content}
          </div>
        </div>

        <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
          Submit
        </button>
      </div>
    </section>
  );
};

export default QuizModal;
