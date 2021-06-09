export default function UnfinishedVideosPlayer({
  unfinishedVideos,
  watchUnfinishedHandeller,
}) {
  return (
    <div className="unfinished-videos">
      <div className="flex-row">
        {unfinishedVideos.map((item) => (
          <div className="flex-col-4">
            <div
              className="small-video-card flex"
              onClick={() =>
                watchUnfinishedHandeller(item.elapsedTime, item.video._id)
              }
            >
              <div className="small-card-img">
                <img
                  src={`https://img.youtube.com/vi/${item.video.youtubeId}/mqdefault.jpg`}
                  alt=""
                />
              </div>
              <div className="small-card-desc flex-dir-col">
                <span className="small-card-title m-bottom">
                  {item.video.name}
                </span>
                <span className="small-card-time">
                  {item.remainingTime} minute left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
