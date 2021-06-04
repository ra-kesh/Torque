export const videoReducer = (state, action) => {
  switch (action.type) {
    case "SHOW LOADER":
      return { ...state, loading: true };
    case "HIDE LOADER":
      return { ...state, loading: false };
    case "GET VIDEOS":
      return {
        ...state,
        loading: false,
        videos: state.videos.concat(action.payload),
      };

    default:
      break;
  }
};

export const initialState = {
  videos: [],
  loading: false,
  error: null,
};
