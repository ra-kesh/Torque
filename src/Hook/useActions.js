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
    watchLater,
    unfinishedVideos,
  } = useUserRelatedData();

  const navigate = useNavigate();

  const isinHistory = (_id) => {
    return history?.some(({ video }) => video === _id);
  };
  const isLiked = (id) => {
    return likedVideos?.some(({ video }) => video === id);
  };
  const isInWatchLater = (id) => {
    return watchLater?.some(({ video }) => video === id);
  };
  const isInUnfinishedVideos = (id) => {
    return unfinishedVideos?.some(({ video }) => video === id);
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

  const removeFromHistory = async (_id) => {
    console.log(_id);
    if (userInfo) {
      const {
        data: { success },
      } = await axios.delete(`${apiUrl}/history/${userInfo._id}/${_id}`);

      console.log(success);

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

  const addToUnfinishedVideos = async (_id, duration, played) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.post(`${apiUrl}/unfinished/${userInfo._id}`, {
        video: {
          _id,
        },
        remainingTime: Math.floor((duration * (1 - played)) / 60),
        elapsedTime: duration * played,
      });
      if (success) {
        userDataDispatch({
          type: "ADD TO UNFINISHED VIDEOS",
          payload: {
            video: _id,
          },
        });
      }
    }
  };

  const updateUnfinishedVideos = async (_id, duration, played) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.post(`${apiUrl}/unfinished/${userInfo._id}/${_id}`, {
        remainingTime: Math.floor((duration * (1 - played)) / 60),
        elapsedTime: duration * played,
      });

      if (success) {
        userDataDispatch({
          type: "UPDATE UNFINISHED VIDEOS",
          payload: {
            video: _id,
            remainingTime: Math.floor((duration * (1 - played)) / 60),
            elapsedTime: duration * played,
          },
        });
      }
    }
  };

  const addToLikedVideos = async (_id, path) => {
    if (userInfo && !isLiked(_id)) {
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

  const addToWatchLater = async (_id, path) => {
    if (userInfo && !isInWatchLater(_id)) {
      const {
        data: { success },
      } = await axios.post(`${apiUrl}/watchlater/${userInfo._id}`, {
        video: {
          _id,
        },
      });
      console.log(success);
      if (success) {
        userDataDispatch({
          type: "ADD TO WATCH LATER",
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
        message: "To add to watch later a video you need to login first Bro",
      },
    });
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
  const removeFromWatchLater = async (_id) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.delete(`${apiUrl}/watchlater/${userInfo._id}/${_id}`);

      if (success) {
        userDataDispatch({
          type: "REMOVE FROM WATCH LATER",
          payload: {
            video: _id,
          },
        });
      }
    }
  };
  const removeFromUnfinshedVideos = async (_id) => {
    if (userInfo) {
      const {
        data: { success },
      } = await axios.delete(`${apiUrl}/unfinished/${userInfo._id}/${_id}`);

      if (success) {
        userDataDispatch({
          type: "REMOVE FROM UNFINISHED VIDEOS",
          payload: {
            video: _id,
          },
        });
      }
    }
  };

  return {
    addToWatchLater,
    isInWatchLater,
    isinHistory,
    isLiked,
    addToHistory,
    addToLikedVideos,
    removeFromHistory,
    removeFromLikedVideos,
    removeFromWatchLater,
    addToUnfinishedVideos,
    removeFromUnfinshedVideos,
    isInUnfinishedVideos,
    updateUnfinishedVideos,
    history,
  };
};
