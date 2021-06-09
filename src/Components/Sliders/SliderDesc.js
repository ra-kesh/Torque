export default function SliderDesc({ slide }) {
  return (
    <div className="slider-details">
      <h3>{slide.name}</h3>
      <h5>{slide.desc}</h5>
    </div>
  );
}
