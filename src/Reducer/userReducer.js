import { v4 } from "uuid";

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW LOADING":
      return { ...state, loading: true };
    case "HIDE LOADING":
      return { ...state, loading: false };

    case "GET HISTORY VIDEOS":
      return { ...state, history: payload };

    case "GET LIKED VIDEOS":
      return { ...state, likedVideos: payload };

    case "GET WATCHLATER VIDEOS":
      return { ...state, watchLater: payload };

    case "GET UNFINISHED VIDEOS":
      return { ...state, unfinishedVideos: payload };

    case "ADD TO UNFINISHED VIDEOS":
      return {
        ...state,
        unfinishedVideos: state.unfinishedVideos.concat(payload),
      };

    case "REMOVE FROM UNFINISHED VIDEOS":
      return {
        ...state,
        unfinishedVideos: state.unfinishedVideos.filter(
          ({ video }) => video !== payload.video
        ),
      };

    case "UPDATE UNFINISHED VIDEOS":
      return {
        ...state,
        unfinishedVideos: state.unfinishedVideos.map((item) => {
          if (item.video === payload.video) {
            return {
              ...item,
              remainingTime: payload.remainingTime,
              elapsedTime: payload.elapsedTime,
            };
          }
          return item;
        }),
      };

    case "ADD TO LIKED VIDEOS":
      return { ...state, likedVideos: state.likedVideos.concat(payload) };

    case "REMOVE FROM LIKED VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          ({ video }) => video !== payload.video
        ),
      };

    case "ADD TO HISTORY":
      return { ...state, history: state.history.concat(payload) };

    case "REMOVE FROM HISTORY":
      return {
        ...state,
        history: state.history.filter(({ video }) => video !== payload.video),
      };

    case "ADD TO WATCH LATER":
      return { ...state, watchLater: state.watchLater.concat(payload) };

    case "REMOVE FROM WATCH LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          ({ video }) => video !== payload.video
        ),
      };

    case "ADD PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.concat({
          id: v4(),
          name: payload,
          videos: [],
        }),
      };

    case "REMOVE PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.filter(
          (playList) => playList.id !== payload.id
        ),
      };

    case "UPDATE PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.map((playList) =>
          playList.id === payload.id
            ? { ...playList, name: payload.newName }
            : playList
        ),
      };

    case "ADD TO PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.map((playList) =>
          playList.id === payload.id
            ? { ...playList, videos: playList.videos.concat(payload.video) }
            : playList
        ),
      };

    case "REMOVE FROM PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.map((playList) =>
          playList.id === payload.id
            ? {
                ...playList,
                videos: playList.videos.filter(
                  (video) => video.id !== payload.video.id
                ),
              }
            : playList
        ),
      };

    default:
      break;
  }
};

export const initialState = {
  loading: false,
  likedVideos: [],
  history: [],
  watchLater: [],
  unfinishedVideos: [],
  playLists: [
    {
      id: v4(),
      name: "Initial List",
      videos: [],
    },
  ],
};
