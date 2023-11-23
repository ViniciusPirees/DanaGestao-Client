import React from 'react'
import { styleAll } from '../../css'

export default function Titulo({ titulo }) {
  return (
        <div className="">
          <div className={styleAll.Telas.Titulo}>{titulo}</div>
          <hr className="border-2" />
        </div>
  )
}
