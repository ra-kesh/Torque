import { useState, useEffect } from "react";
import { useAuth } from "../Hook";
import axios from "axios";
import { apiUrl } from "../Constants";
import {
  ThumbnailPlayer,
  UnfinishedVideosPlayer,
  VideoSlider,
} from "../Components";
import { sliderData } from "../Data/Data";
import { useNavigate } from "react-router-dom";

const Home = ({ videoList, setVideoList }) => {
  const [unfinishedVideos, setUnfinishedVideos] = useState([]);
  const { userInfo } = useAuth();

  console.log(videoList);

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

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: unfinishedVideosList },
          } = await axios.get(`${apiUrl}/unfinished/${userInfo._id}`);
          setUnfinishedVideos(unfinishedVideosList?.unfinishedVideos || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  const navigate = useNavigate();

  function watchUnfinishedHandeller(elapsedTime, _id) {
    navigate(`/videos/${_id}`, {
      state: {
        elapsedTime,
      },
    });
  }

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-col-lg-12">
          <VideoSlider slides={sliderData} />
        </div>
        {userInfo && (
          <div className="flex-col-lg-12">
            <div className="container">
              <h4>Continue Watching</h4>
            </div>
            <div className="container">
              <UnfinishedVideosPlayer
                unfinishedVideos={unfinishedVideos}
                setUnfinishedVideos={setUnfinishedVideos}
                watchUnfinishedHandeller={watchUnfinishedHandeller}
              />
            </div>
          </div>
        )}
        <div className="flex-col-lg-12 ">
          <div className="container">
            <h4>Featured Videos</h4>
          </div>
          <div className="container">
            <div className="flex-row">
              {[...videoList]?.slice(0, 3).map((video) => (
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
        </div>
      </div>
    </div>
  );
};

export default Home;
