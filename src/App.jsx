import { useEffect, useState } from "react";
import DanaFoto from "./assets/DANAPNG.png";
import NavBar from "./telas/components/NavBar";
import Login from "./telas/0-Login/Login";
import { useNavigate } from "react-router-dom";
import getLogin from "./telas/components/getLogin";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val.val);

      if (!val) {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
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
      {logado != false && (
        <div className="flex text-[#fff]">
          <NavBar ativo="0"></NavBar>
          <div className="w-full ">
            <div className="flex items-center h-full justify-center ">
              {logado ? (
                <div>
                  <img
                    src={DanaFoto}
                    className="w-[800px] translate-y-[50%]"
                  ></img>
                </div>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
