import React from 'react';
import ReactPlayer from "react-player";

const VideoLesson = ({desc, videoUrl}) => {

  return (
    <>
      <p>{desc}</p>
      <ReactPlayer
        url={`${videoUrl}`}
        controls={true}
        width="100%"
        height="400px"
        style={{marginBottom: '20px', marginTop: '20px'}}
      />
    </>
  )
}

export default VideoLesson;
