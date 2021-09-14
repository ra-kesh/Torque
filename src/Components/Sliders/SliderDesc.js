export default function SliderDesc({ slide }) {
  return (
    <div className="slider-details">
      <h4>{slide.name}</h4>
      <h5>{slide.desc}</h5>
    </div>
  );
}
