import { useParams } from "react-router-dom";
import { MainPlayer } from "../../Components";
import { useUserRelatedData } from "../../Hook/useUserRelatedData";
import { useState, useEffect } from "react";
import { apiUrl } from "../../Constants";
import axios from "axios";
import { useAuth } from "../../Hook";
import { Add } from "@material-ui/icons";

const VideoDetail = () => {
  const [newPlaylistInput, setNewPlaylistInput] = useState("");
  const [showPlayList, setShowPlayList] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({});
  const { videoId } = useParams();
  const { userInfo } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: videoData },
        } = await axios.get(`${apiUrl}/videos/${videoId}`);
        setCurrentVideo(videoData);
      } catch (err) {
        console.log({ error: err.message });
      }
    })();
  }, [videoId]);

  const { dispatch, allPlayLists, loading } = useUserRelatedData();

  function playListHandeller() {
    setShowPlayList((showPlayList) => !showPlayList);
  }

  const getPlaylistById = (id) => {
    return allPlayLists?.filter((playlistItem) => playlistItem._id === id)?.[0];
  };

  const getPlaylistByName = (name) => {
    return allPlayLists?.filter(
      (playlistItem) => playlistItem.playListName === name
    )?.[0];
  };

  const isInPlaylistById = (playlistId) => {
    const playlist = getPlaylistById(playlistId);
    return playlist?.playListVideos.find((videoItem) => videoItem === videoId);
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    setNewPlaylistInput("");
    if (newPlaylistInput && !getPlaylistByName(newPlaylistInput)) {
      try {
        const response = await axios.post(`${apiUrl}/playlists`, {
          createdBy: userInfo._id,
          playListName: newPlaylistInput,
          playListVideos: [videoId],
        });
        response.data.success &&
          dispatch({
            type: "CREATE_PLAYLIST",
            payload: {
              _id: response.data.playList._id,
              playListName: newPlaylistInput,
              videoId: videoId,
            },
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addOrRemoveToPlayList = async (playListId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/playlists/video/${playListId}`,
        {
          videoId: videoId,
        }
      );

      if (response.data.success) {
        dispatch({
          type: "ADD OR REMOVE TO PLAYLIST",
          payload: { videoId: videoId, playListId: playListId },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="flex-row">
        {loading && (
          <div className="flex-col-lg-12" style={{ color: "white" }}>
            loading
          </div>
        )}
        {!loading && (
          <div className="flex-col-lg-12">
            <div className="container">
              <MainPlayer
                currentVideo={currentVideo}
                playListHandeller={playListHandeller}
              />
            </div>

            {showPlayList && (
              <div className="playlistWrapper">
                <ul>
                  <li className="playlistMenuItem flex align-center">
                    <form
                      onSubmit={(e) => createPlaylist(e)}
                      className="flex align-center"
                    >
                      <input
                        className="newPlaylistInput input-field"
                        value={newPlaylistInput}
                        onChange={(e) =>
                          setNewPlaylistInput(() => e.target.value)
                        }
                        type="text"
                      />
                      <button className="playlist-btn">
                        <Add />
                      </button>
                    </form>
                  </li>
                  {allPlayLists &&
                    allPlayLists.map((playListItem) => (
                      <li key={playListItem._id} className="playlistMenuItem">
                        <input
                          checked={isInPlaylistById(playListItem._id)}
                          type="checkbox"
                          onChange={() =>
                            addOrRemoveToPlayList(playListItem._id)
                          }
                          className="m-right"
                        />
                        <span>{playListItem.playListName}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="container">
          <div className="videoDetail-desc">
            <p>{currentVideo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
