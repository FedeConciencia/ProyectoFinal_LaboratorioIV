
package Principal;

import Controlador.*;
import Modelo.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.List;


public class Principal {
    
    //Gestionar las pruebas de los metodos:
    
    public static void main(String[] args) {
        
     
        //TESTEO CLIENTE:
        
        /*
        
        //Metodo Insertar Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        Cliente cliente = new Cliente("Laura", "Raumundi", "633535353", LocalDate.of(2020,10,11), "2612622522", "laura@yahoo.com", LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarCliente(cliente);
        
        */
        
        /*
        
        //Metodo Actualizar Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        Cliente cliente = new Cliente(1L,"Diana", "Salmuera", "4432321233", LocalDate.of(2019,3,11), "2616722626", "laura@gmail.com", LocalDate.of(2020,2,13), LocalDate.of(2021,5,14), "inactivo");
        
        controlador.actualizarCliente(cliente);
        
        */
        
        /*
        
        //Metodo BuscaOne Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        Cliente cliente = controlador.buscarOneCliente(1L);
        
        System.out.println(cliente.toString());

        */
        
        /*
        
        //Metodo BuscaAll Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        List<Cliente> listaCliente = controlador.buscarAllCliente();
        
        for(Cliente item: listaCliente){
            
            System.out.println(item.toString());
            
        }

        */
        
        /*
        
        //Metodo eliminar Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        controlador.eliminarCliente(1L);

        */
        
        /*
        
        //Metodo Eliminado Logico Cliente (Funciona Ok):
        
        ControladorCliente controlador = new ControladorCliente();
        
        controlador.eliminarLogicoCliente(2L, LocalDate.of(2021,5,26));
        
        */
        
        //************************************************************
        
    
        //TESTEO USUARIO:
        
        /*
        
        //Metodo Insertar Usuario (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        Usuario usuario = new Usuario("fedeMza", "fede123", "Cliente", 2L , LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarUsuario(usuario);
        
        */
        
        /*
        
        //Metodo Actualizar Usuario (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        Usuario usuario = new Usuario(2L, "lauraMza", "laura123", "Cliente", 2L , LocalDate.of(2021,5,14), LocalDate.of(2021,5,23), "inactivo");
        
        controlador.actualizarUsuario(usuario);
        
        */
        
        /*
        
        //Metodo BuscaOne Usuario (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        Usuario usuario = controlador.buscarOneUsuario(2L);
        
        System.out.println(usuario.toString());

        */
        
        /*
        
        //Metodo BuscaAll Cliente (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        List<Usuario> listaUsuario = controlador.buscarAllUsuario();
        
        for(Usuario item: listaUsuario){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar Usuario (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        controlador.eliminarUsuario(2L);

        */
        
        /*
        
        //Metodo Eliminado Logico Usuario (Funciona Ok):
        
        ControladorUsuario controlador = new ControladorUsuario();
        
        controlador.eliminarLogicoUsuario(2L, LocalDate.of(2021,5,26));
        
        
        */
        
        //************************************************************
        
    
        //TESTEO DOMICILIO:
        
        /*
        
        //Metodo Insertar Domicilio (Funciona Ok):
        
        ControladorDomicilio controlador = new ControladorDomicilio();
        
        Domicilio domicilio = new Domicilio("25 de Mayo", "651", "Capital", 2L , LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarDomicilio(domicilio);
        
        */
        
        /*
        
        //Metodo Actualizar Domicilio (Funciona Ok):
        
       ControladorDomicilio controlador = new ControladorDomicilio();
        
        Domicilio domicilio = new Domicilio(1L, "27 de Mayo", "621", "Guaymallen", 2L , LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.actualizarDomicilio(domicilio);
        
        */
        
        /*
        
        //Metodo BuscaOne Domicilio (Funciona Ok):
        
        ControladorDomicilio controlador = new ControladorDomicilio();
        
        Domicilio domicilio = controlador.buscarOneDomicilio(1L);
        
        System.out.println(domicilio.toString());

        */
        
        /*
        
        //Metodo BuscaAll Domicilio (Funciona Ok):
        
        ControladorDomicilio controlador = new ControladorDomicilio();
        
        List<Domicilio> listaDomicilio = controlador.buscarAllDomicilio();
        
        for(Domicilio item: listaDomicilio){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar Domicilio (Funciona Ok):
        
        ControladorDomicilio controlador = new ControladorDomicilio();
        
        controlador.eliminarDomicilio(1L);

        */
        
        /*
        
        //Metodo Eliminado Logico Domicilio (Funciona Ok):
        
        ControladorDomicilio controlador = new ControladorDomicilio();
        
        controlador.eliminarLogicoDomicilio(1L, LocalDate.of(2021,5,26));
        
        */
        
        
        //************************************************************
        
    
        //TESTEO PEDIDO:
        
        /*
        
        //Metodo Insertar Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        Pedido pedido = new Pedido("28288",LocalTime.of(11, 00, 59), 3, 300.00, 2L , 1L, LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarPedido(pedido);
        
        */
        
        /*
        
        //Metodo Actualizar Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        Pedido pedido = new Pedido(1L , "28222", LocalTime.of(10, 10, 59), 3, 222.00, 2L , 1L, LocalDate.of(2021,5,14), LocalDate.of(2020,2,10), "inactivo");
        
        controlador.actualizarPedido(pedido);
        
        */
        
        /*
        
        //Metodo BuscaOne Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        Pedido pedido = controlador.buscarOnePedido(1L);
        
        System.out.println(pedido.toString());

        */
        
        /*
        
        //Metodo BuscaAll Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        List<Pedido> listaPedido = controlador.buscarAllPedido();
        
        for(Pedido item: listaPedido){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        controlador.eliminarPedido(1L);

        */
        
        /*
        
        //Metodo Eliminado Logico Pedido (Funciona Ok):
        
        ControladorPedido controlador = new ControladorPedido();
        
        controlador.eliminarLogicoPedido(1L, LocalDate.of(2021,5,26));
        
        */
        
        //************************************************************
        
    
        //TESTEO FACTURA:
        
        /*
        
        //Metodo Insertar Factura (Funciona Ok):
        
        ControladorFactura controlador = new ControladorFactura();
        
        Factura factura = new Factura("36336", 20, "contado", 300, 1L, LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarFactura(factura);
        
        */
       
        /*
        
        //Metodo Actualizar Factura (Funciona Ok):
        
        ControladorFactura controlador = new ControladorFactura();
        
        Factura factura = new Factura(1L, "221", 25, "contado", 320, 1L, LocalDate.of(2021,5,14), LocalDate.of(2020,3,1), "inactivo");
        
        controlador.actualizarFactura(factura);
        
        */
        
        /*
        
        //Metodo BuscaOne Factura (Funciona Ok):
        
        ControladorFactura controlador = new ControladorFactura();
        
        Factura factura = controlador.buscarOneFactura(1L);
        
        System.out.println(factura.toString());

        */
        
        /*
        
        //Metodo BuscaAll Factura (Funciona Ok):
        
        ControladorFactura controlador = new ControladorFactura();
        
        List<Factura> listaFactura = controlador.buscarAllFactura();
        
        for(Factura item: listaFactura){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar Factura (Funciona Ok):
        
        ControladorFactura controlador = new ControladorFactura();
        
        controlador.eliminarFactura(1L);

        */
        
        /*
        
        
        //Metodo Eliminado Logico Factura (Funciona Ok):
        
        
        ControladorFactura controlador = new ControladorFactura();
        
        controlador.eliminarLogicoFactura(1L, LocalDate.of(2021,5,26));
        
        */
        
        //************************************************************
        
        
        //TESTEO MERCADO_PAGO:
        
        
        /*
        
        //Metodo Insertar mercadoPago (Funciona Ok):
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        MercadoPago mercadoPago = new MercadoPago("24242", LocalDate.of(2021,5,14), "tajeta", "73737377372", 1L, LocalDate.of(2021,5,14), LocalDate.of(1900,1,1), "activo");
        
        controlador.insertarMercadoPago(mercadoPago);
        
        */
       
        /*
        
        //Metodo Actualizar MercadoPago (Funciona Ok):
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        MercadoPago mercadoPago = new MercadoPago(1L, "242112", LocalDate.of(2021,5,14), "tajeta", "344444322", 1L, LocalDate.of(2021,5,14), LocalDate.of(2021,5,2), "inactivo");
        
        controlador.actualizarMercadoPago(mercadoPago);
        
        */
        
        /*
        
        //Metodo BuscaOne MercadoPago (Funciona Ok):
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        MercadoPago mercadoPago = controlador.buscarOneMercadoPago(1L);
        
        System.out.println(mercadoPago.toString());

        */
        
        /*
        
        //Metodo BuscaAll Factura (Funciona Ok):
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        List<MercadoPago> listaMercadoPago = controlador.buscarAllMercadoPago();
        
        for(MercadoPago item: listaMercadoPago){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar MercadoPago (Funciona Ok):
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        controlador.eliminarMercadoPago(1L);

        */
        
        /*
        
        //Metodo Eliminado Mercado_Pago Factura (Funciona Ok):
        
        
        ControladorMercadoPago controlador = new ControladorMercadoPago();
        
        controlador.eliminarLogicoMercadoPago(1L, LocalDate.of(2021,5,26));
        
        
        */
        
      //************************************************************
        
        
        //TESTEO DETALLE_PEDIDO:
        
        
        /*
        
        //Metodo Insertar detallePedido (Funciona Ok):
        
        ControladorDetallePedido controlador = new ControladorDetallePedido();
        
        DetallePedido detallePedido = new DetallePedido(5, 90, 1L, 1L);
        
        controlador.insertarDetallePedido(detallePedido);
        
        */
       
       /*
        
        //Metodo Actualizar detallePedido (Funciona Ok):
        
        ControladorDetallePedido controlador = new ControladorDetallePedido();
        
        DetallePedido detallePedido = new DetallePedido(2L, 6, 100, 1L, 1L);
        
        controlador.actualizarDetallePedido(detallePedido);
        
        */
        
        /*
        
        //Metodo BuscaOne DetallePedido (Funciona Ok):
        
        ControladorDetallePedido controlador = new ControladorDetallePedido();
        
        DetallePedido detallePedido = controlador.buscarOneDetallePedido(2L);
        
        System.out.println(detallePedido.toString());

       */
        
        /*
        
        //Metodo BuscaAll DetallePedido (Funciona Ok):
        
        ControladorDetallePedido controlador = new ControladorDetallePedido();
        
        List<DetallePedido> listaDetallePedido = controlador.buscarAllDetallePedido();
        
        for(DetallePedido item: listaDetallePedido){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar DetallePedido (Funciona Ok):
        
        ControladorDetallePedido controlador = new ControladorDetallePedido();
        
        controlador.eliminarDetallePedido(2L);

        */
        
        
        //TESTEO DETALLE_FACTURA:
        
        
        /*
        
        //Metodo Insertar detalleFactura (Funciona Ok):
        
        ControladorDetalleFactura controlador = new ControladorDetalleFactura();
        
        DetalleFactura detalleFactura = new DetalleFactura(5, 90, 1L, 1L);
        
        controlador.insertarDetalleFactura(detalleFactura);
        
        */
       
       /*
        
        //Metodo Actualizar detalleFactura (Funciona Ok):
        
        ControladorDetalleFactura controlador = new ControladorDetalleFactura();
        
        DetalleFactura detalleFactura = new DetalleFactura(1L, 6, 100, 1L, 1L);
        
        controlador.actualizarDetalleFactura(detalleFactura);
        
        
        */
       
        /*
        
        //Metodo BuscaOne DetalleFactura (Funciona Ok):
        
        ControladorDetalleFactura controlador = new ControladorDetalleFactura();
        
        DetalleFactura detalleFactura = controlador.buscarOneDetalleFactura(1L);
        
        System.out.println(detalleFactura.toString());

       */
        
        /*
        
        //Metodo BuscaAll DetalleFactura (Funciona Ok):
        
        ControladorDetalleFactura controlador = new ControladorDetalleFactura();
        
        List<DetalleFactura> listaDetalleFactura = controlador.buscarAllDetalleFactura();
        
        for(DetalleFactura item: listaDetalleFactura){
            
            System.out.println(item.toString());
            
        }

        */
            
        /*
        
        //Metodo eliminar DetalleFactura (Funciona Ok):
        
        ControladorDetalleFactura controlador = new ControladorDetalleFactura();
        
        controlador.eliminarDetalleFactura(1L);

        */
        
        /**********************************************************************/
        
        //TESTEO RUBRO ARTICULO:
        
        
        /*
        
        //Metodo Insertar rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        RubroArticulo rubroArticulo = new RubroArticulo("Perecederos", LocalDate.of(2021,5,10), "Activo");
        controlador.insertarRubroArticulo(rubroArticulo);
                
        //*/
       
       /*
        
        //Metodo Actualizar rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        RubroArticulo rubroArticulo = new RubroArticulo(1,"Perecederos2", LocalDate.of(2021,5,10), "Activo");
        controlador.actualizarRubroArticulo(rubroArticulo);
        
        
        //*/
       
        /*
        
        //Metodo BuscaOne rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        RubroArticulo rubroArticulo = controlador.buscarOneRubroArticulo(1);
        System.out.println(rubroArticulo.getDenominacion());

       //*/
        
        /*
        
        //Metodo BuscaAll rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        List<RubroArticulo> rubroArticulo = controlador.buscarAllRubroArticulo();
        
        for(RubroArticulo item: rubroArticulo)
            System.out.println(item.getDenominacion());

        //*/
            
        /*
        
        //Metodo eliminar rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        controlador.eliminarRubroArticulo(2);

        //*/
        
        /*
        
        //Metodo eliminarLogico rubroArticulo (Funciona Ok):
        
        ControladorRubroArticulo controlador = new ControladorRubroArticulo();
        controlador.eliminarLogicoArticuloInsumo(1, LocalDate.of(2021,5,26));

        //*/
        
        /**********************************************************************/
        
        //TESTEO ARTICULO INSUMO:
        
        
        /*
        
        //Metodo Insertar articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        ArticuloInsumo articuloInsumo = new ArticuloInsumo("Lechuga", 10.50, 21, 15.00, 5.00, "Kilos", "Es insumo", 1, LocalDate.of(2021,5,10), "activo");
        controlador.insertarArticuloInsumo(articuloInsumo);
                
        //*/
       
       /*
        
        //Metodo Actualizar articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        ArticuloInsumo articuloInsumo = new ArticuloInsumo(3, "Lechuga", 10.50, 21, 35.00, 5.00, "Kilos", "Es insumo", 1, LocalDate.of(2021,5,10), "activo");
        controlador.actualizarArticuloInsumo(articuloInsumo);
        
        //*/
       
        /*
        
        //Metodo BuscaOne articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        // Acá le puse 3 porque ese era el único registro que tenia en la base
        // Si no te llega a funcionar con el 3, ponele algun numero que tengas en tu base
        ArticuloInsumo articuloInsumo = controlador.buscarOneArticuloInsumo(3);
        System.out.println(articuloInsumo.getDenominacion());

       //*/
        
        /*
        
        //Metodo BuscaAll articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        List<ArticuloInsumo> listaArticuloInsumo = controlador.buscarAllArticuloInsumo();
        
        for(ArticuloInsumo item: listaArticuloInsumo)
            System.out.println(item.getDenominacion());

        //*/
            
        /*
        
        //Metodo eliminar articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        controlador.eliminarArticuloInsumo(4L);

        //*/
        
        /*
        
        //Metodo eliminarLogico articuloInsumo (Funciona Ok):
        
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        controlador.eliminarLogicoArticuloInsumo(3, LocalDate.of(2021,5,26));

        //*/
        
        /**********************************************************************/
        
        //TESTEO RUBRO GENERAL:
        
        
        /*
        
        //Metodo Insertar rubroGeneral (Funciona Ok):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        RubroGeneral rubroGeneral = new RubroGeneral("Lacteos", LocalDate.of(2021,5,10), "Activo");
        controlador.insertarRubroGeneral(rubroGeneral);
                
        //*/
       
       /*
        
        //Metodo Actualizar rubroGeneral (Funciona Ok):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        RubroGeneral rubroGeneral = new RubroGeneral(1,"Lacteos2", LocalDate.of(2021,5,10), "Activo");
        controlador.actualizarRubroGeneral(rubroGeneral);
        
        
        //*/
       
        /*
        
        //Metodo BuscaOne rubroGeneral (Funciona Ok):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        RubroGeneral rubroGeneral = controlador.buscarOneRubroGeneral(1);
        System.out.println(rubroGeneral.getDenominacion());

       //*/
        
        /*
        
        //Metodo BuscaAll rubroGeneral (Funciona Ok):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        List<RubroGeneral> rubroGeneral = controlador.buscarAllRubroGeneral();
        
        for(RubroGeneral item: rubroGeneral)
            System.out.println(item.getDenominacion());

        //*/
            
        /*
        
        //Metodo eliminar rubroGeneral (Funciona Ok):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        controlador.eliminarRubroGeneral(2);

        //*/
        
        /*
        
        //Metodo eliminarLogico rubroGeneral (Funciona ):
        
        ControladorRubroGeneral controlador = new ControladorRubroGeneral();
        controlador.eliminarLogicoRubroGeneral(1, LocalDate.of(2021,5,26));

        //*/
        
        /**********************************************************************/
        
        //TESTEO ARTICULO MANUFACTURADO:
        
        
        /*
        
        //Metodo Insertar ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        ArticuloManufacturado articuloManufacturado = new ArticuloManufacturado(10, "Yogurt", 1, 60.00, "aca va la imagen", LocalDate.of(2021,5,10), "Activo");
        controlador.insertarArticuloManufacturado(articuloManufacturado);
                
        //*/
       
       /*
        
        //Metodo Actualizar ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        ArticuloManufacturado articuloManufacturado = new ArticuloManufacturado(1,10, "Yogurt isimo", 1, 60.00, "aca va la imagen", LocalDate.of(2021,5,10), "Activo");
        controlador.actualizarArticuloManufacturado(articuloManufacturado);
        
        
        //*/
       
        /*
        
        //Metodo BuscaOne ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        ArticuloManufacturado articuloManufacturado = controlador.buscarOneArticuloManufacturado(1);
        System.out.println(articuloManufacturado.getDenominacion());

       //*/
        
        /*
        
        //Metodo BuscaAll ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        List<ArticuloManufacturado> articuloManufacturados = controlador.buscarAllArticuloManufacturado();
        
        for(ArticuloManufacturado item: articuloManufacturados)
            System.out.println(item.getDenominacion());

        //*/
            
        /*
        
        //Metodo eliminar ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        controlador.eliminarArticuloManufacturado(3);

        //*/
        
        /*
        
        //Metodo eliminarLogico ArticuloManufacturado (Funciona Ok):
        
        ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
        controlador.eliminarLogicoArticuloManufacturado(1, LocalDate.of(2021,5,26));

        //*/
        
        /**********************************************************************/
        
        //TESTEO ARTICULO MANUFACTURADO DETALLE:
        
        
        /*
        
        //Metodo Insertar ArticuloManufacturadoDetalle (Funciona Ok):
        
        ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
        ArticuloManufacturadoDetalle articuloManufacturadoDetalle = new ArticuloManufacturadoDetalle(5.0, 1, 3, null, null);
        controlador.insertarArticuloManufacturadoDetalle(articuloManufacturadoDetalle);
                
        //*/
       
       /*
        
        //Metodo Actualizar ArticuloManufacturadoDetalle (Funciona Ok):
        
        ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
        ArticuloManufacturadoDetalle articuloManufacturadoDetalle = new ArticuloManufacturadoDetalle(1,15.0, 1, 3, null, null);
        controlador.actualizarArticuloManufacturadoDetalle(articuloManufacturadoDetalle);
        
        
        //*/
       
        /*
        
        //Metodo BuscaOne ArticuloManufacturadoDetalle (Funciona Ok):
        
        ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
        ArticuloManufacturadoDetalle articuloManufacturadoDetalle = controlador.buscarOneArticuloManufacturadoDetalle(1);
        System.out.println(articuloManufacturadoDetalle.getIdArticuloDetalle());

       //*/
        
        /*
        
        //Metodo BuscaAll ArticuloManufacturadoDetalle (Funciona Ok):
        
        ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
        List<ArticuloManufacturadoDetalle> artManDetalle = controlador.buscarAllArticuloManufacturadoDetalle();
        
        for(ArticuloManufacturadoDetalle item: artManDetalle)
            System.out.println(item.getIdArticuloDetalle());

        //*/
            
        /*
        
        //Metodo eliminar ArticuloManufacturadoDetalle (Funciona Ok):
        
        ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
        controlador.eliminarArticuloManufacturadoDetalle(2);

        //*/
        
        /**********************************************************************/
        
        //TESTEO CONFIGURACION:
        
        
        /*
        
        //Metodo Insertar configuracion ( ):
        
        ControladorConfiguracion controlador = new ControladorConfiguracion();
        Configuracion configuracion = new Configuracion(4, "empresa@gmail.com", "123456asdqwe");
        controlador.insertarConfiguracion(configuracion);
                
        //*/
        
    }
    

}

