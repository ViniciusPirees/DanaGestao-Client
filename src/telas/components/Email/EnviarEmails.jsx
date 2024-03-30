import axios from "axios";
import Notificacao from "../Notificacao";

export const enviar = async ({ titulo, texto }) => {
  try {
    const res = await axios.get(
      `http://${import.meta.env.VITE_IP}/EnviaEmail`,
      {
        params: {
          titulo,
          texto,
        },
      }
    );
  } catch (err) {
    console.log(err);
    Notificacao(["erro", "Erro ao Enviar email. " + err]);
  }
};
