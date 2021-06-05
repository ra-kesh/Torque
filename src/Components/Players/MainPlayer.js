import ReactPlayer from "react-player/youtube";
import { useActions } from "../../Hook";
// import { useLocation } from "react-router-dom";

export const MainPlayer = ({ currentVideo }) => {
  const { addToHistory, isinHistory } = useActions();

  // const location = useLocation();
  // const path = location.search + location.pathname;

  const historyHandler = (_id) => {
    if (!isinHistory(_id)) {
      addToHistory(_id);
    }
  };

  return (
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
        // onProgress={completeHandeller}
        // onDuration={(state) => setDuration(state)}
        // onPause={()=>console.log(reactPlayer.getCurrentTime())}
      />
    </div>
  );
};
