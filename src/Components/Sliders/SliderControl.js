export default function SliderControl({ prevHandeller, nextHandeller }) {
  return (
    <div>
      <button onClick={prevHandeller}>prev</button>
      <button onClick={nextHandeller}>next</button>
    </div>
  );
}
