import { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientesAxios from "../config/axios";


const NuevaPassword = () => {
    const [password, setPassword]=useState('')
    const [alerta, setAlerta]=useState({})
    const [tokenValido, setTokenValido]=useState(false)
    const [confirmarPassword, setConfirmarPassword]=useState('');
    const [passwordModificado, setPasswordModificado]=useState(false)
  
    const params = useParams()
    const {token}= params
  
    useEffect(()=>{
      const comprobarToken= async ()=>{
        try {
          await clientesAxios(`/veterinarios/recuperar-password/${token}`)
          setAlerta({
            msg: 'Coloca tu nuevo Password'
          })
          setTokenValido(true)
        } catch (error) {
          setAlerta({
            msg: 'Hubo un error con el enlace',
            error:true
          })
        }
      }
  
      comprobarToken()
    })

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(password !== confirmarPassword){
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error:true})
            return;
          }
      
          if(password.length<6){
            setAlerta({
                msg: 'La contraseña debe contener al menos 6 caractes', 
                error:true})
            return;
          }

        try {
            const url= `/veterinario/recuperar-password/${token}`
            const {data} = await clientesAxios.post(url, {password})
            console.log(data)

            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }
  
    const {msg}=alerta
    return (
     <>
       <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Restablece tu password y no pierdas acceso a {" "}
                 <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
  
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {
            msg && <Alerta
              alerta={alerta}
            />
          }
  
          {tokenValido && (
            <> 
            <form
            onSubmit={handleSubmit}
            >
              <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold ">
                      Nuevo Password
                  </label>
                  <input
                    type="password"
                    placeholder="Nuevo Password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                  />
              </div>
  
              <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold ">
                      Confirma Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirma Password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={confirmarPassword}
                    onChange={e=> setConfirmarPassword(e.target.value)}
                  />
              </div>
  
              <input 
                  type="submit"
                  value="Cambiar Password"
                  className="bg-indgio-700 w-full py-3 px-10 rounded-xl text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
  
            </form>


         
          </>
            
        
            
          )}   
          {
            passwordModificado && 
            <Link className="block text-center my-5 text-gray-500" 
                  to={"/"}> Iniciar Sesion</Link>
          }

        </div>      
     </>
    )
}

export default NuevaPassword
