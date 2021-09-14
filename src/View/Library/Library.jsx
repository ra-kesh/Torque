import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hook";
import { apiUrl } from "../../Constants";
import { ThumbNailPlayerMini } from "../../Components";

const Library = () => {
  const { userInfo } = useAuth();
  const [history, setHistory] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLater, setWatchlater] = useState([]);
  const [playLists, setPlayLists] = useState([]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: historyVideosList },
          } = await axios.get(`${apiUrl}/history/${userInfo._id}`);
          setHistory(historyVideosList?.historyVideos || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: likedVideosList },
          } = await axios.get(`${apiUrl}/likedvideos/${userInfo._id}`);
          setLikedVideos(likedVideosList?.likedVideos || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const {
            data: { data: watchLaterVideosList },
          } = await axios.get(`${apiUrl}/watchlater/${userInfo._id}`);
          setWatchlater(watchLaterVideosList?.watchLaterVideos || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${apiUrl}/playlists/${userInfo._id}`
          );
          setPlayLists(data.allPlayListsOfUser || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  console.log(playLists);

  return (
    <div className="container">
      <div className="flex-row lib-wrapper">
        <div className="flex-col-12">
          <div className="lib-bar flex space-between m-bottom-two">
            <div className="lib-menu">History</div>
            <div className="lib-menu">See all</div>
          </div>
          <div className="lib-section flex-row">
            {[...history]
              .reverse()
              .slice(0, 4)
              .map((item) => (
                <ThumbNailPlayerMini item={item.video} key={item.video?._id} />
              ))}
          </div>
        </div>
        <div className="flex-col-12">
          <div className="lib-bar flex space-between m-bottom-two">
            <div className="lib-menu">Liked Videos</div>
            <div className="lib-menu">See all</div>
          </div>
          <div className="lib-section flex-row">
            {[...likedVideos]
              .reverse()
              .slice(0, 4)
              .map((item) => (
                <ThumbNailPlayerMini item={item.video} key={item.video?._id} />
              ))}
          </div>
        </div>
        <div className="flex-col-12">
          <div className="lib-bar flex space-between m-bottom-two">
            <div className="lib-menu">Watch Later</div>
            <div className="lib-menu">See all</div>
          </div>
          <div className="lib-section flex-row">
            {[...watchLater]
              .reverse()
              .slice(0, 4)
              .map((item) => (
                <ThumbNailPlayerMini item={item.video} key={item.video?._id} />
              ))}
          </div>
        </div>
        <div className="flex-col-12">
          {playLists.map((item) => (
            <>
              <div className="lib-bar flex space-between m-bottom-two">
                <div className="lib-menu">{item.playListName}</div>
                <div className="lib-menu">See all</div>
              </div>
              <div className="lib-section flex-row">
                {item.playListVideos.map((item) => (
                  <ThumbNailPlayerMini item={item} key={item._id} />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
