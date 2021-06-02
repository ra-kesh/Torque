import './App.css';
import {Routes,Route} from 'react-router-dom'
import { Videos,Home,VideoDetail} from './View';
import { NavBar } from './Components';
import { useVideoData } from './Context/video-context';


function App() {

  const {videoList,setVideoList} = useVideoData();

  return (
    <div className="App">
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/videos' element={<Videos videoList={videoList} setVideoList={setVideoList} />}/>
        <Route path="/videos/:videoId" element={<VideoDetail/>}/>

      </Routes>
    </div>
  );
}

export default App;
