package Controlador;

import Conexion.Conexion;
import Modelo.AuxFacturaPedido;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class ControladorAuxFacturaPedido {
    
    //OBTENER ALL AuxFacturaPedido Sirve para Generar la Factura:
    public List<AuxFacturaPedido> buscarAllAuxFacturaPedido(long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxFacturaPedido auxFacturaPedido = null;
        List<AuxFacturaPedido> listaAuxFacturaPedido = new ArrayList<AuxFacturaPedido>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT p.tipoEnvio AS tipoEnvio, f.codigo AS codigo, \n" +
            "f.montoDescuento as Descuento, f.formaPago AS MetodoPago, f.totalVenta AS Total, d.cantidad AS Cantidad,\n" +
            "d.subTotal AS SubTotal, a.denominacion AS Nombre, a.precioVenta AS PrecioUnitario FROM pedido AS p \n" +
            "INNER JOIN factura AS f ON p.idPedido = f.idPedido INNER JOIN detalle_factura AS d ON \n" +
            "f.idFactura = d.idFactura INNER JOIN articulo_manufacturado AS a ON d.idArticulo = a.idArticulo WHERE f.idFactura = ?");

            ps.setLong(1, id);
            
            rs = ps.executeQuery();

            while (rs.next()) {

                int tipoEnvio = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                double montoDescuento = rs.getDouble(3);
                String metodoPago = rs.getString(4);
                double total = rs.getDouble(5);
                int cantidad = rs.getInt(6);
                double subTotal = rs.getDouble(7);
                String denominacion = rs.getString(8);
                double precioVenta = rs.getDouble(9);
                
                auxFacturaPedido = new AuxFacturaPedido(tipoEnvio, codigo, montoDescuento, metodoPago, total, cantidad, subTotal, denominacion, precioVenta);

                listaAuxFacturaPedido.add(auxFacturaPedido);

            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return listaAuxFacturaPedido; //devolvemos la lista de alumnos encontrado

    }
    
}
