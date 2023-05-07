import React, { useState } from "react";
import { Link } from "react-router-dom";

import AssignmentModal from "./assignment/AssignmentModal";
import { useGetQuizzesQuery } from "../../../features/quiz/quizApi";
import formatDate from "../../../utils/formatDate";
import { useGetQuizMarkByStudentQuery } from "../../../features/quizMark/quizMarkApi";
import {
  useGetAssignmentMarkQuery,
  useGetAssignmentsQuery,
} from "../../../features/assignments/assignmentsApi";
import Loader from "../../Loader";

const VideoDescription = ({ video, user, id }) => {
  const date = new Date(video?.createdAt);
  const formattedDate = date.toLocaleString();

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
      <p className="px-3 font-bold py-1 flex items-center border border-red-600 text-sm text-red-600  rounded-full">
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className="h-4 w-4 text-red-600 mr-2"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0112 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0112 4c4.411 0 8 3.589 8 8a7.954 7.954 0 01-1.688 4.897z" />
          </svg>
        </span>
        No quiz
      </p>
    );
  }

  if (!isLoading && !isError && quizzes?.length > 0) {
    quizContent = (
      <Link
        to={`/quiz/${id}`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan-500 hover:text-primary"
      >
        Quiz
      </Link>
    );
  }

  if (quizSubmitted || matchQuiz) {
    quizContent = (
      <div className="px-4 py-1.5 font-semibold flex items-center space-x-2 border border-yellow-300  rounded-full cursor-not-allowed">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="h-4 w-4 text-yellow-400"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
        </svg>
        <span className="text-sm text-yellow-400 ">Quiz submitted</span>
      </div>
    );
  }

  //assignment content
  let assignmentContent = null;
  if (!isLoading && !isError && assignment?.length === 0) {
    assignmentContent = (
      <p className="px-3 font-bold py-1 flex items-center  border border-red-600 text-sm text-red-600  rounded-full  ">
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className="h-4 w-4 text-red-600  mr-2"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0112 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0112 4c4.411 0 8 3.589 8 8a7.954 7.954 0 01-1.688 4.897z" />
          </svg>
        </span>
        No assignment
      </p>
    );
  }

  if (!isLoading && !isError && assignment?.length > 0) {
    assignmentContent = (
      <button
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan-500 hover:text-primary"
        onClick={controlModal}
      >
        Assignment
      </button>
    );
  }

  if (assignmentSubmitted || matchAssignment) {
    assignmentContent = (
      <div className="px-3 py-1.5 font-bold flex items-center justify-center space-x-2  border border-green-500 rounded-full cursor-not-allowed">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="h-4 w-4 text-green-500"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
        </svg>
        <span className=" font-bold  text-green-600 rounded-full text-sm ">
          Assignment submitted
        </span>
      </div>
    );
  }
  // decide what to render
  let content = null;
  if (isLoading && !isError) {
    content = <Loader />;
  }
  if (!isLoading && isError)
    content = <p className="error">There was an error</p>;
  else {
    content = (
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {video?.title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {formattedDate}
        </h2>

        <div className="flex items-center  gap-4">
          {assignmentContent}
          <Link to={`/quiz/${video?.id}`}>{quizContent}</Link>
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">
          {video?.description}
        </p>
      </div>
    );
  }
  return (
    <div>
      {content}
      <AssignmentModal
        open={opened}
        control={controlModal}
        assignment={assignment}
        user={user}
        setIsAssignmentSubmitted={setIsAssignmentSubmitted}
        setSubmittedVideo={setSubmittedVideo}
      />
    </div>
  );
};

export default VideoDescription;
