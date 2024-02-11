import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

import SlideImg1 from "../assets/slider/01.jpg";
import SlideImg2 from "../assets/slider/02.jpg";
import SlideImg3 from "../assets/slider/03.jpg";
import SlideImgMobile1 from "../assets/slider/01-mobile.jpg";
import SlideImgMobile2 from "../assets/slider/02-mobile.jpg";
import SlideImgMobile3 from "../assets/slider/03-mobile.jpg";

export default function Slider() {
  const [isMobile, setIsMobile] = useState(false);

  useState(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        if (window.innerWidth >= 640) {
          setIsMobile(false);
        } else {
          setIsMobile(true);
        }
      }
      handleResize();
      window.addEventListener("resize", handleResize);

      // Unsubscribe event listener to prevent memory leak after component de-mount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="relative">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        stopOnHover={true}
        infiniteLoop={true}
        interval={4000}
        showIndicators={false}
        emulateTouch={true}
        showStatus={false}
        showArrows={true}
      >
        <div>
          <img
            className={`${isMobile ? "h-[300px]" : "h-[500px]"} object-cover`}
            src={isMobile ? SlideImgMobile1 : SlideImg1}
            alt=""
          />
        </div>
        <div>
          <img
            className={`${isMobile ? "h-[300px]" : "h-[500px]"} object-cover`}
            src={isMobile ? SlideImgMobile2 : SlideImg2}
            alt=""
          />
        </div>
        <div>
          <img
            className={`${isMobile ? "h-[300px]" : "h-[500px]"} object-cover`}
            src={isMobile ? SlideImgMobile3 : SlideImg3}
            alt=""
          />
        </div>
      </Carousel>
      <div className="bg-gradient-to-t from-gray-50 to-transparent h-60 w-full absolute bottom-0 pointer-events-none z-1"></div>
    </div>
  );
}
