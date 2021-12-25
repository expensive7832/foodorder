import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./hero.css"
import img1 from "./../assets/deliv1.png"
import img2 from "./../assets/deliv3.png"
import img3 from "./../assets/deliv.png"
import { Typography } from "@material-ui/core";

const Hero = () => {

    const heroes = [
        {
            image: img1,
            text: "welcome",
            text1: "To foodDelivery",
            text2: "eccomerce site develop and manage by esq. yusuf"
        },
        {
            image: img2,
            text: "enjoy",
            text1: "Have fun",
            text2: "and do refer us to a friend"
        },
        {
            image: img3,
            text: "bonuses",
            text1: "on usage",
            text2: "new product every seconds do check constantly"
        },
    ]

  return (
    <article id="hero">
        <OwlCarousel className="owl-theme" dots={false} lazyLoad={true} items="1" loop margin={10} nav>
      {
          heroes.map((hero) =>(
              <div className="heroStyle">
                   <div>
                  <Typography className="herotext" variant="h6">{hero.text}</Typography>
                  <Typography className="herotext1" variant="h3">{hero.text1}</Typography>
                  <Typography className="herotext2" variant="body2">{hero.text2}</Typography>
                  </div>
                  <img src={hero.image} alt={hero.text}  />
              </div>
          ))
      }
      
    </OwlCarousel>
    </article>
  );
};

export default Hero;
