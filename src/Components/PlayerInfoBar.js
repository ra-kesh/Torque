import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { useActions } from "../Hook";
import { useLocation } from "react-router-dom";

export const PlayerInfoBar = ({ currentVideo, playListHandeller }) => {
  const {
    addToLikedVideos,
    isLiked,
    isInWatchLater,
    removeFromLikedVideos,
    addToWatchLater,
    removeFromWatchLater,
  } = useActions();

  const location = useLocation();
  const path = location.pathname + location.search;

  // function playListHandeller() {}

  return (
    <div className="flex-row">
      <div className="flex-col-lg-10 flex-col-md-10 ">
        <p className="videoDetail-name">{currentVideo.name}</p>
      </div>
      <div className="flex-col-lg-2 flex-col-md-2  center-vertically">
        <div className="video-buttons">
          <div>
            {!isLiked(currentVideo._id) ? (
              <ThumbUpOutlinedIcon
                fontSize="large"
                onClick={() => addToLikedVideos(currentVideo._id, path)}
              />
            ) : (
              <ThumbUpIcon
                fontSize="large"
                onClick={() => removeFromLikedVideos(currentVideo._id)}
              />
            )}
          </div>
          <div>
            {!isInWatchLater(currentVideo._id) ? (
              <TurnedInNotIcon
                fontSize="large"
                onClick={() => addToWatchLater(currentVideo._id, path)}
              />
            ) : (
              <TurnedInIcon
                fontSize="large"
                onClick={() => removeFromWatchLater(currentVideo._id)}
              />
            )}
          </div>
          <div onClick={playListHandeller}>
            <PlaylistAddIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};
