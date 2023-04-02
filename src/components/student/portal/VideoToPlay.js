import React from "react";
import { useGetVideoQuery } from "../../../features/videos/videosApi";
import VideoPlayer from "./VideoPlayer";
import VideoDescription from "./VideoDescription";

const VideoToPlay = ({ id }) => {
  const { data: video, isLoading, isError } = useGetVideoQuery(id);
  // get loggedin user
  const storedData = JSON.parse(localStorage.getItem("auth"));
  const user = storedData?.user;

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <VideoPlayer
        url={video?.url}
        title={video?.title}
        isLoading={isLoading}
        isError={isError}
      />
      <VideoDescription video={video} user={user} id={id} />
    </div>
  );
};

export default VideoToPlay;
