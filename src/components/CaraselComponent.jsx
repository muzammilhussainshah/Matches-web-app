import React from "react";
import Carousel from "react-material-ui-carousel";
import { Wall1, Wall2, Wall3, Wall4 } from "../assets/carosalImages/index";

const CustomCarousel = () => {
  var images = [Wall1, Wall2, Wall3, Wall4];

  return (
    <Carousel height={625} indicators={false}>
      {images.map((image, i) => (
        <img key={i} width="100%" height="100%" src={image} />
      ))}
    </Carousel>
  );
};
export default CustomCarousel;
