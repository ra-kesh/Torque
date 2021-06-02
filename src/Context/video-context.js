
import {createContext,useState,useContext} from 'react'
import {videoData} from '../Data/Data'


export const VideoContext = createContext();


export const VideoProvider =({children})=>{

  const [videoList,setVideoList] = useState(videoData)


    return(

        <VideoContext.Provider value={{videoList,setVideoList}}>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoData =()=>{
    return useContext(VideoContext)
}