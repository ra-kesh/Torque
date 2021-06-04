import { useParams } from "react-router-dom";
import { PlayList, MainPlayer, PlayerInfoBar } from "../Components";
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

  const { dispatch, playLists } = useUserRelatedData();

  // function isLiked() {
  //   if (likedVideos.length > 0) {
  //     // return likedVideos.some((item) => item.id === video.id);
  //   }
  //   return false;
  // }
  // function isInWatchLater() {
  //   if (watchLater.length > 0) {
  //     // return watchLater.some((item) => item.id === video.id);
  //   }
  //   return false;
  // }

  // function watchHandeller(e) {
  //   if (!isInWatchLater()) {
  //     // dispatch({ type: "ADD TO WATCH LATER", payload: video });
  //   } else {
  //     // dispatch({ type: "REMOVE FROM WATCH LATER", payload: video });
  //   }
  //   e.preventDefault();
  // }

  // function likeHandeller(e) {
  //   if (!isLiked()) {
  //     // dispatch({ type: "ADD TO LIKED VIDEOS", payload: video });
  //   } else {
  //     // dispatch({ type: "REMOVE FROM LIKED VIDEOS", payload: video });
  //   }
  //   e.preventDefault();
  // }

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

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-col-lg-12">
          <div className="container">
            <MainPlayer currentVideo={currentVideo} />
          </div>
          <div className="container">
            <PlayerInfoBar
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
      </div>
    </div>
  );
};

export default VideoDetail;
