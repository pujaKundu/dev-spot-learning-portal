import React from 'react';

const VideoDescription = ({ video, isLoading, isError }) => {
    let content = null;
    if (isLoading && !isError) {
        content=<p>Loading...</p>
    }
    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;
    else {
        content=<div>
      <h1 class="text-lg font-semibold tracking-tight text-slate-100">
        {video?.title}
      </h1>
      <h2 class=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {video?.createdAt}
      </h2>

      <div class="flex gap-4">
        <p class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          এসাইনমেন্ট
        </p>
        <p class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          কুইজে অংশগ্রহণ করুন
        </p>
      </div>
      <p class="mt-4 text-sm text-slate-400 leading-6">{video?.description}</p>
    </div>
    }
    return <>{content}</>;
};

export default VideoDescription;