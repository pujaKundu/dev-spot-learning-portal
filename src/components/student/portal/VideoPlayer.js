import React from "react";

const VideoPlayer = ({ url, title, isLoading, isError }) => {
   let content = null;
   if (isLoading && !isError) {
     content = <p>Loading...</p>;
   }
   if (!isLoading && isError)
     content = <p className="error">There was an error occured</p>;
   else {
     content=<iframe
      width="100%"
      class="aspect-video"
      src={url}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  }
  console.log(url);
  return (
    <>{ content}</>
  );
};

export default VideoPlayer;