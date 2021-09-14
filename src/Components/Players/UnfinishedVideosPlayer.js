export default function UnfinishedVideosPlayer({
  unfinishedVideos,
  watchUnfinishedHandeller,
  // setUnfinishedVideos,
}) {
  console.log(unfinishedVideos);

  return (
    <div className="unfinished-videos">
      <div className="flex-row ">
        {unfinishedVideos.map(({ video, elapsedTime, remainingTime }) => (
          <div className="flex-col-lg-4 p-one" key={video._id}>
            <div className="small-video-card flex">
              <div className="small-card-img">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt=""
                />
              </div>
              <div className="small-card-desc flex-dir-col">
                <span
                  className="small-card-title m-bottom pointer"
                  onClick={() =>
                    watchUnfinishedHandeller(elapsedTime, video._id)
                  }
                >
                  {video.name}
                </span>
                <span className="small-card-time">
                  {remainingTime <= 0
                    ? "less than 1 mintue left"
                    : `${remainingTime} minute left`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
