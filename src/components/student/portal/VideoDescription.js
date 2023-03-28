import React, { useState } from "react";
import { Link } from "react-router-dom";
import AssignmentModal from "./assignment/AssignmentModal";
import QuizModal from "./quiz/QuizModal";

const VideoDescription = ({ video, isLoading, isError }) => {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  let content = null;
  if (isLoading && !isError) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;
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
          <button
            class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            onClick={controlModal}
          >
            এসাইনমেন্ট
          </button>
          <Link to={`/quiz/${video?.id}`}
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
      <AssignmentModal open={opened} control={controlModal} />
      
    </>
  );
};

export default VideoDescription;
