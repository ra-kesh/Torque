import { useState, useEffect } from "react";
import { useAuth } from "../Hook";
import axios from "axios";
import { apiUrl } from "../Constants";
import { VideoSlider } from "../Components";
import { sliderData } from "../Data/Data";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [unfinishedVideos, setUnfinishedVideos] = useState([]);
  const { userInfo } = useAuth();
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
        <div className="flex-col-lg-12">
          <h4>Continue Watching</h4>
          <div className="container">
            <div className="unfinished-videos">
              <div className="flex-row">
                {unfinishedVideos.map((item) => (
                  <div className="flex-col-4">
                    <div
                      className="small-video-card flex"
                      onClick={() =>
                        watchUnfinishedHandeller(
                          item.elapsedTime,
                          item.video._id
                        )
                      }
                    >
                      <div className="small-card-img">
                        <img
                          src={`https://img.youtube.com/vi/${item.video.youtubeId}/mqdefault.jpg`}
                          alt=""
                        />
                      </div>
                      <div className="small-card-desc flex-dir-col">
                        <span className="small-card-title m-bottom">
                          {item.video.name}
                        </span>
                        <span className="small-card-time">
                          {item.remainingTime} minute left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
