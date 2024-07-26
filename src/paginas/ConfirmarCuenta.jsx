/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";

import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { id } = params;

  console.log(params);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data}=await clienteAxios(url);
        
        // Establecer el estado de la alerta solo si la cuenta se ha confirmado correctamente
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        });
        //return;
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
        
        console.log('Entra al error de token')
      }
      setCargando(false);
    }
    confirmarCuenta();
    
  }, []); // Agregar id como dependencia para que se vuelva a ejecutar cuando cambie

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y comienza a Administrar <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to={"/"}> Iniciar Sesion</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta;