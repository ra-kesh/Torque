import ReactPlayer from "react-player/youtube";

export const MainPlayer = ({ currentVideo }) => {
  return (
    <div className="detail-player">
      <ReactPlayer
        // ref={reactPlayer}
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
        // onProgress={completeHandeller}
        // onDuration={(state) => setDuration(state)}
        // onPause={()=>console.log(reactPlayer.getCurrentTime())}
      />
    </div>
  );
};
