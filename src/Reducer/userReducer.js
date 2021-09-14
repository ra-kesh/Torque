const addToPlayList = (state, videoId, playlistId) => ({
  ...state,
  allPlayLists: state.allPlayLists.map((playlistItem) => {
    return playlistItem._id === playlistId
      ? {
          ...playlistItem,
          playListVideos: [...playlistItem.playListVideos, videoId],
        }
      : playlistItem;
  }),
});

const removeFromPlayList = (state, videoId, playlistId) => ({
  ...state,
  allPlayLists: state.allPlayLists.map((playlistItem) => {
    return playlistItem._id === playlistId
      ? {
          ...playlistItem,
          playListVideos: playlistItem.playListVideos.filter(
            (videoItem) => videoItem !== videoId
          ),
        }
      : playlistItem;
  }),
});

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

    case "GET ALL PLAYLISTS":
      return { ...state, allPlayLists: payload };

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

    case "UPDATE_PLAYLIST_NAME":
      return {
        ...state,
        allPlayLists: state.allPlayLists.map((playlistItem) =>
          playlistItem._id === payload._id
            ? { ...playlistItem, playListName: payload.playListName }
            : playlistItem
        ),
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        allPlayLists: state.allPlayLists.filter(
          (playlistItem) => playlistItem._id !== payload.playlistId
        ),
      };
    case "CLEAR_PLAYLISTS":
      return {
        ...state,
        allPlayLists: [],
      };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        allPlayLists: [
          ...state.allPlayLists,
          {
            _id: payload._id,
            playListName: payload.playListName,
            playListVideos: [payload.videoId],
          },
        ],
      };

    case "ADD OR REMOVE TO PLAYLIST":
      const currentPlayList = state.allPlayLists.find(
        (playListItem) => playListItem._id === payload.playListId
      );
      const isInPlayList = currentPlayList.playListVideos.find(
        (videoItem) => videoItem === payload.videoId
      );
      return isInPlayList
        ? removeFromPlayList(state, payload.videoId, payload.playListId)
        : addToPlayList(state, payload.videoId, payload.playListId);

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
  allPlayLists: [],
};
