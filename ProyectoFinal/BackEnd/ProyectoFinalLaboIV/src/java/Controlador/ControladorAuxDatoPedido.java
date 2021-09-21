
package Controlador;

import Conexion.Conexion;
import Modelo.AuxDatoPedido;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorAuxDatoPedido {
    
    
    //OBTENER ALL AuxDato Pedido Sirve para en MetodoPago calcular TiempoArtCocina:
    public List<AuxDatoPedido> buscarAllAuxDatoPedido() {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxDatoPedido auxDatoPedido = null;
        List<AuxDatoPedido> listaAuxDatoPedido = new ArrayList<AuxDatoPedido>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("select a.tiempoEstimado as tiempoEstimado, a.denominacion as producto, \n" +
            "a.precioVenta as precioUnitario, d.cantidad as cantidad, d.subtotal as subTotal, d.idPedido as idPedido,\n" +
            "d.idArtManufacturado as idArtManuf, p.total as total from pedido as p INNER JOIN detalle_pedido as d ON p.idPedido = d.idPedido\n" +
            "INNER JOIN articulo_manufacturado as a ON d.idArtManufacturado = a.idArticulo WHERE p.estadoPedido = 1");

            rs = ps.executeQuery();

            while (rs.next()) {

                int tiempoEstimado = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                double precioUnitario = rs.getDouble(3);
                int cantidad = rs.getInt(4);
                double subTotal = rs.getDouble(5);
                int idPedido = rs.getInt(6);
                int idArticulo = rs.getInt(7);
                double total = rs.getDouble(8);
                
                auxDatoPedido = new AuxDatoPedido(tiempoEstimado, nombre, precioUnitario, cantidad, subTotal, total, idPedido, idArticulo);

                listaAuxDatoPedido.add(auxDatoPedido);

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

        return listaAuxDatoPedido; //devolvemos la lista de alumnos encontrado

    }
    
}
