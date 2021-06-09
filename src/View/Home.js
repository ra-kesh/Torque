import { useState, useEffect } from "react";
import { useAuth } from "../Hook";
import axios from "axios";
import { apiUrl } from "../Constants";
import { UnfinishedVideosPlayer, VideoSlider } from "../Components";
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
            <UnfinishedVideosPlayer
              unfinishedVideos={unfinishedVideos}
              watchUnfinishedHandeller={watchUnfinishedHandeller}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
