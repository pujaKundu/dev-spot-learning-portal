import {useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizzesQuery } from "../../../../features/quiz/quizApi";
import QuizOption from "./QuizOption";
import { useAddQuizMarkMutation } from "../../../../features/quizMark/quizMarkApi";

const QuizModal = () => {
  const navigate=useNavigate()
  const { videoId } = useParams();
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery(videoId);
  const quiz = quizzes ? quizzes[0] : null;
  //get loggedin user
  const storedData = JSON.parse(localStorage.getItem("auth"));
  const user = storedData.user;
  const { id, name } = user;
  
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    video_id: 0,
    video_title: "",
    totalQuiz: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalMark: 0,
    mark: 0,
  });

  const { video_title } = quiz || {};

  const [quizAnswers, setQuizAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [addQuizMark, isSuccess] = useAddQuizMarkMutation();

  // check if the user has already submitted the quiz
  useEffect(() => {
    const hasSubmitted = localStorage.getItem(
      `quiz_of_video${quiz?.video_id}_submitted_by_${id}`
    );
  }, [quiz, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = Object.values(quizAnswers).map((answer) => ({
      option_id: answer.option_id,
      is_correct: answer.is_correct,
    }));
    const totalMark = answers.length * 5;
    const totalCorrect = answers.filter((answer) => answer.is_correct).length;
    const totalWrong = answers.filter((answer) => !answer.is_correct).length;
    const mark = totalCorrect * 5;

    console.log('mark',mark)
    const quizData = {
      ...formData,
      student_id: id,
      student_name: name,
      video_id: quiz.video_id,
      video_title: quiz.video_title,
      totalQuiz: answers.length,
      totalCorrect,
      totalWrong,
      totalMark,
      mark,
    };
    addQuizMark(quizData).then(() => {
      if (isSuccess) {
        localStorage.setItem(
          `quiz_of_video${quiz?.video_id}_submitted_by_${id}`,
          "true"
        );
        setHasSubmitted(true);
        navigate(`/leaderboard/${id}`);
      }
    });
  };

  const handleAnswer = (quizId, optionId, isCorrect) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: { option_id: optionId, is_correct: isCorrect },
    }));

    // check if any other answer for this question has already been submitted
    const answersForQuestion = Object.values(quizAnswers).filter(
      (answer) => answer.quiz_id === quizId && answer.option_id !== optionId
    );

    // if any other answer exists for this question, check if it has the same is_correct value
    // if not, set the mark to 0
    if (answersForQuestion.length > 0) {
      const otherAnswer = answersForQuestion[0];
      if (otherAnswer.is_correct !== isCorrect) {
        setFormData((prevData) => ({
          ...prevData,
          mark: prevData.mark - 5,
        }));
      }
    }
  };

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
        onAnswer={(optionId, isCorrect) =>
          handleAnswer(quiz.id, optionId, isCorrect)
        }
      />
    ));
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <div className="my-4">
            <h1 className="text-2xl font-bold">
              Quizzes for {video_title}
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">{content}</div>
        </div>

        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default QuizModal;
