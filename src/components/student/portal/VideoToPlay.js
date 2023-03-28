import React from "react";
import { useGetVideoQuery } from "../../../features/videos/videosApi";
import VideoPlayer from "./VideoPlayer";
import VideoDescription from './VideoDescription'
import { useParams } from "react-router-dom";

const VideoToPlay = ({id}) => {
  
  const { data: video, isLoading, isError } = useGetVideoQuery(id);
  
  console.log(video)
  
  return (
    <div class="col-span-full w-full space-y-8 lg:col-span-2">
      <VideoPlayer
        url={video?.url}
        title={video?.title}
        isLoading={isLoading}
        isError={isError}
      />
      <VideoDescription video={video} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default VideoToPlay;
