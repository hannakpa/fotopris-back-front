import { Carousel } from "react-bootstrap";
import flor from "./img/slideshow/flor.jpg";
import cascada from "./img/slideshow/cascada.jpg";
import nature from "./img/slideshow/nature.jpg";

function Slideshow() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="w75" src={flor} alt="Flor" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="w75" src={cascada} alt="Cascada" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="w75" src={nature} alt="Bosque" />
      </Carousel.Item>
    </Carousel>
  );
}
export default Slideshow;
