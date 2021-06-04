import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";

export const PlayerInfoBar = ({
  currentVideo,
  likeHandeller,
  watchHandeller,
  playListHandeller,
}) => {
  function isLiked() {}
  function isInWatchLater() {}
  return (
    <div className="flex-row">
      <div className="flex-col-lg-10 flex-col-md-10">
        <div className="video-details">
          <h4>{currentVideo.name}</h4>
        </div>
      </div>
      <div className="flex-col-lg-2 flex-col-md-2 center-vertically">
        <div className="video-buttons">
          <div onClick={likeHandeller}>
            {!isLiked() ? (
              <ThumbUpOutlinedIcon fontSize="large" />
            ) : (
              <ThumbUpIcon fontSize="large" />
            )}
          </div>
          <div onClick={watchHandeller}>
            {!isInWatchLater() ? (
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
