import ReactPlayer from 'react-player/youtube'
import {useNavigate} from 'react-router-dom'
import {useUserRelatedData} from '../Hook/useUserRelatedData'



 function Videos({videoList,setVideoList}){

  const {dispatch,history} = useUserRelatedData();

    const navigate = useNavigate();

    let timer = 0;

    function handlePlay(id){
      timer =setTimeout(() => {
        setVideoList((videoList)=>videoList.map((video)=>{
          if(video.id===id){
            return {...video,playing:true}
          }
          return video
        }))
        
      },1000);
     
    }
  
    function handlePause(id){
      setVideoList((videoList)=>videoList.map((video)=>{
        if(video.id===id){
          return {...video,playing:false}
        }
        return video
      }))
      clearTimeout(timer)
    }

    function isinHistory(id){
      return history.some((item)=>item.id===id)
    }

    function clickHandeller(video){     
      if(isinHistory(video.id)){
        dispatch({type:"REMOVE FROM HISTORY",payload:video})
        dispatch({type:"ADD TO HISTORY",payload:video})
      }
      if(!isinHistory(video.id)){
        dispatch({type:"ADD TO HISTORY",payload:video})
      }
      navigate(`/videos/${video.id}`)
    }

    return(
      <div className="container">
        <div className="flex-row">
        {
          videoList.map((video)=>(
                <div className="flex-col-lg-4 flex-col-md-6 container video-card">              
                    <div className="player-wrapper hover-player" >
                        <ReactPlayer 
                            className="react-player"
                            url={`https://www.youtube.com/watch?v=${video.id}`} 
                            config={{
                                youtube:{
                                    playerVars:{
                                    mute : 1,  
                                    end:10
                                    }
                                }
                            }}
                            loop
                            playing={video.playing}
                            light={!video.playing} 
                            onMouseEnter={()=>handlePlay(video.id)}
                            onMouseLeave={()=>handlePause(video.id)}
                            width='100%'
                        />
                    </div>
                    <div className="card-name">
                        <h5 onClick={()=>clickHandeller(video)} className='pointer'>
                        {video.name}</h5>
                    </div>
                </div>
          ))
        }         
        </div>
      </div>
    )
  }
    
  export default Videos;