import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";

const Registrar =  () => {
  const [nombre, setNombre]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmarPassword, setConfirmarPassword]=useState('');

  const [alerta, setAlerta]= useState({});

  const handleSubmit= async e=>{
    e.preventDefault();

    if([nombre, email, password, confirmarPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error:true})
      return;
    }

    if(password !== confirmarPassword){
      setAlerta({msg: 'Las contraseñas no son iguales', error:true})
      return;
    }

    if(password.length<6){
      setAlerta({msg: 'La contraseña debe contener al menos 6 caractes', error:true})
      return;
    }

    setAlerta({});

    //Crear el usuario en la api
    try {
      const url = `/veterinarios`;
      await clienteAxios.post(url, {nombre, email, password});
      
      setAlerta({
        msg:'Creado Correctamente, revisa tu email',
        error:false
      })
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }

  const {msg}=alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
              Crea Cuenta y Administra tus <span className="text-black">Pacientes</span>
          </h1>
        </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta={alerta}
        />}

        <form onSubmit={handleSubmit}>
        <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold ">
                Name
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e=> setNombre(e.target.value)}
             />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold ">
                Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e=> setEmail(e.target.value)}
             />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold ">
                Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e=> setPassword(e.target.value)}
             />

          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold ">
                Confirmar Password
            </label>
            <input
              type="password"
              placeholder="Confirmar Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={confirmarPassword}
              onChange={e=> setConfirmarPassword(e.target.value)}
             />

          </div>

          <input 
            type="submit"
            value="Registrar"
            className="bg-indgio-700 w-full py-3 px-10 roueded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">

          <Link className="block text-center my-5 text-gray-500"to={"/"} > ¿Tienes una cuenta? Inicia Sesion</Link>
          <Link className="block text-center my-5 text-gray-500"to={"/olvide-password"} > Olvide mi Password</Link>

        </nav>
        </div>
    </>
  )
}

export default Registrar