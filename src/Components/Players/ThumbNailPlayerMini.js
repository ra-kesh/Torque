import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export const ThumbNailPlayerMini = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-col-lg-3 flex-col-md-6 container video-card">
      <div className="player-wrapper hover-player-mini">
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${item.video?.youtubeId}`}
          light={!item.video?.playing}
          width="100%"
        />
      </div>
      <div className="card-name">
        <h5
          onClick={() => navigate(`/videos/${item.video._id}`)}
          className="pointer"
        >
          {item.video?.name}
        </h5>
      </div>
    </div>
  );
};
