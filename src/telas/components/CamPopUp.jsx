import React, { useState, ChangeEvent, useEffect } from "react";
import Webcam from "react-webcam";
import { ImCross } from "react-icons/im";
import { BsFillCameraFill } from "react-icons/bs";

import { IoIosSave } from "react-icons/io";
import Notificacao from "./Notificacao";
export default function CamPopUp({ setAnexoTela, setAnexoFile, anexofile }) {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const [imageSrc, setimageSrc] = useState(null);
  const webcamRef = React.useRef(null);
  const [file, setFile] = useState(anexofile);

  const [previa, setPrevia] = useState(null);
  const [ativo, setAtivo] = useState(false);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    var file = new File([blob], "printWebCam", { lastModified: Date.now() });
    setimageSrc(file);
    setFile(null);
    setPrevia(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageSrc(null);
      setFile(event.target.files[0]);
      const data = new FileReader();
      data.addEventListener("load", () => {
        setPrevia(data.result);
      });
      data.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (anexofile?.size > 0) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        setPrevia(data.result);

      });
      data.readAsDataURL(anexofile);
    }
  }, []);

  return (
    <div>
      <div
        onClick={() => setAnexoTela(false)}
        className="opacity-50 bg-[#000] fixed top-0 left-0 w-full h-full"
      ></div>

      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-10 mx-auto top-0 bottom-0 my-auto h-[36em] w-[81em] p-12 border-2 rounded-md ">
        <button
          onClick={() => setAnexoTela(false)}
          className="absolute -mt-8 -ml-8 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <div className="flex">
          <div className="mr-10">
            {!ativo && (
              <button
                onClick={() => setAtivo(true)}
                className="border-4 rounded-2xl text-3xl font-bold w-[22.4em] mb-10 h-[12.7em]"
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
                videoConstraints={videoConstraints}
                className="mb-10 w-[42em] rounded-2xl"
              />
            )}
          </div>
          <div className="h-full w-[30em] ">
            {previa?.length > 0 && (
              <h1 className="text-center font-bold text-2xl ">Prévia: </h1>
            )}
            {previa?.length > 0 && (
              <div className="mx-auto w-fit">
                <img
                  className=" max-w-[31em] max-h-[20em] mb-10 mt-5 h-1/3 rounded-2xl inline-block"
                  src={previa}
                ></img>
              </div>
            )}
          </div>
        </div>
        <div className="relative flex ">
          <div className="mx-auto ">
            <input
              type="file"
              onChange={(e) => onImageChange(e)}
              accept=".jpg, .jpeg"
              className="bg-fundo text-[#fff] text-2xl font-bold p-2 mx-auto cursor-pointer rounded-md transition-all hover:bg-input"
            ></input>
          </div>
          {ativo && (
            <div className="mx-auto ">
              <button
                onClick={capture}
                className="bg-fundo text-[#fff] duration-200 hover:scale-105 flex text-2xl font-bold p-[0.68rem] mx-auto rounded-md transition-all hover:bg-input"
              >
                Tirar Foto
                <BsFillCameraFill className="ml-2 text-4xl -mt-1"></BsFillCameraFill>
              </button>
            </div>
          )}
          {imageSrc && (
            <div className="mx-auto ">
              <button
                onClick={() => {
                  setAnexoFile(imageSrc)
                  Notificacao(["sucesso", `Imagem salva com sucesso.`]);
                }}
                className="bg-fundo text-[#fff] flex text-2xl duration-200 hover:scale-105 font-bold  p-2 mx-auto cursor-pointer rounded-md transition-all hover:bg-input"
              >
                Salvar Foto (WebCam)
                <IoIosSave className="ml-1 text-4xl -mt-1"></IoIosSave>
              </button>
            </div>
          )}

          {file && (
            <div className="mx-auto ">
              <button
                onClick={() => {
                  setAnexoFile(file);
                  Notificacao(["sucesso", `Imagem salva com sucesso.`]);
                }}
                className="bg-fundo text-[#fff] text-2xl duration-200 hover:scale-105 font-bold  p-2 flex mx-auto cursor-pointer rounded-md transition-all hover:bg-input"
              >
                Salvar Foto (Arquivo)
                <IoIosSave className="ml-1 text-4xl -mt-1"></IoIosSave>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
