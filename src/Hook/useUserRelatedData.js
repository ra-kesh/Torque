import { useContext } from "react";
import { UserContext } from "../Context";

export const useUserRelatedData = () => {
  const { state, dispatch } = useContext(UserContext);

  return {
    ...state,
    dispatch,
  };
};
