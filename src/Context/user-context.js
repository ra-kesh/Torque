import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import { useAuth } from "../Hook";
import { userReducer, initialState } from "../Reducer/userReducer";
import { apiUrl } from "../Constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userInfo } = useAuth();

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: user },
          } = await axios.get(`${apiUrl}/userdata/${userInfo._id}`);
          console.log(user);
          dispatch({
            type: "GET HISTORY VIDEOS",
            payload: user.historyVideos,
          });
          dispatch({
            type: "GET LIKED VIDEOS",
            payload: user.likedVideos,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [dispatch, userInfo]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
