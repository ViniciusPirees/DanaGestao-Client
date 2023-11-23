import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import SolicitarMateriais from "./telas/1-SolicitarMateriais/SolicitarMateriais.jsx";
import ConsultarMateriais from "./telas/2-ConsultarMateriais/ConsultarMateriais.jsx";
import EstoqueMan from "./telas/3-EstoqueMan/EstoqueMan.jsx";

import Conserto from "./telas/5-Conserto/Conserto.jsx";
import ControleRC from "./telas/6-ControleRC/ControleRC.jsx";
import AcessoAdmin from "./telas/7-AcessoAdmin/AcessoAdmin.jsx";

import Cadastros from "./telas/7-AcessoAdmin/Criacoes/Cadastros.jsx";
import Area from "./telas/7-AcessoAdmin/Criacoes/Area/Area.jsx";
import Fornecedor from "./telas/7-AcessoAdmin/Criacoes/Fornecedor/Fornecedor.jsx";
import Maquinas from "./telas/7-AcessoAdmin/Criacoes/Maquinas/Maquinas.jsx";
import Solicitantes from "./telas/7-AcessoAdmin/Criacoes/Solicitante/Solicitantes.jsx";
import Manutentor from "./telas/7-AcessoAdmin/Criacoes/Manutentor/Manutentor.jsx";
import TipoMaterial from "./telas/7-AcessoAdmin/Criacoes/TipoMaterial/TipoMaterial.jsx";
import CriarRC from "./telas/7-AcessoAdmin/CriarRC.jsx";
import HistoricoEst from "./telas/3-EstoqueMan/Abas/Historico/HistoricoEst.jsx";
import ItemEstoqueMan from "./telas/3-EstoqueMan/Abas/Item/ItemEstoqueMan.jsx";
import Usuarios from "./telas/7-AcessoAdmin/Criacoes/Usuarios/Usuarios.jsx";
import ItemConserto from "./telas/5-Conserto/Conserto/ItemConserto.jsx";
import EstoqueCen from "./telas/4-EstoqueCen/EstoqueCen.jsx";
import HistoricoCons from "./telas/5-Conserto/Conserto/HistoricoCons.jsx";
import HistoricoSolic from "./telas/2-ConsultarMateriais/Historico/HistoricoSolic.jsx";
import Movimentacao from "./telas/3-EstoqueMan/Abas/Movimentacao/Movimentacao.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },

  {
    path: "/SolicitarMateriais",
    element: <SolicitarMateriais />,
  },

  {
    path: "/ConsultarSolicitacao/Historico",
    element: <HistoricoSolic></HistoricoSolic>,
  },

  {
    path: "/ConsultarSolicitacao",
    element: <ConsultarMateriais></ConsultarMateriais>,
  },

  {
    path: "/EstoqueManutencao",
    element: <EstoqueMan></EstoqueMan>,
  },

  {
    path: "/EstoqueManutencao/ItemEstoque",
    element: <ItemEstoqueMan />,
  },

  {
    path: "/EstoqueManutencao/Historico",
    element: <HistoricoEst />,
  },
  {
    path: "/EstoqueManutencao/Movimentacao",
    element: <Movimentacao />,
  },
  {
    path: "/EstoqueCentral",
    element: <EstoqueCen />,
  },

  {
    path: "/ConsertoExterno",
    element: <Conserto />,
  },

  {
    path: "/ConsertoExterno/ItemConserto",
    element: <ItemConserto />,
  },

  {
    path: "/ConsertoExterno/Historico",
    element: <HistoricoCons />,
  },
  {
    path: "/ControleRC",
    element: <ControleRC />,
  },
  /*
  {
    path: "/AcessoAdmin",
    element: <AcessoAdmin />,
  },
  {
    path: "/AcessoAdmin/CriarRC",
    element: <CriarRC />,
  },*/
  {
    path: "/AcessoAdmin/Cadastros",
    element: <Cadastros />,
  },
  {
    path: "/AcessoAdmin/Cadastros/Maquinas",
    element: <Maquinas />,
  },
  {
    path: "/AcessoAdmin/Cadastros/Manutentor",
    element: <Manutentor />,
  },
  {
    path: "/AcessoAdmin/Cadastros/Area",
    element: <Area />,
  },

  {
    path: "/AcessoAdmin/Cadastros/Solicitante",
    element: <Solicitantes />,
  },

  {
    path: "/AcessoAdmin/Cadastros/TipoMaterial",
    element: <TipoMaterial />,
  },

  {
    path: "/AcessoAdmin/Cadastros/Usuarios",
    element: <Usuarios />,
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
