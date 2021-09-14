import ReactPlayer from "react-player";

export default function SliderPlayer({ slide }) {
  return (
    <div className="slider-player">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${slide.id}`}
        width="120%"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              mute: 1,
            },
          },
        }}
        loop
      />
    </div>
  );
}
