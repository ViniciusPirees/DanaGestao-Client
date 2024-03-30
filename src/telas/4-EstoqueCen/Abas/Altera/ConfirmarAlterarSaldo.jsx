import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from '../../../components/NavBar'
import Titulo from '../../../components/NavBar/Titulo'
import axios from 'axios'
import Notificacao from '../../../components/Notificacao'
import getLogin from '../../../components/Login/getLogin"'

export default function ConfirmarAlterarSaldo({ setAtivo, infosEst, saldo, setInfosEst }) {
    var usuCod = ''
    var usuNome = ''
    useEffect(() => {
        getLogin().then((val) => {
       
            usuCod = val.cod
            usuNome = val.nome
        });
    }, []);

    const confirmar = async () => {
        try {
            const res = await axios.post(
                `http://${import.meta.env.VITE_IP}/alteraSaldo`,
                {
                    params: {
                        saldo: saldo,
                        itemEst: infosEst,
                        usuCod: usuCod,
                        usuNome: usuNome,
                    },
                }
            );
            setAtivo(false)
            setInfosEst('');

            Notificacao(["sucesso", "Saldo alterado com sucesso"]);
        } catch (err) {
            console.log(err);
            Notificacao(["erro", "Erro ao alterar o saldo" + err]);
        }
    }

    return (
        <>
            <div onClick={() => setAtivo(false)} className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"></div>
            <div className="absolute bg-[#1f1f1f] left-0 right-0 z-[6] mx-auto top-0 bottom-0 my-auto h-fit w-[50em] p-10 border-2 rounded-md ">
                <div className='text-2xl text-center'>
                    <h1>Deseja alterar o saldo do item <strong>"{infosEst.EstManId} - {infosEst.EstManDesc}"</strong> de <strong>{infosEst.EstManSaldo}</strong> para <strong>{saldo}</strong>?</h1>
                </div>
                <div className="mx-auto w-fit flex">
                    <button
                        onClick={() => confirmar()}
                        className="bg-[#21862a] p-2 mr-10 duration-200 hover:scale-105 text-2xl font-bold rounded-md mt-10"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => setAtivo(false)}
                        className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 font-bold rounded-md mt-10"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}
