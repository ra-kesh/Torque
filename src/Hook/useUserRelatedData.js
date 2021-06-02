import {useContext} from 'react'
import {UserContext} from '../Context'

export const useUserRelatedData = () => {

    const {state,dispatch} = useContext(UserContext)

    return{
        likedVideos:state.likedVideos,
        history:state.history,
        watchLater:state.watchLater,
        playLists:state.playLists,
        dispatch
    }
    
    
}
