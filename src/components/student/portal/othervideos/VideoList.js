import React from "react";
import { useGetVideosQuery } from "../../../../features/videos/videosApi";
import SingleVideo from "./SingleVideo";

const VideoList = ({ setId }) => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && videos?.length === 0) {
    content = <p>No video found!</p>;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos?.map((video) => (
      <SingleVideo key={video?.id} video={video} setId={setId} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default VideoList;
