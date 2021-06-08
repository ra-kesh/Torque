import ReactPlayer from "react-player/youtube";
import { PlayerInfoBar } from "..";
import { useActions } from "../../Hook";
import { useState } from "react";

export const MainPlayer = ({ currentVideo, playListHandeller }) => {
  const {
    addToHistory,
    isinHistory,
    isInUnfinishedVideos,
    addToUnfinishedVideos,
    updateUnfinishedVideos,
    removeFromUnfinshedVideos,
  } = useActions();
  const [duration, setDuration] = useState(null);

  const historyHandler = (_id) => {
    if (!isinHistory(_id)) {
      addToHistory(_id);
    }
  };

  const completeHandeller = ({ played }) => {
    if (played <= 0.8 && !isInUnfinishedVideos(currentVideo._id)) {
      addToUnfinishedVideos(currentVideo._id, duration, played);
    }
    if (played <= 0.8 && isInUnfinishedVideos(currentVideo._id)) {
      updateUnfinishedVideos(currentVideo._id, duration, played);
    }
    if (played >= 0.8 && isInUnfinishedVideos(currentVideo._id)) {
      removeFromUnfinshedVideos(currentVideo._id);
    }
  };

  return (
    <>
      <div className="detail-player">
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                mute: 1,
              },
            },
          }}
          loop
          controls
          onStart={() => historyHandler(currentVideo._id)}
          onProgress={completeHandeller}
          onDuration={(state) => setDuration(state)}
          // onProgress={completeHandeller}
          // onDuration={(state) => setDuration(state)}
          // onPause={()=>console.log(reactPlayer.getCurrentTime())}
        />
      </div>
      <div className="container">
        <PlayerInfoBar
          currentVideo={currentVideo}
          playListHandeller={playListHandeller}
        />
      </div>
    </>
  );
};
