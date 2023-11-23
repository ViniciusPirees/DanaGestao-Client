import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

export default function ImgPopUp({ img, setAtivoImg, imgComData }) {
  useEffect(() => {
    if (imgComData?.size > 0) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        setImage(data.result);
      });
      data.readAsDataURL(imgComData);
    }
  }, []);

  const [image, setImage] = useState(`data:image/jpeg;base64,${img}`);

  return (
    <>
      <div
        onClick={() => setAtivoImg(false)}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>

      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[6]  mx-auto top-0 bottom-0 my-auto h-fit w-fit p-16 border-2 rounded-md ">
        <button
          onClick={() => setAtivoImg(false)}
          className="absolute -mt-12 -ml-12 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <img className="max-h-[30em]" src={image}></img>
      </div>
    </>
  );
}
