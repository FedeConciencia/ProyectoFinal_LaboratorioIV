import { Route} from 'react-router-dom';
import FormCliente from './AdminCliente/FormCliente';
import RegistrarCliente from './AdminCliente/RegistrarCliente';
import ActualizarCliente from './AdminCliente/ActualizarCliente';
import EliminarLogicCliente from './AdminCliente/EliminarLogicCliente';
import FormDomicilio from './AdminDomicilio/FormDomicilio';
import RegistrarDomicilio from './AdminDomicilio/RegistrarDomicilio';
import ActualizarDomicilio from './AdminDomicilio/ActualizarDomicilio';
import EliminarLogicDomicilio from './AdminDomicilio/EliminarLogicDomicilio';
import FormUsuario from './AdminUsuario/FormUsuario';
import RegistrarUsuario from './AdminUsuario/RegistrarUsuario';
import ActualizarUsuario from './AdminUsuario/ActualizarUsuario';
import EliminarLogicUsuario from './AdminUsuario/EliminarLogicUsuario';
import FormPedido from './AdminPedido/FormPedido';
import RegistrarPedido from './AdminPedido/RegistrarPedido';
import ActualizarPedido from './AdminPedido/ActualizarPedido';
import EliminarLogicPedido from './AdminPedido/EliminarLogicPedido';
import FormMercadoPago from './AdminMercadoPago/FormMercadoPago';
import RegistrarMercadoPago from './AdminMercadoPago/RegistrarMercadoPago';
import ActualizarMercadoPago from './AdminMercadoPago/ActualizarMercadoPago';
import EliminarLogicMercadoPago from './AdminMercadoPago/EliminarLogicMercadoPago';
import FormFactura from './AdminFactura/FormFactura';
import RegistrarFactura from './AdminFactura/RegistrarFactura';
import ActualizarFactura from './AdminFactura/ActualizarFactura';
import EliminarLogicFactura from './AdminFactura/EliminarLogicFactura';
import FormDetalleFactura from './AdminDetalleFactura/FormDetalleFactura';
import RegistrarDetalleFactura from './AdminDetalleFactura/RegistrarDetalleFactura';
import ActualizarDetalleFactura from './AdminDetalleFactura/ActualizarDetalleFactura';
import EliminarLogicDetalleFactura from './AdminDetalleFactura/EliminarLogicDetalleFactura';
import FormDetallePedido from './AdminDetallePedido/FormDetallePedido';
import RegistrarDetallePedido from './AdminDetallePedido/RegistrarDetallePedido';
import ActualizarDetallePedido from './AdminDetallePedido/ActualizarDetallePedido';
import EliminarLogicDetallePedido from './AdminDetallePedido/EliminarLogicDetallePedido';
import FormConfiguracion from './AdminConfiguracion/FormConfiguracion';
import RegistrarConfiguracion from './AdminConfiguracion/RegistrarConfiguracion';
import ActualizarConfiguracion from './AdminConfiguracion/ActualizarConfiguracion';
import EliminarLogicConfiguracion from './AdminConfiguracion/EliminarLogicConfiguracion';
import FormRubroGeneral from './AdminRubroGeneral/FormRubroGeneral';
import RegistrarRubroGeneral from './AdminRubroGeneral/RegistrarRubroGeneral';
import ActualizarRubroGeneral from './AdminRubroGeneral/ActualizarRubroGeneral';
import EliminarLogicRubroGeneral from './AdminRubroGeneral/EliminarLogicRubroGeneral';
import FormRubroArticulo from './AdminRubroArticulo/FormRubroArticulo';
import RegistrarRubroArticulo from './AdminRubroArticulo/RegistrarRubroArticulo';
import ActualizarRubroArticulo from './AdminRubroArticulo/ActualizarRubroArticulo';
import EliminarLogicRubroArticulo from './AdminRubroArticulo/EliminarLogicRubroArticulo';
import FormArtManufacturado from './AdminArtManufacturado/FormArtManufacturado';
import RegistrarArtManufacturado from './AdminArtManufacturado/RegistrarArtManufacturado';
import ActualizarArtManufacturado from './AdminArtManufacturado/ActualizarArtManufacturado';
import EliminarLogicArtManufacturado from './AdminArtManufacturado/EliminarLogicArtManufacturado';
import FormArtInsumo from './AdminArtInsumo/FormArtInsumo';
import RegistrarArtInsumo from './AdminArtInsumo/RegistrarArtInsumo';
import ActualizarArtInsumo from './AdminArtInsumo/ActualizarArtInsumo';
import EliminarLogicArtInsumo from './AdminArtInsumo/EliminarLogicArtInsumo';
import FormArtManDetalle from './AdminArtManDetalle/FormArtManDetalle';
import RegistrarArtManDetalle from './AdminArtManDetalle/RegistrarArtManDetalle';
import ActualizarArtManDetalle from './AdminArtManDetalle/ActualizarArtManDetalle';
import EliminarLogicArtManDetalle from './AdminArtManDetalle/EliminarLogicArtManDetalle';
import ReturnTablaIngreso from './AdminCajero/ReturnTablaIngreso';
import ReturnTablaEgreso from './AdminCajero/ReturnTablaEgreso';
import ReturnConfirmarPedido from './AdminCocinero/ReturnConfirmarPedido';

