import ReactPlayer from "react-player";

const ThumbnailPlayer = ({ video, handlePause, handlePlay }) => {
  return (
    <div className="player-wrapper hover-player">
      <ReactPlayer
        className="react-player"
        url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        config={{
          youtube: {
            playerVars: {
              mute: 1,
              end: 10,
            },
          },
        }}
        loop
        playing={video.playing}
        light={!video.playing}
        onMouseEnter={() => handlePlay(video._id)}
        onMouseLeave={() => handlePause(video._id)}
        width="100%"
      />
    </div>
  );
};

export default ThumbnailPlayer;
