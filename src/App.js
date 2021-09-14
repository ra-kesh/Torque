import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Components";
import { useEffect, useState } from "react";
import { useVideoData } from "./Hook";
import {
  Explore,
  Home,
  VideoDetail,
  Login,
  Signup,
  UserData,
  Library,
} from "./View";
import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  const { videos } = useVideoData();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    if (videos) {
      setVideoList(videos);
    }
  }, [videos]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home videoList={videoList} setVideoList={setVideoList} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/user" element={<UserData />} />
        <PrivateRoute path="/library" element={<Library />} />
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
