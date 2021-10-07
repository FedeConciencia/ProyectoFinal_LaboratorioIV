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
import HistorialCliente from './components/HistorialCliente/HistorialCliente';
import success from './components/MercadoPago/Success';
import failure from './components/MercadoPago/Failure';
import pending from './components/MercadoPago/Pending';
import AdminDueño from './components/AdminDueño/AdminDueño';
import RankingComidas from './components/AdminDueño/RankingComidas';
import MostrarRankingComidas from './components/AdminDueño/MostrarRankingComidas';
import IngresosRecaudacion from './components/AdminDueño/IngresosRecaudacion';
import MostrarIngresosRecaudacion from './components/AdminDueño/MostrarIngresoRecaudacion';
import PedidosCliente from './components/AdminDueño/PedidosCliente';
import MostrarPedidosCliente from './components/AdminDueño/MostrarPedidosCliente';
import Ganancias from './components/AdminDueño/Ganancias';
import MostrarGanancias from './components/AdminDueño/MostrarGanancias';
import AuxMercadoPago from './components/MetodoPago/AuxMercadoPago';



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
        <Route exact path="/home" component={Home} ></Route>
        <Route path="/contacto" component={Contacto} ></Route>
        <Route path="/adminPrincipal" component={AdminPrincipal} ></Route>
        <Route path="/loguin" component={Loguin} ></Route>
        <Route path="/registroCliente" component={RegistroCliente} ></Route>
        <Route path="/registroClienteGoogle" component={RegistroClienteGoogle} />
        <Route path="/productos" component={Productos} ></Route>
        <Route path="/detallePlato/:id" component={DetallePlato} ></Route>
        <Route path="/carrito" component={Carrito} />
        <Route path="/metodoPago" component={MetodoPago} />
        <Route path="/auxMercadoPago" component={AuxMercadoPago} />
        <Route path="/verificarDomicilio" component={VerificarDomicilio} />
        <Route path="/historialCliente" component={HistorialCliente} />


        {/* Rutas de AdminCocinero: */}

        <Route path="/cocineroPrincipal" component={PrincipalCocinero} ></Route>
        <Route path="/confirmarPedido" component={ConfirmarPedido} ></Route>

        {/* Rutas de AdminCajero: */}

        <Route path="/cajeroPrincipal" component={PrincipalCajero} ></Route>
        <Route path="/tablaIngreso" component={TablaIngreso} ></Route>
        <Route path="/tablaEgreso" component={TablaEgreso} ></Route>

        {/* Rutas de MercadoPago: */}

        <Route path="/mercadopago/success" component={success} ></Route>
        <Route path="/mercadopago/failure" component={failure} ></Route>
        <Route path="/mercadopago/pending" component={pending} ></Route>

         {/* Rutas de AdminDueño: */}

         <Route path="/adminDueño" component={AdminDueño} ></Route>
         <Route path="/rankingComidas" component={RankingComidas} ></Route>
         <Route path="/mostrarRankingComidas" component={MostrarRankingComidas} ></Route>
         <Route path="/ingresosRecaudacion" component={IngresosRecaudacion} ></Route>
         <Route path="/mostrarIngresosRecaudacion" component={MostrarIngresosRecaudacion} ></Route>
         <Route path="/pedidosCliente" component={PedidosCliente} ></Route>
         <Route path="/mostrarPedidosCliente" component={MostrarPedidosCliente} ></Route>
         <Route path="/ganancias" component={Ganancias} ></Route>
         <Route path="/mostrarGanancias" component={MostrarGanancias} ></Route>
        
        <ModuloAdministrador />

      </ContextoUsuario.Provider>

    </Switch>
  ) 
}


