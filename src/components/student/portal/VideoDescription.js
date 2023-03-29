import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAssignmentMarkQuery,
  useGetAssignmentsQuery,
} from "../../../features/assignments/assignmentsApi";
import AssignmentModal from "./assignment/AssignmentModal";

const VideoDescription = ({ video, user, id }) => {
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);
  const [submittedVideo, setSubmittedVideo] = useState(null);
  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentsQuery(video?.id);

  const { data: assignmentMark } = useGetAssignmentMarkQuery(video?.id);

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
  //for modal
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

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
          {!isAssignmentSubmitted && assignment?.length == 0 ? (
            <p class="px-3 font-bold py-1 border border-red text-cyan rounded-full text-sm hover:bg-red hover:text-primary">
              {" "}
              এসাইনমেন্ট নেই
            </p>
          ) : (
            !isAssignmentSubmitted && (
              <button
                class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                onClick={controlModal}
              >
                এসাইনমেন্ট
              </button>
            )
          )}
          {isAssignmentSubmitted ||
            matchAssignment &&(
              <p className="px-3 font-bold py-1 border border-red text-green-500 rounded-full text-sm hover:text-primary">
                এসাইনমেন্ট জমা হয়েছে
              </p>
            )}
          <Link
            to={`/quiz/${video?.id}`}
            class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজে অংশগ্রহণ করুন
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
