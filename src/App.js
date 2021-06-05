import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Components";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./Constants";
import { useAuth, useUserRelatedData, useVideoData } from "./Hook";
import {
  Explore,
  Home,
  VideoDetail,
  Login,
  Signup,
  UserData,
  Library,
} from "./View";

function App() {
  const { dispatch: videoDispatch, videos } = useVideoData();
  const { dispatch: userDataDispatch } = useUserRelatedData();
  const { userInfo } = useAuth();
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
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: user },
          } = await axios.get(`${apiUrl}/${userInfo._id}/userdata`);
          console.log(user);
          userDataDispatch({
            type: "GET HISTORY VIDEOS",
            payload: user.historyVideos,
          });
          userDataDispatch({
            type: "GET LIKED VIDEOS",
            payload: user.likedVideos,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [userDataDispatch, userInfo]);

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
        <Route path="/library" element={<Library />} />
        <Route
          path="/explore"
          element={
            <Explore setVideoList={setVideoList} videoList={videoList} />
          }
        />
        <Route path="/videos/:videoId" element={<VideoDetail />} />
      </Routes>
    </div>
  );
}

export default App;
