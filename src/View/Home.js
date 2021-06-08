import { useState, useEffect } from "react";
import { useAuth } from "../Hook";
import axios from "axios";
import { apiUrl } from "../Constants";
import { VideoSlider } from "../Components";
// import { useVideoData } from "../Hook";
import { sliderData } from "../Data/Data";

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

  console.log(unfinishedVideos);

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-col-lg-12">
          <VideoSlider slides={sliderData} />
        </div>
        <div className="flex-col-lg-12"></div>
      </div>
    </div>
  );
};

export default Home;
