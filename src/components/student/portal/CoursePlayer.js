import React, { useState } from "react";
import VideoList from "./othervideos/VideoList";
import VideoToPlay from "./VideoToPlay";

const CoursePlayer = () => {
  const [id,setId]=useState(1)
  
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-7xl px-5 lg:px-0">
        <div class="grid grid-cols-3 gap-2 lg:gap-8">
          {/* video to play */}
          <VideoToPlay id={id} />
          {/* videos on side */}
          <VideoList setId={setId} />
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
