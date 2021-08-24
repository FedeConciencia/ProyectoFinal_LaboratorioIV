import React, {useState} from 'react';
import './assets/css/App.css';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Contacto from './components/Contacto';
import AdminPrincipal from './components/AdminPrincipal';
import FormCliente from './components/AdminCliente/FormCliente';
import RegistrarCliente from './components/AdminCliente/RegistrarCliente';
import ActualizarCliente from './components/AdminCliente/ActualizarCliente';
import EliminarCliente from './components/AdminCliente/EliminarCliente';
import EliminarLogicCliente from './components/AdminCliente/EliminarLogicCliente';
import FormDomicilio from './components/AdminDomicilio/FormDomicilio';
import RegistrarDomicilio from './components/AdminDomicilio/RegistrarDomicilio';
import ActualizarDomicilio from './components/AdminDomicilio/ActualizarDomicilio';
import EliminarDomicilio from './components/AdminDomicilio/EliminarDomicilio';
import EliminarLogicDomicilio from './components/AdminDomicilio/EliminarLogicDomicilio';
import FormUsuario from './components/AdminUsuario/FormUsuario';
import RegistrarUsuario from './components/AdminUsuario/RegistrarUsuario';
import ActualizarUsuario from './components/AdminUsuario/ActualizarUsuario';
import EliminarUsuario from './components/AdminUsuario/EliminarUsuario';
import EliminarLogicUsuario from './components/AdminUsuario/EliminarLogicUsuario';
import FormPedido from './components/AdminPedido/FormPedido';
import RegistrarPedido from './components/AdminPedido/RegistrarPedido';
import ActualizarPedido from './components/AdminPedido/ActualizarPedido';
import EliminarPedido from './components/AdminPedido/EliminarPedido';
import EliminarLogicPedido from './components/AdminPedido/EliminarLogicPedido';
import FormMercadoPago from './components/AdminMercadoPago/FormMercadoPago';
import RegistrarMercadoPago from './components/AdminMercadoPago/RegistrarMercadoPago';
import ActualizarMercadoPago from './components/AdminMercadoPago/ActualizarMercadoPago';
import EliminarMercadoPago from './components/AdminMercadoPago/EliminarMercadoPago';
import EliminarLogicMercadoPago from './components/AdminMercadoPago/EliminarLogicMercadoPago';
import FormFactura from './components/AdminFactura/FormFactura';
import RegistrarFactura from './components/AdminFactura/RegistrarFactura';
import ActualizarFactura from './components/AdminFactura/ActualizarFactura';
import EliminarFactura from './components/AdminFactura/EliminarFactura';
import EliminarLogicFactura from './components/AdminFactura/EliminarLogicFactura';
import FormDetalleFactura from './components/AdminDetalleFactura/FormDetalleFactura';
import RegistrarDetalleFactura from './components/AdminDetalleFactura/RegistrarDetalleFactura';
import ActualizarDetalleFactura from './components/AdminDetalleFactura/ActualizarDetalleFactura';
import EliminarDetalleFactura from './components/AdminDetalleFactura/EliminarDetalleFactura';
import EliminarLogicDetalleFactura from './components/AdminDetalleFactura/EliminarLogicDetalleFactura';
import FormDetallePedido from './components/AdminDetallePedido/FormDetallePedido';
import RegistrarDetallePedido from './components/AdminDetallePedido/RegistrarDetallePedido';
import ActualizarDetallePedido from './components/AdminDetallePedido/ActualizarDetallePedido';
import EliminarDetallePedido from './components/AdminDetallePedido/EliminarDetallePedido';
import EliminarLogicDetallePedido from './components/AdminDetallePedido/EliminarLogicDetallePedido';
import FormConfiguracion from './components/AdminConfiguracion/FormConfiguracion';
import RegistrarConfiguracion from './components/AdminConfiguracion/RegistrarConfiguracion';
import ActualizarConfiguracion from './components/AdminConfiguracion/ActualizarConfiguracion';
import EliminarConfiguracion from './components/AdminConfiguracion/EliminarConfiguracion';
import EliminarLogicConfiguracion from './components/AdminConfiguracion/EliminarLogicConfiguracion';
import FormRubroGeneral from './components/AdminRubroGeneral/FormRubroGeneral';
import RegistrarRubroGeneral from './components/AdminRubroGeneral/RegistrarRubroGeneral';
import ActualizarRubroGeneral from './components/AdminRubroGeneral/ActualizarRubroGeneral';
import EliminarRubroGeneral from './components/AdminRubroGeneral/EliminarRubroGeneral';
import EliminarLogicRubroGeneral from './components/AdminRubroGeneral/EliminarLogicRubroGeneral';
import FormRubroArticulo from './components/AdminRubroArticulo/FormRubroArticulo';
import RegistrarRubroArticulo from './components/AdminRubroArticulo/RegistrarRubroArticulo';
import ActualizarRubroArticulo from './components/AdminRubroArticulo/ActualizarRubroArticulo';
import EliminarRubroArticulo from './components/AdminRubroArticulo/EliminarRubroArticulo';
import EliminarLogicRubroArticulo from './components/AdminRubroArticulo/EliminarLogicRubroArticulo';
import FormArtManufacturado from './components/AdminArtManufacturado/FormArtManufacturado';
import RegistrarArtManufacturado from './components/AdminArtManufacturado/RegistrarArtManufacturado';
import ActualizarArtManufacturado from './components/AdminArtManufacturado/ActualizarArtManufacturado';
import EliminarArtManufacturado from './components/AdminArtManufacturado/EliminarArtManufacturado';
import EliminarLogicArtManufacturado from './components/AdminArtManufacturado/EliminarLogicArtManufacturado';
import FormArtInsumo from './components/AdminArtInsumo/FormArtInsumo';
import RegistrarArtInsumo from './components/AdminArtInsumo/RegistrarArtInsumo';
import ActualizarArtInsumo from './components/AdminArtInsumo/ActualizarArtInsumo';
import EliminarArtInsumo from './components/AdminArtInsumo/EliminarArtInsumo';
import EliminarLogicArtInsumo from './components/AdminArtInsumo/EliminarLogicArtInsumo';
import FormArtManDetalle from './components/AdminArtManDetalle/FormArtManDetalle';
import RegistrarArtManDetalle from './components/AdminArtManDetalle/RegistrarArtManDetalle';
import ActualizarArtManDetalle from './components/AdminArtManDetalle/ActualizarArtManDetalle';
import EliminarArtManDetalle from './components/AdminArtManDetalle/EliminarArtManDetalle';
import EliminarLogicArtManDetalle from './components/AdminArtManDetalle/EliminarLogicArtManDetalle';
import Loguin from './components/Loguin/Loguin';
import RegistroCliente from './components/RegistroCliente/RegistroCliente';
import Productos from './components/Productos/Productos';
import DetallePlato from './components/DetallePlato/DetallePlato';
import { ContextoUsuario } from './components/ContextoUsuario';
import Navigation from './components/Navigation';


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
        <Route path="/productos" component={Productos} ></Route>
        <Route path="/detallePlato/:id" component={DetallePlato} ></Route>
        

        {/* Rutas de Componentes-Vistas AdminCliente CRUD: */}

        <Route path="/adminCliente" component={FormCliente} ></Route>
        <Route path="/registrarCliente" component={RegistrarCliente} ></Route>
        <Route path="/actualizarCliente/:id" component={ActualizarCliente} ></Route>
        <Route path="/eliminarCliente/:id" component={EliminarCliente} ></Route>
        <Route path="/eliminarLogicCliente/:id" component={EliminarLogicCliente} ></Route>

        {/* Rutas de Componentes-Vistas AdminDomicilio CRUD: */}

        <Route path="/adminDomicilio" component={FormDomicilio} ></Route>
        <Route path="/registrarDomicilio" component={RegistrarDomicilio} ></Route>
        <Route path="/actualizarDomicilio/:id" component={ActualizarDomicilio} ></Route>
        <Route path="/eliminarDomicilio/:id" component={EliminarDomicilio} ></Route>
        <Route path="/eliminarLogicDomicilio/:id" component={EliminarLogicDomicilio} ></Route>

        {/* Rutas de Componentes-Vistas AdminUsuario CRUD: */}

        <Route path="/adminUsuario" component={FormUsuario} ></Route>
        <Route path="/registrarUsuario" component={RegistrarUsuario} ></Route>
        <Route path="/actualizarUsuario/:id" component={ActualizarUsuario} ></Route>
        <Route path="/eliminarUsuario/:id" component={EliminarUsuario} ></Route>
        <Route path="/eliminarLogicUsuario/:id" component={EliminarLogicUsuario} ></Route>

        {/* Rutas de Componentes-Vistas AdminPedido CRUD: */}

        <Route path="/adminPedido" component={FormPedido} ></Route>
        <Route path="/registrarPedido" component={RegistrarPedido} ></Route>
        <Route path="/actualizarPedido/:id" component={ActualizarPedido} ></Route>
        <Route path="/eliminarPedido/:id" component={EliminarPedido} ></Route>
        <Route path="/eliminarLogicPedido/:id" component={EliminarLogicPedido} ></Route>

        {/* Rutas de Componentes-Vistas AdminMercadoPago CRUD: */}

        <Route path="/adminMercadoPago" component={FormMercadoPago} ></Route>
        <Route path="/registrarMercadoPago" component={RegistrarMercadoPago} ></Route>
        <Route path="/actualizarMercadoPago/:id" component={ActualizarMercadoPago} ></Route>
        <Route path="/eliminarMercadoPago/:id" component={EliminarMercadoPago} ></Route>
        <Route path="/eliminarLogicMercadoPago/:id" component={EliminarLogicMercadoPago} ></Route>

        {/* Rutas de Componentes-Vistas AdminFactura CRUD: */}

        <Route path="/adminFactura" component={FormFactura} ></Route>
        <Route path="/registrarFactura" component={RegistrarFactura} ></Route>
        <Route path="/actualizarFactura/:id" component={ActualizarFactura} ></Route>
        <Route path="/eliminarFactura/:id" component={EliminarFactura} ></Route>
        <Route path="/eliminarLogicFactura/:id" component={EliminarLogicFactura} ></Route>

        {/* Rutas de Componentes-Vistas AdminDetalleFactura CRUD: */}

        <Route path="/adminDetalleFactura" component={FormDetalleFactura} ></Route>
        <Route path="/registrarDetalleFactura" component={RegistrarDetalleFactura} ></Route>
        <Route path="/actualizarDetalleFactura/:id" component={ActualizarDetalleFactura} ></Route>
        <Route path="/eliminarDetalleFactura/:id" component={EliminarDetalleFactura} ></Route>
        <Route path="/eliminarLogicDetalleFactura/:id" component={EliminarLogicDetalleFactura} ></Route>

        {/* Rutas de Componentes-Vistas AdminDetallePedido CRUD: */}

        <Route path="/adminDetallePedido" component={FormDetallePedido} ></Route>
        <Route path="/registrarDetallePedido" component={RegistrarDetallePedido} ></Route>
        <Route path="/actualizarDetallePedido/:id" component={ActualizarDetallePedido} ></Route>
        <Route path="/eliminarDetallePedido/:id" component={EliminarDetallePedido} ></Route>
        <Route path="/eliminarLogicDetallePedido/:id" component={EliminarLogicDetallePedido} ></Route>

        {/* Rutas de Componentes-Vistas AdminConfiguracion CRUD: */}

        <Route path="/adminConfiguracion" component={FormConfiguracion} ></Route>
        <Route path="/registrarConfiguracion" component={RegistrarConfiguracion} ></Route>
        <Route path="/actualizarConfiguracion/:id" component={ActualizarConfiguracion} ></Route>
        <Route path="/eliminarConfiguracion/:id" component={EliminarConfiguracion} ></Route>
        <Route path="/eliminarLogicConfiguracion/:id" component={EliminarLogicConfiguracion} ></Route>

        {/* Rutas de Componentes-Vistas AdminRubroGeneral CRUD: */}

        <Route path="/adminRubroGeneral" component={FormRubroGeneral} ></Route>
        <Route path="/registrarRubroGeneral" component={RegistrarRubroGeneral} ></Route>
        <Route path="/actualizarRubroGeneral/:id" component={ActualizarRubroGeneral} ></Route>
        <Route path="/eliminarRubroGeneral/:id" component={EliminarRubroGeneral} ></Route>
        <Route path="/eliminarLogicRubroGeneral/:id" component={EliminarLogicRubroGeneral} ></Route>

        {/* Rutas de Componentes-Vistas AdminRubroArticulo CRUD: */}

        <Route path="/adminRubroArticulo" component={FormRubroArticulo} ></Route>
        <Route path="/registrarRubroArticulo" component={RegistrarRubroArticulo} ></Route>
        <Route path="/actualizarRubroArticulo/:id" component={ActualizarRubroArticulo} ></Route>
        <Route path="/eliminarRubroArticulo/:id" component={EliminarRubroArticulo} ></Route>
        <Route path="/eliminarLogicRubroArticulo/:id" component={EliminarLogicRubroArticulo} ></Route>

        {/* Rutas de Componentes-Vistas AdminArticuloManufacturado CRUD: */}

        <Route path="/adminArtManufacturado" component={FormArtManufacturado} ></Route>
        <Route path="/registrarArtManufacturado" component={RegistrarArtManufacturado} ></Route>
        <Route path="/actualizarArtManufacturado/:id" component={ActualizarArtManufacturado} ></Route>
        <Route path="/eliminarArtManufacturado/:id" component={EliminarArtManufacturado} ></Route>
        <Route path="/eliminarLogicArtManufacturado/:id" component={EliminarLogicArtManufacturado} ></Route>

        {/* Rutas de Componentes-Vistas AdminArticuloInsumo CRUD: */}

        <Route path="/adminArtInsumo" component={FormArtInsumo} ></Route>
        <Route path="/registrarArtInsumo" component={RegistrarArtInsumo} ></Route>
        <Route path="/actualizarArtInsumo/:id" component={ActualizarArtInsumo} ></Route>
        <Route path="/eliminarArtInsumo/:id" component={EliminarArtInsumo} ></Route>
        <Route path="/eliminarLogicArtInsumo/:id" component={EliminarLogicArtInsumo} ></Route>

        {/* Rutas de Componentes-Vistas AdminArticuloManufacturadoDetalle CRUD: */}

        <Route path="/adminArtManDetalle" component={FormArtManDetalle} ></Route>
        <Route path="/registrarArtManDetalle" component={RegistrarArtManDetalle} ></Route>
        <Route path="/actualizarArtManDetalle/:id" component={ActualizarArtManDetalle} ></Route>
        <Route path="/eliminarArtManDetalle/:id" component={EliminarArtManDetalle} ></Route>
        <Route path="/eliminarLogicArtManDetalle/:id" component={EliminarLogicArtManDetalle} ></Route>

      </ContextoUsuario.Provider>

    </Switch>
  ) 
}


