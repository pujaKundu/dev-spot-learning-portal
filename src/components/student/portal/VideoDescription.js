import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAssignmentMarkQuery,
  useGetAssignmentsQuery,
} from "../../../features/assignments/assignmentsApi";
import AssignmentModal from "./assignment/AssignmentModal";
import {
  useGetQuizMarkByStudentQuery,
  useGetQuizzesQuery,
} from "../../../features/quiz/quizApi";

const VideoDescription = ({ video, user, id }) => {
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);
  const [submittedVideo, setSubmittedVideo] = useState(null);

  const student_id = user?.id;
  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentsQuery(video?.id);

  const { data: assignmentMark } = useGetAssignmentMarkQuery(video?.id);

  //get quiz mark
  const { data: quizzes } = useGetQuizzesQuery(video?.id);
  const { data: quizMark } = useGetQuizMarkByStudentQuery(student_id);

  const assignmentIndex = assignment ? assignment[0] : null;
  const { id: assignment_id } = assignmentIndex || [];

  let matchAssignment = false;
  assignmentMark?.forEach((mark) => {
    assignment?.forEach((assign) => {
      if (mark?.assignment_id === assign?.id) {
        matchAssignment = true;
      }
    });
  });

  const assignmentSubmitted = JSON.parse(
    localStorage.getItem(`assignment_${assignment_id}_submitted_by_${user?.id}`)
  );
  //for quiz mark
  let matchQuiz = false;
  quizMark?.forEach((mark) => {
    quizzes?.forEach((quiz) => {
      if (mark.video_id === quiz.video_id) {
        matchQuiz = true;
      }
    });
  });
  const quizSubmitted = JSON.parse(
    localStorage.getItem(`quiz_of_video${id}_submitted_by_${student_id}`)
  );
  //for modal
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  //quiz content
  let quizContent = null;
  if (!isLoading && !isError && quizzes?.length === 0) {
    quizContent = (
      <p className="px-3 font-bold py-1 border border-red-500 text-sm text-red-700 dark:text-rose-500 rounded-full">
        কুইজ নেই
      </p>
    );
  }

  if (!isLoading && !isError && quizzes?.length > 0) {
    quizContent = (
      <Link
        to={`/quiz/${id}`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করুন
      </Link>
    );
  }

  if (quizSubmitted || matchQuiz) {
    quizContent = (
      <div className="px-3 py-1 font-bold flex space-x-2 text-sm border border-teal-700 rounded-full">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="h-4 w-4 text-teal-700 dark:text-teal-400"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
        </svg>
        <span className="text-xs text-teal-700 dark:text-teal-400">
          কুইজ দিয়েছেন
        </span>
      </div>
    );
  }

  // decide what to render
  let content = null;
  if (isLoading && !isError) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError)
    content = <p className="error">There was an error</p>;
  else {
    content = (
      <div>
        <h1 class="text-lg font-semibold tracking-tight text-slate-100">
          {video?.title}
        </h1>
        <h2 class=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {video?.createdAt}
        </h2>

        <div class="flex gap-4">
          {!isAssignmentSubmitted && assignment?.length === 0 ? (
            <p class="px-3 font-bold py-1 border border-red text-cyan rounded-full text-sm hover:bg-red hover:text-primary">
              {" "}
              এসাইনমেন্ট নেই
            </p>
          ) : isAssignmentSubmitted || matchAssignment ? (
            <p className="px-3 font-bold py-1 border border-red text-green-500 rounded-full text-sm hover:text-primary hover:bg-green-500 hover:border-0">
              এসাইনমেন্ট জমা হয়েছে
            </p>
          ) : (
            <button
              class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              onClick={controlModal}
            >
              এসাইনমেন্ট
            </button>
          )}
          <Link
            to={`/quiz/${video?.id}`}
            class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            {quizContent}
          </Link>
        </div>
        <p class="mt-4 text-sm text-slate-400 leading-6">
          {video?.description}
        </p>
      </div>
    );
  }
  return (
    <>
      {content}
      <AssignmentModal
        open={opened}
        control={controlModal}
        assignment={assignment}
        user={user}
        setIsAssignmentSubmitted={setIsAssignmentSubmitted}
        setSubmittedVideo={setSubmittedVideo}
      />
    </>
  );
};

export default VideoDescription;
