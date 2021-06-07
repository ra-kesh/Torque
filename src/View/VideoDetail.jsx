import { useParams } from "react-router-dom";
import { PlayList, MainPlayer } from "../Components";
import { useUserRelatedData } from "../Hook/useUserRelatedData";
import { useState, useEffect } from "react";
// import { useVideoData } from "../Hook";
import { apiUrl } from "../Constants";
import axios from "axios";

const VideoDetail = () => {
  // const { setVideoList, videos } = useVideoData();
  // const [duration, setDuration] = useState(null);
  const [showPlayList, setShowPlayList] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({});
  const { videoId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: videoData },
        } = await axios.get(`${apiUrl}/videos/${videoId}`);
        setCurrentVideo(videoData);
      } catch (err) {
        console.log({ error: err.message });
      }
    })();
  }, [videoId]);

  const { dispatch, playLists, loading, likedVideos, history } =
    useUserRelatedData();

  function playListHandeller() {
    setShowPlayList((showPlayList) => !showPlayList);
  }

  // function completeHandeller({ played }) {
  //   console.log(duration);
  //   console.log(played);
  //   console.log(duration * played);
  //   console.log((duration * (1 - played)) / 60);

  //   if (played <= 0.8) {
  //     setVideoList((videoList) =>
  //       videoList.map((item) =>
  //         item.id === video.id
  //           ? {
  //               ...item,
  //               isComplete: false,
  //               timeElapsed: duration * played,
  //               timeRemaining: Math.floor((duration - item.timeElapsed) / 60),
  //             }
  //           : item
  //       )
  //     );
  //   }
  //   if (played >= 0.8) {
  //     setVideoList((videoList) =>
  //       videoList.map((item) =>
  //         item.id === video.id ? { ...item, isUncomplete: false } : item
  //       )
  //     );
  //   }
  // }

  // function durationHandeller(state){
  //   setDuration(state)
  // }

  console.log(loading);
  console.log(likedVideos);
  console.log(history);

  return (
    <div className="container">
      <div className="flex-row">
        {loading && (
          <div className="flex-col-lg-12" style={{ color: "white" }}>
            loading
          </div>
        )}
        {!loading && (
          <div className="flex-col-lg-12">
            <div className="container">
              <MainPlayer
                currentVideo={currentVideo}
                playListHandeller={playListHandeller}
              />
            </div>
            <div className="container">
              {showPlayList && (
                <PlayList
                  playLists={playLists}
                  dispatch={dispatch}
                  video={currentVideo}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