export default function ModuloAdministrador() {

    return(
        <>
            {/* Rutas de Componentes-Vistas AdminCliente CRUD: */}

            <Route path="/adminCliente" component={FormCliente} ></Route>
            <Route path="/registrarCliente" component={RegistrarCliente} ></Route>
            <Route path="/actualizarCliente/:id" component={ActualizarCliente} ></Route>
            <Route path="/eliminarLogicCliente/:id" component={EliminarLogicCliente} ></Route>

            {/* Rutas de Componentes-Vistas AdminDomicilio CRUD: */}

            <Route path="/adminDomicilio" component={FormDomicilio} ></Route>
            <Route path="/registrarDomicilio" component={RegistrarDomicilio} ></Route>
            <Route path="/actualizarDomicilio/:id" component={ActualizarDomicilio} ></Route>
            <Route path="/eliminarLogicDomicilio/:id" component={EliminarLogicDomicilio} ></Route>

            {/* Rutas de Componentes-Vistas AdminUsuario CRUD: */}

            <Route path="/adminUsuario" component={FormUsuario} ></Route>
            <Route path="/registrarUsuario" component={RegistrarUsuario} ></Route>
            <Route path="/actualizarUsuario/:id" component={ActualizarUsuario} ></Route>
            <Route path="/eliminarLogicUsuario/:id" component={EliminarLogicUsuario} ></Route>

            {/* Rutas de Componentes-Vistas AdminPedido CRUD: */}

            <Route path="/adminPedido" component={FormPedido} ></Route>
            <Route path="/registrarPedido" component={RegistrarPedido} ></Route>
            <Route path="/actualizarPedido/:id" component={ActualizarPedido} ></Route>
            <Route path="/eliminarLogicPedido/:id" component={EliminarLogicPedido} ></Route>

            {/* Rutas de Componentes-Vistas AdminMercadoPago CRUD: */}

            <Route path="/adminMercadoPago" component={FormMercadoPago} ></Route>
            <Route path="/registrarMercadoPago" component={RegistrarMercadoPago} ></Route>
            <Route path="/actualizarMercadoPago/:id" component={ActualizarMercadoPago} ></Route>
            <Route path="/eliminarLogicMercadoPago/:id" component={EliminarLogicMercadoPago} ></Route>

            {/* Rutas de Componentes-Vistas AdminFactura CRUD: */}

            <Route path="/adminFactura" component={FormFactura} ></Route>
            <Route path="/registrarFactura" component={RegistrarFactura} ></Route>
            <Route path="/actualizarFactura/:id" component={ActualizarFactura} ></Route>
            <Route path="/eliminarLogicFactura/:id" component={EliminarLogicFactura} ></Route>

            {/* Rutas de Componentes-Vistas AdminDetalleFactura CRUD: */}

            <Route path="/adminDetalleFactura" component={FormDetalleFactura} ></Route>
            <Route path="/registrarDetalleFactura" component={RegistrarDetalleFactura} ></Route>
            <Route path="/actualizarDetalleFactura/:id" component={ActualizarDetalleFactura} ></Route>
            <Route path="/eliminarLogicDetalleFactura/:id" component={EliminarLogicDetalleFactura} ></Route>

            {/* Rutas de Componentes-Vistas AdminDetallePedido CRUD: */}

            <Route path="/adminDetallePedido" component={FormDetallePedido} ></Route>
            <Route path="/registrarDetallePedido" component={RegistrarDetallePedido} ></Route>
            <Route path="/actualizarDetallePedido/:id" component={ActualizarDetallePedido} ></Route>
            <Route path="/eliminarLogicDetallePedido/:id" component={EliminarLogicDetallePedido} ></Route>

            {/* Rutas de Componentes-Vistas AdminConfiguracion CRUD: */}

            <Route path="/adminConfiguracion" component={FormConfiguracion} ></Route>
            <Route path="/registrarConfiguracion" component={RegistrarConfiguracion} ></Route>
            <Route path="/actualizarConfiguracion/:id" component={ActualizarConfiguracion} ></Route>
            <Route path="/eliminarLogicConfiguracion/:id" component={EliminarLogicConfiguracion} ></Route>

            {/* Rutas de Componentes-Vistas AdminRubroGeneral CRUD: */}

            <Route path="/adminRubroGeneral" component={FormRubroGeneral} ></Route>
            <Route path="/registrarRubroGeneral" component={RegistrarRubroGeneral} ></Route>
            <Route path="/actualizarRubroGeneral/:id" component={ActualizarRubroGeneral} ></Route>
            <Route path="/eliminarLogicRubroGeneral/:id" component={EliminarLogicRubroGeneral} ></Route>

            {/* Rutas de Componentes-Vistas AdminRubroArticulo CRUD: */}

            <Route path="/adminRubroArticulo" component={FormRubroArticulo} ></Route>
            <Route path="/registrarRubroArticulo" component={RegistrarRubroArticulo} ></Route>
            <Route path="/actualizarRubroArticulo/:id" component={ActualizarRubroArticulo} ></Route>
            <Route path="/eliminarLogicRubroArticulo/:id" component={EliminarLogicRubroArticulo} ></Route>

            {/* Rutas de Componentes-Vistas AdminArticuloManufacturado CRUD: */}

            <Route path="/adminArtManufacturado" component={FormArtManufacturado} ></Route>
            <Route path="/registrarArtManufacturado" component={RegistrarArtManufacturado} ></Route>
            <Route path="/actualizarArtManufacturado/:id" component={ActualizarArtManufacturado} ></Route>
            <Route path="/eliminarLogicArtManufacturado/:id" component={EliminarLogicArtManufacturado} ></Route>

            {/* Rutas de Componentes-Vistas AdminArticuloInsumo CRUD: */}

            <Route path="/adminArtInsumo" component={FormArtInsumo} ></Route>
            <Route path="/registrarArtInsumo" component={RegistrarArtInsumo} ></Route>
            <Route path="/actualizarArtInsumo/:id" component={ActualizarArtInsumo} ></Route>
            <Route path="/eliminarLogicArtInsumo/:id" component={EliminarLogicArtInsumo} ></Route>

            {/* Rutas de Componentes-Vistas AdminArticuloManufacturadoDetalle CRUD: */}

            <Route path="/adminArtManDetalle" component={FormArtManDetalle} ></Route>
            <Route path="/registrarArtManDetalle" component={RegistrarArtManDetalle} ></Route>
            <Route path="/actualizarArtManDetalle/:id" component={ActualizarArtManDetalle} ></Route>
            <Route path="/eliminarLogicArtManDetalle/:id" component={EliminarLogicArtManDetalle} ></Route>

            {/* Componentes para Retornar a los componentes TablaIngreso, TablaEgreso, : */}
            <Route path="/returnTablaIngreso" component={ReturnTablaIngreso} ></Route>
            <Route path="/returnTablaEgreso" component={ReturnTablaEgreso} ></Route>
            <Route path="/returnConfirmarPedido" component={ReturnConfirmarPedido} ></Route>


        </>
    )
}