import React, {Component} from 'react';
import './assets/css/App.css';
import { Switch, Route } from 'react-router-dom';
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
import FormArtMan from './components/AdminArtMan/FormArtMan';
import ActualizarArtMan from './components/AdminArtMan/ActualizarArtMan';
import ActualizarArtInsumo from './components/AdminArticuloInsumo/ActualizarArtInsumo';
import ActualizarArtManDetalle from './components/AdminArtManDetalle/ActualizarArtManDetalle';
import ActualizarRubroArticulo from './components/AdminRubroArticulo/ActualizarRubroArticulo';
import ActualizarRubroGral from './components/AdminRubroGeneral/ActualizarRubroGeneral';
import FormArtInsumo from './components/AdminArticuloInsumo/FormArtInsumo';
import FormArtManDetalle from './components/AdminArtManDetalle/FormArtManDetalle';
import FormRubroArticulo from './components/AdminRubroArticulo/FormRubroArticulo';
import FormRubroGral from './components/AdminRubroGeneral/FormRubroGral';
import EliminarLogicArticuloInsumo from './components/AdminArticuloInsumo/EliminarLogicArticuloInsumo';
import EliminarLogicArtManufacturado from './components/AdminArtMan/EliminarLogicArtManufacturado';
import EliminarLogicRubroArticulo from './components/AdminRubroArticulo/EliminarLogicRubroArticulo';
import EliminarLogicArtManDetalle from './components/AdminArtManDetalle/EliminarLogicArtManDetalle';
import EliminarLogicRubroGral from './components/AdminRubroGeneral/EliminarLogicRubroGral';
import EliminarArticuloInsumo from './components/AdminArticuloInsumo/EliminarArticuloInsumo';
import EliminarArtManufacturado from './components/AdminArtMan/EliminarArtManufacturado';
import EliminarArtManDetalle from './components/AdminArtManDetalle/EliminarArtManDetalle';
import EliminarRubroArticulo from './components/AdminRubroArticulo/EliminarRubroArticulo';
import EliminarRubroGral from './components/AdminRubroGeneral/EliminarRubroGral';
import RegistrarArticuloInsumo from './components/AdminArticuloInsumo/RegistrarArticuloInsumo';
import RegistrarArtManufacturado from './components/AdminArtMan/RegistrarArtManufacturado';
import RegistrarArtManDetalle from './components/AdminArtManDetalle/RegistrarArtManDetalle';
import RegistrarRubroArticulo from './components/AdminRubroArticulo/RegistrarRubroArticulo';
import RegistrarRubroGral from './components/AdminRubroGeneral/RegistrarRubroGral';



class App extends Component{
    
  
  render(){
    
    return(

      //Declaramos las Rutas con las diferentes paginas que tenemos:

      <Switch>

        {/* Rutas de Componentes-Vistas Home-Contacto-AdminPrincipal: */}

        <Route exact path="/" component={Home} ></Route>
        <Route exact path="/home" component={Home} ></Route>
        <Route path="/contacto" component={Contacto} ></Route>
        <Route path="/adminPrincipal" component={AdminPrincipal} ></Route>

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

        {/* Rutas de Componentes-Vistas AdminArtManufacturado CRUD: */}

        <Route path="/adminArtManufacturado" component={FormArtMan} ></Route>
        <Route path="/registrarArtManufacturado" component={RegistrarArtManufacturado} ></Route>
        <Route path="/actualizarArtMan/:id" component={ActualizarArtMan} ></Route>
        <Route path="/eliminarArtMan/:id" component={EliminarArtManufacturado} ></Route>
        <Route path="/eliminarLogicArtMan/:id" component={EliminarLogicArtManufacturado} ></Route>

        {/* Rutas de Componentes-Vistas AdminArtManufacturadoDetalle CRUD: */}

        <Route path="/adminArtManufacturadoDetalle" component={FormArtManDetalle} ></Route>
        <Route path="/registrarArtManDetalle" component={RegistrarArtManDetalle} ></Route>
        <Route path="/actualizarArtManDetalle/:id" component={ActualizarArtManDetalle} ></Route>
        <Route path="/eliminarArtManDetalle/:id" component={EliminarArtManDetalle} ></Route>
        <Route path="/eliminarLogicArtManDetalle/:id" component={EliminarLogicArtManDetalle} ></Route>

        {/* Rutas de Componentes-Vistas AdminArtInsumo CRUD: */}

        <Route path="/adminArticuloInsumo" component={FormArtInsumo} ></Route>
        <Route path="/registrarArtInsumo" component={RegistrarArticuloInsumo} ></Route>
        <Route path="/actualizarArtInsumo/:id" component={ActualizarArtInsumo} ></Route>
        <Route path="/eliminarArtInsumo/:id" component={EliminarArticuloInsumo} ></Route>
        <Route path="/eliminarLogicArtInsumo/:id" component={EliminarLogicArticuloInsumo} ></Route>

        {/* Rutas de Componentes-Vistas AdminRubroArticulo CRUD: */}

        <Route path="/adminRubroArticulo" component={FormRubroArticulo} ></Route>
        <Route path="/registrarRubroArticulo" component={RegistrarRubroArticulo} ></Route>
        <Route path="/actualizarRubroArticulo/:id" component={ActualizarRubroArticulo} ></Route>
        <Route path="/eliminarRubroArticulo/:id" component={EliminarRubroArticulo} ></Route>
        <Route path="/eliminarLogicRubroArticulo/:id" component={EliminarLogicRubroArticulo} ></Route>

        {/* Rutas de Componentes-Vistas AdminRubroGeneral CRUD: */}

        <Route path="/adminRubroGeneral" component={FormRubroGral} ></Route>
        <Route path="/registrarRubroGeneral" component={RegistrarRubroGral} ></Route>
        <Route path="/actualizarRubroGeneral/:id" component={ActualizarRubroGral} ></Route>
        <Route path="/eliminarRubroGeneral/:id" component={EliminarRubroGral} ></Route>
        <Route path="/eliminarLogicRubroGeneral/:id" component={EliminarLogicRubroGral} ></Route>

      </Switch>
    ) 
  }
}

export default App;
