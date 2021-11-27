import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Components";
import { useEffect, useState } from "react";
import { useVideoData } from "./Hook";
import { Explore, Home, VideoDetail, Login, Signup, Library } from "./View";
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home videoList={videoList} setVideoList={setVideoList} />
            </>
          }
        />
        <PrivateRoute
          path="/library"
          element={
            <>
              {" "}
              <NavBar />
              <Library />
            </>
          }
        />
        <Route
          path="/explore"
          element={
            <>
              <NavBar />
              <Explore setVideoList={setVideoList} videoList={videoList} />
            </>
          }
        />
        <Route
          path="/videos/:videoId"
          element={
            <>
              <NavBar />
              <VideoDetail />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
