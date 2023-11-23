import React from 'react'
import { ImCross } from 'react-icons/im'

export default function TelaItem({ itens, setTelaItem }) {
    console.log(itens)
    const renderItens = () => {
        return itens?.map((item, i) => {
            console.log(item)
            return (


                <tr className="text-2xl border-b-4 border-[#4f4f4f]  " key={i}>
                    <td className="text-center border-r-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
                        {item.ConItemDescricao}
                    </td>
                    <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
                        {item.ConItemTipMatDesc}
                    </td>
                    <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
                        {item.ConItemProblema}
                    </td>
                    <td className="text-center border-l-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
                        R$ {Number(item.ConItemValor).toFixed(2)}
                    </td>

                </tr>
            )
        })
    }
    return (
        <>
            <div onClick={() => setTelaItem(false)} className=" opacity-50 bg-[#000] z-[3] fixed top-0 left-0 w-full h-full"></div>
            <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[4] mx-auto top-0 bottom-0 my-auto h-fit w-[70%] p-10 border-2 rounded-md ">
                <button
                    onClick={() => setTelaItem(false)}
                    className="absolute -mt-6 -ml-6 text-2xl"
                >
                    <ImCross></ImCross>
                </button>
                <h1 className='text-3xl font-bold text-center mb-8'>Itens do Conserto { }</h1>
                <div className="overflow-x-auto w-full mt-10">
                    <table className="table rounded-lg mx-auto overflow-x-auto w-max">
                        <thead>
                            <tr className="text-2xl bg-dana font-extrabold text-[#fff]">
                                <th className="p-3 w-[20em] rounded-s-md">Descrição.</th>
                                <th className="w-[10em]">Tipo Material</th>
                                <th className="w-[25em]">Problema Apresentado</th>
                                <th className="w-[8em] rounded-e-md">Valor</th>
                            </tr>
                        </thead>
                        <tbody>{renderItens()}</tbody>
                    </table>
                </div>
            </div></>
    )
}
