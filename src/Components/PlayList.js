
import {useState,useEffect} from 'react'


export const PlayList = ({playLists,dispatch,video}) => {

   const [formValue,setFormValue] = useState('')
   const [isEditing,setIsEditing] = useState(false)
   const [currentPlayList,setCurrentPlayList] = useState({});


   useEffect(() => {
      if(isEditing===true){
        setFormValue(currentPlayList.name)
      }
   }, [isEditing,currentPlayList])


    function addHandeller(){
        if(formValue !==''){
          dispatch({type:'ADD PLAYLIST',payload:formValue})
        }
        setFormValue('')
  
      }

    function updateHandeller(playList){
        if(formValue !==''){
          dispatch({type:'UPDATE PLAYLIST',payload:{id:playList.id,newName:formValue}})
        }
        setFormValue('')
        setIsEditing(false)
      }

    function deleteHandeller(playList){
        dispatch({type:'REMOVE PLAYLIST',payload:playList})
    }

    function addToPlaylistHandeller(playList){
        dispatch({type:'ADD TO PLAYLIST',payload:{id:playList.id,video:video}})
    }

    function removeFromPlaylistHandeller(playList){
        if(isInPlayList(playList)){
            dispatch({type:'REMOVE FROM PLAYLIST',payload:{id:playList.id,video:video}})
        }
    }

    function isInPlayList(playList){
        return playList.videos.some((singleVideo)=>singleVideo.id===video.id)
    }

    function editHandeller(playList){
        setIsEditing(true)
        setCurrentPlayList(playList)
    }

    console.log(playLists)

    return (
        <div className="playlist-panel">
            <div className="flex-row">
                <div className="flex-col-lg-6">
                    <div className="container">
                            <>
                                {!isEditing?(
                                    <h4>create a new playlist</h4>
                                ):(
                                    <h4>edit the playlist</h4>
                                )}
                                
                                <input type="text" value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>

                                {!isEditing?(
                                    <button onClick={addHandeller}>add</button>
                                ):(
                                    <button onClick={()=>updateHandeller(currentPlayList)}>update</button>
                                )}
                            </>
                            

                    </div>
                </div>
                <div className="flex-col-lg-6">
                    <div className="container">
                        <h4>add to the playlist</h4>
                        {playLists&&playLists.map((playList)=>(
                            <div className='flex-row'>
                                <div className="flex-col-6">
                                    <h5>{playList.name}</h5>        
                                </div>
                                <div className="flex-col-6">
                                    <button onClick={()=>deleteHandeller(playList)}>delete</button>
                                    <button onClick={()=>editHandeller(playList)}>edit</button>
                                    <button onClick={()=>addToPlaylistHandeller(playList)}>add</button>
                                    <button onClick={()=>removeFromPlaylistHandeller(playList)}>remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
      </div>
    )
}
