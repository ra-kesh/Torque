import { createContext, useReducer, useEffect } from "react";
import { initialState, videoReducer } from "../Reducer";
import axios from "axios";
import { apiUrl } from "../Constants";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: videos },
        } = await axios.get(`${apiUrl}/videos`);
        console.log(videos);
        dispatch({ type: "GET VIDEOS", payload: videos });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
