import { useContext } from "react";
import { VideoContext } from "../Context";

export const useVideoData = () => {
  const { state, dispatch } = useContext(VideoContext);

  return {
    ...state,
    dispatch,
  };
};
