// import ReactPlayer from "react-player/youtube";
// import { useNavigate } from "react-router-dom";
// import { useUserRelatedData } from "../Hook/useUserRelatedData";
import { ThumbnailPlayer } from "../Components";

function Explore({ setVideoList, videoList }) {
  // const { dispatch, } = useUserRelatedData();

  // const navigate = useNavigate();

  let timer = 0;

  function handlePlay(id) {
    timer = setTimeout(() => {
      setVideoList((videoList) =>
        videoList.map((video) => {
          if (video._id === id) {
            return { ...video, playing: true };
          }
          return video;
        })
      );
    }, 1000);
  }

  function handlePause(id) {
    setVideoList((videoList) =>
      videoList.map((video) => {
        if (video._id === id) {
          return { ...video, playing: false };
        }
        return video;
      })
    );
    clearTimeout(timer);
  }

  // function isinHistory(id) {
  //   return history.some((item) => item._id === id);
  // }

  return (
    <div className="container">
      <div className="flex-row">
        {videoList.map((video) => (
          <ThumbnailPlayer
            key={video._id}
            video={video}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
}

export default Explore;
