import { useAuth, useUserRelatedData } from "./index";
import { apiUrl } from "../Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useActions = () => {
  const { userInfo } = useAuth();
  const {
    dispatch: userDataDispatch,
    history,
    likedVideos,
  } = useUserRelatedData();
  const navigate = useNavigate();

  const isinHistory = (id) => {
    return history.some(({ video }) => video === id);
  };
  const isLiked = (id) => {
    return likedVideos.some(({ video }) => video === id);
  };
  const isInWatchLater = (id) => {
    // return likedVideos.some(({ video }) => video === id);
  };

  const addToHistory = async (_id) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.post(`${apiUrl}/history/${userInfo._id}`, {
        video: {
          _id,
        },
      });
      if (success) {
        userDataDispatch({
          type: "ADD TO HISTORY",
          payload: {
            video: _id,
          },
        });
      }
    }
  };
  const addToLikedVideos = async (_id, path) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.post(`${apiUrl}/likedvideos/${userInfo._id}`, {
        video: {
          _id,
        },
      });
      console.log(success);
      if (success) {
        userDataDispatch({
          type: "ADD TO LIKED VIDEOS",
          payload: {
            video: _id,
          },
        });
      }
      return;
    }
    navigate("/login", {
      state: {
        from: path,
        message: "To like a video you need to login first Bro",
      },
    });
  };

  const removeFromHistory = async (_id) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.delete(`${apiUrl}/history/${userInfo._id}/${_id}`);

      if (success) {
        userDataDispatch({
          type: "REMOVE FROM HISTORY",
          payload: {
            video: _id,
          },
        });
      }
    }
  };
  const removeFromLikedVideos = async (_id) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.delete(`${apiUrl}/likedvideos/${userInfo._id}/${_id}`);

      if (success) {
        userDataDispatch({
          type: "REMOVE FROM LIKED VIDEOS",
          payload: {
            video: _id,
          },
        });
      }
    }
  };

  return {
    isInWatchLater,
    isinHistory,
    isLiked,
    addToHistory,
    addToLikedVideos,
    removeFromHistory,
    removeFromLikedVideos,
  };
};