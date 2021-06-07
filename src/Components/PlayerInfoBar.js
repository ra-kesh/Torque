import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { useActions } from "../Hook";
import { useLocation } from "react-router-dom";

export const PlayerInfoBar = ({ currentVideo }) => {
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

  function likeHandeller(_id) {
    if (!isLiked(_id)) {
      addToLikedVideos(_id, path);
    } else {
      removeFromLikedVideos(_id, path);
    }
  }

  function watchHandeller(_id) {
    if (!isInWatchLater(_id)) {
      addToWatchLater(_id, path);
    } else {
      removeFromWatchLater(_id, path);
    }
  }

  function playListHandeller() {}

  return (
    <div className="flex-row">
      <div className="flex-col-lg-10 flex-col-md-10">
        <div className="video-details">
          <h4>{currentVideo.name}</h4>
        </div>
      </div>
      <div className="flex-col-lg-2 flex-col-md-2 center-vertically">
        <div className="video-buttons">
          <div onClick={() => likeHandeller(currentVideo._id)}>
            {!isLiked(currentVideo._id) ? (
              <ThumbUpOutlinedIcon fontSize="large" />
            ) : (
              <ThumbUpIcon fontSize="large" />
            )}
          </div>
          <div onClick={() => watchHandeller(currentVideo._id)}>
            {!isInWatchLater(currentVideo._id) ? (
              <TurnedInNotIcon fontSize="large" />
            ) : (
              <TurnedInIcon fontSize="large" />
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
