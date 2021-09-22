import ReactPlayer from "react-player/youtube";
import { PlayerInfoBar } from "..";
import { useActions } from "../../Hook";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const MainPlayer = ({ currentVideo, playListHandeller }) => {
  const {
    addToHistory,
    removeFromHistory,
    isinHistory,
    isInUnfinishedVideos,
    addToUnfinishedVideos,
    updateUnfinishedVideos,
    removeFromUnfinshedVideos,
  } = useActions();

  console.log(isinHistory(currentVideo._id));

  const [duration, setDuration] = useState(null);

  const location = useLocation();
  const elapsedTime = location.state?.elapsedTime;

  const historyHandler = (_id) => {
    if (isinHistory(_id)) {
      removeFromHistory(_id);
    }
    addToHistory(_id);
  };

  const completeHandeller = ({ played }) => {
    if (played <= 0.9 && !isInUnfinishedVideos(currentVideo._id)) {
      addToUnfinishedVideos(currentVideo._id, duration, played);
    }
    if (played <= 0.9 && isInUnfinishedVideos(currentVideo._id)) {
      updateUnfinishedVideos(currentVideo._id, duration, played);
    }
    if (played >= 0.9 && isInUnfinishedVideos(currentVideo._id)) {
      removeFromUnfinshedVideos(currentVideo._id);
    }
  };

  function startTime() {
    if (elapsedTime !== undefined) {
      return Math.floor(elapsedTime);
    } else return 0;
  }

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
                start: startTime(),
              },
            },
          }}
          loop
          controls
          onStart={() => historyHandler(currentVideo._id)}
          onProgress={completeHandeller}
          onDuration={(state) => setDuration(state)}
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
