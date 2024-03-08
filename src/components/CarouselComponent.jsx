import Image from "mui-image";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Wall1, Wall2, Wall3, Wall4, LOGO, LOGO1, LOGO2 } from "../assets/carosalImages/index";

const CustomCarousel = () => {
  var images = [LOGO, LOGO1, LOGO2];
  return (
    <Carousel
      height={"100vh"}
      indicators={false}
      navButtonsAlwaysVisible={true}
    >
      {
        images.map((image, i) => (
          <Image
            key={i}
            style={{
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
            width="100%"
            alt="Carousel Image"
            height="100%"
            src={image}
            fit="contain"
          />
        ))
      }
    </Carousel>
  );
};
export default CustomCarousel;
