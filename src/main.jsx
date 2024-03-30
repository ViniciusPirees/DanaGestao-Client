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
import Cadastros from "./telas/7-AcessoAdmin/Criacoes/Cadastros.jsx";
import Area from "./telas/7-AcessoAdmin/Criacoes/Area/Area.jsx";
import Maquinas from "./telas/7-AcessoAdmin/Criacoes/Maquinas/Maquinas.jsx";
import Manutentor from "./telas/7-AcessoAdmin/Criacoes/Manutentor/Manutentor.jsx";
import TipoMaterial from "./telas/7-AcessoAdmin/Criacoes/TipoMaterial/TipoMaterial.jsx";
import ItemEstoqueMan from "./telas/3-EstoqueMan/Abas/Item/ItemEstoqueMan.jsx";
import Usuarios from "./telas/7-AcessoAdmin/Criacoes/Usuarios/Usuarios.jsx";
import ItemConserto from "./telas/5-Conserto/Conserto/ItemConserto.jsx";
import EstoqueCen from "./telas/4-EstoqueCen/EstoqueCen.jsx";
import HistoricoCons from "./telas/5-Conserto/Conserto/HistoricoCons.jsx";
import HistoricoSolic from "./telas/2-ConsultarMateriais/Historico/HistoricoSolic.jsx";
import Movimentacao from "./telas/3-EstoqueMan/Abas/Movimentacao/Movimentacao.jsx";
import ControleStatus from "./telas/6-ControleRC/ControleStatus/ControleStatus.jsx";
import Graficos from "./telas/7-AcessoAdmin/Graficos/Graficos.jsx";
import AcessoAdmin from "./telas/7-AcessoAdmin/AcessoAdmin.jsx";
import Budget from "./telas/7-AcessoAdmin/Budget/Budget.jsx";
import Grafico from "./telas/6-ControleRC/ControleStatus/Grafico/Grafico.jsx";
import Kanban from "./telas/3-EstoqueMan/Abas/Kanban/Kanban.jsx";
import TelaTV from "./telas/7-AcessoAdmin/TelaTV/TelaTV.jsx";
import TipoStatus from "./telas/7-AcessoAdmin/Criacoes/TipoStatus/TipoStatus.jsx";
import StatusPrev from "./telas/7-AcessoAdmin/Criacoes/StatusPrev/StatusPrev.jsx";
import OutrasContas from "./telas/6-ControleRC/OutrasContas/OutrasContas.jsx";
import OutrasTela from "./telas/7-AcessoAdmin/CustosOutras/OutrasTela.jsx";
import StatusContas from "./telas/6-ControleRC/OutrasContas/StatusContas/StatusContas.jsx";
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
    path: "/EstoqueManutencao/Movimentacao",
    element: <Movimentacao />,
  },

  {
    path: "/EstoqueManutencao/Kanban",
    element: <Kanban />,
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

  {
    path: "/ControleRC/ControleStatus",
    element: <ControleStatus />,
  },

  {
    path: "/ControleRC/OutrasContas",
    element: <OutrasContas />,
  },
  {
    path: "/ControleRC/OutrasContas/ControleStatus",
    element: <StatusContas />,
  },
  {
    path: "/AcessoAdmin/ResumoStatus",
    element: <Grafico />,
  },

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
    path: "/AcessoAdmin/Cadastros/TipoMaterial",
    element: <TipoMaterial />,
  },

  {
    path: "/AcessoAdmin/Cadastros/TipoStatus",
    element: <TipoStatus />,
  },

  {
    path: "/AcessoAdmin/Cadastros/StatusPrev",
    element: <StatusPrev />,
  },

  {
    path: "/AcessoAdmin/Cadastros/Usuarios",
    element: <Usuarios />,
  },

  {
    path: "/AcessoAdmin/Graficos",
    element: <Graficos />,
  },

  {
    path: "/AcessoAdmin/CustosContas",
    element: <OutrasTela />,
  },

  {
    path: "/AcessoAdmin/ValoresControladoria",
    element: <Budget />,
  },

  {
    path: "/AcessoAdmin/GraficosTV",
    element: <TelaTV />,
  },

  {
    path: "/AcessoAdmin",
    element: <AcessoAdmin />,
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
