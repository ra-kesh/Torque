
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { videoData } from "../Data/Data";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import {PlayList} from '../Components'

import {useUserRelatedData} from '../Hook/useUserRelatedData'
import { useState } from "react";
import { useVideoData } from "../Context/video-context";
// import { duration } from "@material-ui/core";

const VideoDetail = () =>{

    const {setVideoList} = useVideoData();

    const [duration,setDuration] = useState(null);

    const [showPlayList, setShowPlayList] = useState(false);

    const {videoId} = useParams()

    const videoDetails =() =>{
        return videoData.find((video)=>video.id===videoId)
    }

    const video = videoDetails()

    const {dispatch,likedVideos,watchLater,playLists} = useUserRelatedData()

    function isLiked(){
      if(likedVideos.length>0){
        return likedVideos.some((item)=>item.id===video.id)
      }
      return false
    }
    function isInWatchLater(){
      if(watchLater.length>0){
        return watchLater.some((item)=>item.id===video.id)
      }
      return false
    }

  
    function watchHandeller(e){
      if(!isInWatchLater()){
        dispatch({type:"ADD TO WATCH LATER",payload:video})
      }else{
        dispatch({type:"REMOVE FROM WATCH LATER",payload:video})
      }
      e.preventDefault();
    }


    function likeHandeller(e){
      if(!isLiked()){
        dispatch({type:"ADD TO LIKED VIDEOS",payload:video})
      }else{
        dispatch({type:"REMOVE FROM LIKED VIDEOS",payload:video})
      }
      e.preventDefault();
    }

    function playListHandeller(){
      setShowPlayList((showPlayList)=>!showPlayList)
    }

    function completeHandeller({played}){
      console.log(duration)
      console.log(played)
      console.log(duration*played)
      console.log((duration*(1-played))/60)
  
      if(played <= 0.8){
        setVideoList((videoList)=>videoList.map((item)=>item.id===video.id
        ?{...item,
          isComplete:false,
          timeElapsed:duration*played,
          timeRemaining:Math.floor((duration-item.timeElapsed)/60)}
        :item))
      }
      if(played >= 0.8){
        setVideoList((videoList)=>videoList.map((item)=>item.id===video.id?{...item,isUncomplete:false}:item))
      }
    }

    // function durationHandeller(state){
    //   setDuration(state)
    // }

    return(
      <div className="container">
        <div className="flex-row">
          <div className="flex-col-lg-12">
            <div className="container">
                <div className="detail-player" >
                    <ReactPlayer 
                        // ref={reactPlayer}
                        width="100%"
                        height="100%"
                        url={`https://www.youtube.com/watch?v=${video.id}`} 
                        config={{
                            youtube:{
                                playerVars:{
                                autoplay:1,
                                mute : 1,  
                                }
                            }
                        }}
                        loop
                        controls
                        onProgress={completeHandeller}
                        onDuration={(state)=>setDuration(state)}
                        // onPause={()=>console.log(reactPlayer.getCurrentTime())}
                    />
                </div>
            </div>
            <div className="container">
                <div className="flex-row">
                  <div className="flex-col-lg-10 flex-col-md-10">
                      <div className="video-details">
                           <h4>{video.name}</h4>
                      </div>
                  </div>
                  <div className="flex-col-lg-2 flex-col-md-2 center-vertically">
                      <div className="video-buttons">
                        <div onClick={likeHandeller}>
                            {!isLiked()?<ThumbUpOutlinedIcon fontSize="large"/>:<ThumbUpIcon fontSize="large"/>}                         
                        </div>
                        <div onClick={watchHandeller}>
                            {!isInWatchLater()?<TurnedInNotIcon fontSize="large"/>:<TurnedInIcon fontSize="large"/>}                        
                        </div>
                        <div onClick={playListHandeller}>
                              <PlaylistAddIcon fontSize="large"/>
                        </div> 
                      </div>
                  </div>
                </div>                
            </div>
            <div className="container">
              {showPlayList&&(
               <PlayList playLists={playLists} dispatch={dispatch} video={video}/>   
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }


  export default VideoDetail