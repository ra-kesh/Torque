import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const ThumbnailPlayer = ({ video, handlePause, handlePlay }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-col-lg-4 flex-col-md-6 container video-card">
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
      <div className="card-name">
        <h5
          onClick={() => navigate(`/videos/${video._id}`)}
          className="pointer"
        >
          {video.name}
        </h5>
      </div>
    </div>
  );
};

export default ThumbnailPlayer;
