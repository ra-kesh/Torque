// import { Slider } from '@material-ui/core';
import React from "react";
import ReactPlayer from "react-player";

export const VideoSlider = ({ slides }) => {
  const [current, setCurrent] = React.useState(0);

  const length = slides.length;

  function nextHandeller() {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  }

  function prevHandeller() {
    setCurrent((current) => (current === 0 ? length - 1 : current - 1));
  }

  return (
    <div className="container">
      <div className="slider">
        {slides.map((slide, index) => {
          return (
            <div className={index === current ? "slide active" : "slide"}>
              <div className="flex-row slider-container">
                <div className="flex-col-lg-5 slider-details">
                  {index === current && (
                    <>
                      <h3>{slide.name}</h3>
                      <h5>{slide.desc}</h5>
                    </>
                  )}
                </div>
                <div className="flex-col-lg-7">
                  {index === current && (
                    <div className="slider-player">
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${slide.id}`}
                        width="130%"
                        config={{
                          youtube: {
                            playerVars: {
                              autoplay: 1,
                              mute: 1,
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="controls">
        <button onClick={nextHandeller}>next</button>
        <button onClick={prevHandeller}>prev</button>
      </div>
    </div>
  );
};
