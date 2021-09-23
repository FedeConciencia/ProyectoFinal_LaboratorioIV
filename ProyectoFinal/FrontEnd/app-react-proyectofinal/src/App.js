import React, {useState} from 'react';
import './assets/css/App.css';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Contacto from './components/Contacto';
import AdminPrincipal from './components/AdminPrincipal';
import Loguin from './components/Loguin/Loguin';
import RegistroCliente from './components/RegistroCliente/RegistroCliente';
import Productos from './components/Productos/Productos';
import DetallePlato from './components/DetallePlato/DetallePlato';
import { ContextoUsuario } from './components/ContextoUsuario';
import Navigation from './components/Navigation';
import Carrito from './components/Carrito/Carrito';
import MetodoPago from './components/MetodoPago/MetodoPago';
import PrincipalCocinero from './components/AdminCocinero/Principal';
import ConfirmarPedido from './components/AdminCocinero/ConfirmarPedido';
import PrincipalCajero from './components/AdminCajero/Principal';
import TablaIngreso from './components/AdminCajero/TablaIngreso';
import TablaEgreso from './components/AdminCajero/TablaEgreso';
import VerificarDomicilio from './components/MetodoPago/VerificarDomicilio';
import RegistroClienteGoogle from './components/RegistroCliente/RegistroClienteGoogle';
import ModuloAdministrador from './components/ModuloAdministrador';


export default function App(){
  
  // Hook que contiene el estado actual de sesion
  const [usuario, setUsuario] = useState(
      localStorage.getItem('usuario') === "null" ? null : JSON.parse(localStorage.getItem('usuario'))
    );
  
  return(

    //Declaramos las Rutas con las diferentes paginas que tenemos:

    <Switch>

      <ContextoUsuario.Provider value={{usuario, setUsuario}}>

        
        <Navigation />
        {/* Rutas de Componentes-Vistas Home-Contacto-AdminPrincipal-Loguin-RegistroCliente: */}

        <Route exact path="/" component={Home} ></Route>
        <Route path="/contacto" component={Contacto} ></Route>
        <Route path="/adminPrincipal" component={AdminPrincipal} ></Route>
        <Route path="/loguin" component={Loguin} ></Route>
        <Route path="/registroCliente" component={RegistroCliente} ></Route>
        <Route path="/registroClienteGoogle" component={RegistroClienteGoogle} />
        <Route path="/productos" component={Productos} ></Route>
        <Route path="/detallePlato/:id" component={DetallePlato} ></Route>
        <Route path="/carrito" component={Carrito} />
        <Route path="/metodoPago" component={MetodoPago} />
        <Route path="/verificarDomicilio" component={VerificarDomicilio} />


        {/* Rutas de AdminCocinero: */}

        <Route path="/cocineroPrincipal" component={PrincipalCocinero} ></Route>
        <Route path="/confirmarPedido" component={ConfirmarPedido} ></Route>

        {/* Rutas de AdminCajero: */}

        <Route path="/cajeroPrincipal" component={PrincipalCajero} ></Route>
        <Route path="/tablaIngreso" component={TablaIngreso} ></Route>
        <Route path="/tablaEgreso" component={TablaEgreso} ></Route>
        
        <ModuloAdministrador />

      </ContextoUsuario.Provider>

    </Switch>
  ) 
}


