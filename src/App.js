import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar, Sidebar } from "./Components";
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
      <Sidebar />
      <div className="content-div">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
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
    </div>
  );
}

export default App;
