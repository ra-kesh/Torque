import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { useUserRelatedData } from "../Hook";
import { apiUrl } from "../Constants";
import axios from "axios";
import { useAuth } from "../Hook";

const PlayListDetail = ({ videoId }) => {
  const [newPlaylistInput, setNewPlaylistInput] = useState("");

  const { dispatch, allPlayLists } = useUserRelatedData();
  const { userInfo } = useAuth();

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
              onChange={(e) => setNewPlaylistInput(() => e.target.value)}
              type="text"
            />
            <button className="icon-btn">
              <Add />
            </button>
          </form>
        </li>

        {allPlayLists &&
          allPlayLists?.map((playListItem) => {
            console.log(playListItem);
            console.log(isInPlaylistById(playListItem?._id));
            return (
              <li key={playListItem._id} className="playlistMenuItem">
                <input
                  checked={isInPlaylistById(playListItem?._id) ? true : false}
                  type="checkbox"
                  onChange={() => addOrRemoveToPlayList(playListItem._id)}
                  className="m-right pointer"
                />
                <span>{playListItem.playListName}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PlayListDetail;
