import { NavigateBefore, NavigateNext } from "@material-ui/icons";

export default function SliderControl({ prevHandeller, nextHandeller }) {
  return (
    <div className="m-top-two">
      <button onClick={prevHandeller} className="icon-btn">
        <NavigateBefore />
      </button>
      <button onClick={nextHandeller} className="icon-btn">
        <NavigateNext />
      </button>
    </div>
  );
}
