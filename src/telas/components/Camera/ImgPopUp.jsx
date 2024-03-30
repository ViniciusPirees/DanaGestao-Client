import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Carousel from "react-multi-carousel";

export default function ImgPopUp({ img, setAtivoImg }) {
  const [numAct, setnumAct] = useState(0);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const itensImg = () => {
    return previaArray?.map((item, i) => {
      
      return (
        <div
          key={i}
          className="w-[10em]   h-[6em] text-center border-2 p-1 hover:cursor-pointer"
          onClick={() => setnumAct(i)}
        >
          <img className="w-max h-full inline-block " src={item}></img>
        </div>
      );
    });
  };
  const [previaArray, setPreviaArray] = useState([]);

  useEffect(() => {
    if (img?.length > 0) {
      let prev = [];
      img.forEach((item) => {
        const data = new FileReader();
        data.addEventListener("load", () => {
          prev.push(data.result);
          if (prev.length == img.length) {
            setPreviaArray(prev);
          }
        });
        data.readAsDataURL(item);
      });
    }
  }, []);

  return (
    <>
      <div
        onClick={() => setAtivoImg(false)}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>

      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[6]  mx-auto top-0 bottom-0 my-auto h-[34em] w-[40em] p-16 border-2 rounded-md ">
        <button
          onClick={() => setAtivoImg(false)}
          className="absolute -mt-12 -ml-12 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <h1 className="text-center font-bold text-2xl ">Imagens: </h1>
        <div>
          <div className="mx-auto w-[28em] text-center h-[16em] mb-10">
            <img
              className=" mt-5 h-full rounded-2xl inline-block"
              src={previaArray[numAct]}
            ></img>
          </div>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {itensImg()}
          </Carousel>
        </div>
      </div>
    </>
  );
}
