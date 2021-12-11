import { useParams } from "react-router-dom";
import { MainPlayer } from "../../Components";
import { useUserRelatedData } from "../../Hook/useUserRelatedData";
import { useState, useEffect } from "react";
import { apiUrl } from "../../Constants";
import axios from "axios";
import PlayListDetail from "../../Components";

const VideoDetail = () => {
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

  const { loading } = useUserRelatedData();

  function playListHandeller() {
    setShowPlayList((showPlayList) => !showPlayList);
  }

  return (
    <div className="container">
      <div className="flex-row">
        {!loading && (
          <div className="flex-col-lg-12">
            <div className="container">
              <MainPlayer
                currentVideo={currentVideo}
                playListHandeller={playListHandeller}
              />
            </div>
            {showPlayList && <PlayListDetail videoId={videoId} />}
          </div>
        )}
        <div className="container">
          <div className="videoDetail-desc">
            <p>{currentVideo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
