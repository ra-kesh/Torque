import { ThumbnailPlayer } from "../Components";
import { useNavigate } from "react-router-dom";

function Explore({ setVideoList, videoList }) {
  const navigate = useNavigate();

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

  return (
    <div className="container">
      <div className="flex-row">
        {videoList?.map((video) => (
          <div
            className="flex-col-lg-4 flex-col-md-6 container video-card"
            key={video._id}
          >
            <ThumbnailPlayer
              key={video._id}
              video={video}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
            <div className="card-name">
              <h5
                onClick={() => navigate(`/videos/${video._id}`)}
                className="pointer"
              >
                {video.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
