import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Videos, Home, VideoDetail, Login, Signup, UserData } from "./View";
import { NavBar } from "./Components";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./Constants";
import { useVideoData } from "./Hook";

function App() {
  const { dispatch: videoDispatch, videos } = useVideoData();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: videos },
        } = await axios.get(`${apiUrl}/videos`);
        console.log(videos);
        videoDispatch({ type: "GET VIDEOS", payload: videos });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [videoDispatch]);

  useEffect(() => {
    if (videos) {
      setVideoList(videos);
    }
  }, [videos]);

  // console.log(videos);

  // const { videoList, setVideoList } = useVideoData();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserData />} />
        <Route
          path="/videos"
          element={<Videos setVideoList={setVideoList} videoList={videoList} />}
        />
        <Route path="/videos/:videoId" element={<VideoDetail />} />
      </Routes>
    </div>
  );
}

export default App;
