import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Titulo from "../components/Titulo";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getLogin from "../components/getLogin";
import { BsFillCameraFill } from "react-icons/bs";

export default function AcessoAdmin() {
    const nav = useNavigate();
    const [logado, setLogado] = useState(null);
    useEffect(() => {
        getLogin().then((val) => {
            setLogado(val);
            if (!val) {
                nav('/AcessoAdmin')
            }
        });
    }, []);
    const inforc = useLocation().state?.lista
    const tipo = useLocation().state?.tipo
    return (
        <div className="flex">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
                theme="colored"
            />
            <NavBar ativo="7"></NavBar>

            <div className="w-full ml-[8.5em] mr-10">
                <Titulo titulo="Criar Requisição" />
                <div className="mt-10">
                    <div className="flex">

                        <div className="w-[70%] mx-10">
                            <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                            <input
                                type="text"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                                placeholder=""
                                
                            />
                        </div>
                        <div className="w-[30%] mx-10">
                            <h1 className="text-[26px]  font-bold mb-2">Tipo Material:</h1>
                            <input
                                type="text"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                                placeholder=""
                                
                            />
                        </div>
                    </div>
                    <div className="flex mt-10">
                        <div className="w-[40%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                            <input
                                type="text"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                                placeholder=""
                                
                            />
                        </div>
                        <div className="w-[45%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                            <input
                                type="text"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                                placeholder=""
                               
                            />
                        </div>

                        <div className="w-[15%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Anexo:</h1>
                            <button
                                className="p-3 text-3xl bg-transparent w-full border-[2px] rounded-md"
                                placeholder=""
                                
                            >
                                <BsFillCameraFill className="mx-auto "></BsFillCameraFill>
                            </button>
                            
                        </div>
                    </div>
                    <div className="flex mt-10">
                        <div className="w-[33%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Estoque Mínimo:</h1>
                            <input
                                type="number"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder=""
                             
                            />
                        </div>
                        <div className="w-[33%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Estoque Máximo:</h1>
                            <input
                                type="number"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder=""
                               
                            />
                        </div>
                        <div className="w-[33%] mx-10">
                            <h1 className="text-[26px] font-bold mb-2">Saldo:</h1>
                            <input
                                type="number"
                                className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                    <div className="flex mx-auto w-fit my-6">
                        <button
                            onClick={() => criarEst()}
                            className="py-3 px-6 mt-6 mx-10 bg-[#249433] text-3xl font-bold rounded-md"
                        >
                            Confirmar
                        </button>
                        <button
                            className="py-3 px-6 mt-6 mx-10 bg-dana text-3xl font-bold rounded-md"
                            onClick={() => navigate("/EstoqueManutencao")}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>



        </div>
    );
}
