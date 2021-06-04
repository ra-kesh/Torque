import React from "react";
import { VideoSlider } from "../Components";
// import { useVideoData } from "../Hook";
import { sliderData } from "../Data/Data";

const Home = () => {
  //   const { videoList } = useVideoData();
  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-col-lg-12">
          {/* <VideoSlider slides={sliderData} /> */}
        </div>
        <div className="flex-col-lg-12">
          {/* {videoList
            .slice(0)
            .reverse()
            .map((video) =>
              video.isComplete === false ? (
                <div>
                  {video.name}
                  {video.timeRemaining}
                </div>
              ) : null
            )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
