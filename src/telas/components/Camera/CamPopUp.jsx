import React, { useState, ChangeEvent, useEffect } from "react";
import Webcam from "react-webcam";
import { ImCross } from "react-icons/im";
import { BsFillCameraFill } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosSave } from "react-icons/io";
import Notificacao from "../Notificacao";
import { styleAll } from "../../../css";
export default function CamPopUp({ setAnexoTela, setAnexoArray, anexoArray }) {
  const [numAct, setnumAct] = useState(0);
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    },
    [setDevices]
  );

  useEffect(() => {
    setDeviceId(devices[0]?.deviceId);
  }, [devices]);

  React.useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      Notificacao(["atencao", `Navegador não permite usar Web Cam.`]);
    } else {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }
  }, [handleDevices]);

  const optDev = () => {
    if (devices.length > 0) {
      return devices.map((device, k) => {
        return (
          <option key={k} value={device?.deviceId}>
            {device?.label}
          </option>
        );
      });
    }
    return <option value="">Nenhum dispositivo encontrado.</option>;
  };

  const webcamRef = React.useRef(null);
  const [previaArray, setPreviaArray] = useState([]);
  const [ativo, setAtivo] = useState(false);

  const capture = async () => {
    if (anexoArray?.length < 8) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      var file = new File([blob], "printWebCam", { lastModified: Date.now() });

      setAnexoArray([...anexoArray, file]);
      setPreviaArray([...previaArray, webcamRef.current.getScreenshot()]);
      setnumAct(previaArray.length);
    } else {
      Notificacao(["atencao", `Máximo de fotos atingido (8 imagens).`]);
    }
  };

  const onImageChange = (event) => {
    if (anexoArray?.length < 8) {
      if (event.target.files && event.target.files[0]) {
        setAnexoArray([...anexoArray, event.target.files[0]]);
        const data = new FileReader();
        data.addEventListener("load", () => {
          setPreviaArray([...previaArray, data.result]);
          setnumAct(previaArray.length);
        });
        data.readAsDataURL(event.target.files[0]);
      }
    } else {
      Notificacao(["atencao", `Máximo de fotos atingido (8 imagens).`]);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1201 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1201, min: 800 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const itensImg = () => {
    return previaArray?.map((img, i) => {
      return (
        <div
          key={i}
          className={`w-[100%] h-[100%] tablet:max-h-[7em] tablet:max-w-[11em] laptop:max-h-[6em] laptop:max-w-[11em] desktop:max-h-[6em] desktop:max-w-[11em] text-center border-2 p-1 rounded-md hover:cursor-pointer ${
            numAct == i && " border-dana"
          }`}
          onClick={() => setnumAct(i)}
        >
          <img className="w-max h-full inline-block " src={img}></img>
        </div>
      );
    });
  };

  useEffect(() => {
    if (anexoArray?.length > 0) {
      let prev = [];
      anexoArray.forEach((img) => {
        const data = new FileReader();
        data.addEventListener("load", () => {
          prev.push(data.result);
          if (prev.length == anexoArray.length) {
            setPreviaArray(prev);
          }
        });
        data.readAsDataURL(img);
      });
    }
  }, []);

  return (
    <div>
      <div
        onClick={() => setAnexoTela(false)}
        className="opacity-50 bg-[#000] fixed top-0 left-0 w-full h-full"
      ></div>

      <div className="fixed bg-[#1f1f1f] tablet:left-[4.5em] laptop:left-[4.5em] left-0 right-0 z-10 mx-auto  top-0 bottom-0 my-auto  laptop:h-[35em] desktop:h-[40em]  laptop:w-[71em] desktop:w-[81em] tablet:h-[65em] tablet:w-[40em] p-12 border-2 rounded-md ">
        <button
          onClick={() => setAnexoTela(false)}
          className="absolute -mt-8 -ml-8 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <div className=" laptop:flex desktop:flex">
          <div className=" laptop:mr-10 desktop:mr-10">
            <div className=" laptop:mb-3 desktop:my-3 tablet:mb-3 mx-auto w-fit flex">
              <h1 className="text-xl my-auto mr-2">Dispositvo:</h1>
              <select
                id="large"
                className={
                  "block w-fit px-3 py-3 text-xl  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
                onChange={(e) => {
                  setDeviceId(e.target.value);
                }}
              >
                {optDev()}
              </select>
            </div>
            {!ativo && (
              <button
                onClick={() => {
                  if (devices.length > 0) {
                    setAtivo(true);
                  } else {
                    Notificacao(["atencao", `Nenhum dispositivo encontrado.`]);
                  }
                }}
                className="border-4 rounded-2xl text-3xl font-bold w-[22.4em] tablet:w-[18em] laptop:w-[18em] laptop:h-[10.7em] mb-10 h-[12.7em] tablet:h-[10.7em] hover:scale-[101%]"
              >
                Ativar Web Cam{" "}
                <BsFillCameraFill className="mx-auto text-5xl mt-3"></BsFillCameraFill>
              </button>
            )}

            {ativo && (
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "environment",
                  deviceId: deviceId,
                }}
                className="  desktop:mb-10 w-[42em] tablet:w-[33em] tablet:h-[30em] laptop:w-[33em] laptop:h-[30] rounded-2xl"
              />
            )}
          </div>
          {ativo && (
            <div className=" laptop:mx-auto desktop:mx-auto desktop:hidden laptop:hidden  ">
              <button
                onClick={capture}
                className="bg-fundo text-[#fff] duration-200 hover:scale-105 flex text-2xl font-bold p-[0.68rem] mx-auto rounded-md transition-all hover:bg-input"
              >
                Tirar Foto
                <BsFillCameraFill className="ml-2 text-4xl -mt-1"></BsFillCameraFill>
              </button>
            </div>
          )}
          <div className="h-full  laptop:w-[30em] desktop:w-[30em]  ">
            {previaArray?.length > 0 && (
              <>
                <h1 className="text-center font-bold text-2xl tablet:hidden ">
                  Imagens:{" "}
                </h1>
                <div>
                  <div className="mx-auto w-[28em] text-center h-[16em] mb-8 tablet:hidden ">
                    <img
                      className=" mt-5 h-full rounded-2xl inline-block"
                      src={previaArray[numAct]}
                    ></img>
                  </div>
                  <div className="text-center mb-3 tablet:hidden ">
                    <button
                      className="bg-fundo px-2 py-1 text-xl font-semibold rounded-md border-2 "
                      onClick={() => {
                        var prev = [...previaArray];
                        var img = [...anexoArray];
                        prev.splice(numAct, 1);
                        img.splice(numAct, 1);
                        setAnexoArray(img);
                        setPreviaArray(prev);
                        setnumAct(0);
                      }}
                    >
                      Excluir Foto
                    </button>
                  </div>

                  <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="tablet:mx-auto phone:mx-auto tablet:mt-10 phone:mt-10"
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
                  <div className="text-center mt-3  laptop:hidden desktop:hidden ">
                    <button
                      className="bg-fundo px-2 py-1 text-xl font-semibold rounded-md border-2 "
                      onClick={() => {
                        var prev = [...previaArray];
                        var img = [...anexoArray];
                        prev.splice(numAct, 1);
                        img.splice(numAct, 1);
                        setAnexoArray(img);
                        setPreviaArray(prev);
                        setnumAct(0);
                      }}
                    >
                      Excluir Foto
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="relative flex w-full">
          <div className=" mt-10 mx-auto  laptop:mt-6 desktop:mt-0">
            <input
              type="file"
              onChange={(e) => onImageChange(e)}
              accept=".jpg, .jpeg"
              className="bg-fundo text-[#fff] text-2xl font-bold p-2 mx-auto cursor-pointer rounded-md transition-all hover:bg-input"
            ></input>
          </div>
          {ativo && (
            <div className="laptop:mx-auto laptop:mr-[8em] laptop:mt-6 desktop:mx-auto  laptop:block desktop:block hidden">
              <button
                onClick={capture}
                className="bg-fundo text-[#fff] duration-200 hover:scale-105 flex text-2xl font-bold p-[0.68rem] mx-auto rounded-md transition-all hover:bg-input"
              >
                Tirar Foto
                <BsFillCameraFill className="ml-2 text-4xl -mt-1"></BsFillCameraFill>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
