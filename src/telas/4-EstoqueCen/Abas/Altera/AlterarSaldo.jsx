import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from '../../../components/NavBar'
import Titulo from '../../../components/Titulo'
import ConfirmarAlterarSaldo from './ConfirmarAlterarSaldo'
import Notificacao from '../../../components/Notificacao'
import { useNavigate } from 'react-router-dom'
import getLogin from '../../../components/getLogin'
import { styleAll } from '../../../../css'

export default function AlterarSaldo({ setInfosEst, infosEst }) {
    const [saldo, setSaldo] = useState(infosEst.EstManSaldo)
    const [ativo, setAtivo] = useState(false)

    const navigate = useNavigate();

    const [logado, setLogado] = useState(null);
    useEffect(() => {
        getLogin().then((val) => {
            setLogado(val);
            if (!val) {
                navigate('/')
            }
        });
    }, []);


    const confirmar = () => {
        if (saldo == '') {
            Notificacao(["erro", "Saldo vazio, por favor digitar o saldo!"]);
        } else
            if (saldo == infosEst.EstManSaldo) {
                Notificacao(["erro", "Saldo anterior tem o mesmo valor do novo Saldo"]);
            } else {
                setAtivo(true)
            }
    }

    return (
        <>
            <div onClick={() => setInfosEst('')} className=" opacity-50 bg-[#000] z-[3] fixed top-0 left-0 w-full h-full"></div>
            <div className="absolute bg-[#1f1f1f] left-0 right-0 z-[4] mx-auto top-0 bottom-0 my-auto h-fit w-[70em] p-10 border-2 rounded-md ">
                {ativo && <ConfirmarAlterarSaldo setAtivo={setAtivo} infosEst={infosEst} saldo={saldo} setInfosEst={setInfosEst}></ConfirmarAlterarSaldo>}
                <div className='flex mb-10'>
                    <div className='w-[25%] mx-10'>
                        <h1 className="text-[26px] font-bold mb-2">Cód. Item:</h1>
                        <input
                            disabled
                            type="number"
                            defaultValue={infosEst.EstManId}
                            className={styleAll.input}     ></input>
                    </div>
                    <div className='w-full mx-10'>
                        <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                        <input
                            disabled
                            defaultValue={infosEst.EstManDesc}
                            type="text"
                            className={styleAll.input}         ></input>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[33%] mx-10'>
                        <h1 className="text-[26px] font-bold mb-2">Estoque Mínimo:</h1>
                        <input
                            disabled
                            type="number"
                            defaultValue={infosEst.EstManEstMin}
                            className={styleAll.input}        ></input>
                    </div>
                    <div className='w-[33%] mx-10'>
                        <h1 className="text-[26px]  font-bold mb-2">Estoque Máximo:</h1>
                        <input
                            disabled
                            defaultValue={infosEst.EstManEstMax}
                            type="number"
                            className={styleAll.input}       ></input>
                    </div>
                    <div className='w-[33%] mx-10'>
                        <h1 className="text-[26px]  font-bold mb-2">Saldo:</h1>
                        <input
                            autoFocus
                            value={saldo}
                            onChange={(e) => setSaldo(e.target.value)}
                            type="number"
                            className={styleAll.inputSemOutline}
                        ></input>
                    </div>
                </div>
                <div className="mx-auto w-fit flex">
                    <button
                        onClick={() => confirmar()}
                        className="bg-[#21862a] p-2 mr-10 duration-200 hover:scale-105 text-2xl font-bold rounded-md mt-10"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => setInfosEst('')}
                        className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 font-bold rounded-md mt-10"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}
