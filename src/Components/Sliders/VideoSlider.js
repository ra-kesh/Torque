import React from "react";
import SliderDesc from "./SliderDesc";
import SliderPlayer from "./SliderPlayer";
import SliderControl from "./SliderControl";

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
                <div className="flex-col-lg-6">
                  {index === current && <SliderPlayer slide={slide} />}
                </div>
                <div className="flex-col-lg-6">
                  {index === current && <SliderDesc slide={slide} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="controls flex justify-end">
        <SliderControl
          prevHandeller={prevHandeller}
          nextHandeller={nextHandeller}
        />
      </div>
    </div>
  );
};
