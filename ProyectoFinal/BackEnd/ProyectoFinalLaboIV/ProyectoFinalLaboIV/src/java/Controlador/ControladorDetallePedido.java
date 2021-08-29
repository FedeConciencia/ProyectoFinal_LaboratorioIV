
package Controlador;

import Conexion.Conexion;
import Modelo.DetallePedido;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorDetallePedido {
    
    
    //METODO PARA INSERTAR DETALLE_PEDIDO:
    public void insertarDetallePedido(DetallePedido detallePedido) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO detalle_pedido (cantidad, subTotal, idPedido, idArtManufacturado) VALUES (?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, detallePedido.getCantidad());
            ps.setDouble(2, detallePedido.getSubTotal());
            ps.setLong(3, detallePedido.getIdPedido());
            ps.setLong(4, detallePedido.getIdArticuloManufacturado());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue insertado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue insertado con exito a la Base de Datos.");
                //out.print("<script>alert('El Registro fue insertado con exito a la Base de Datos.');<script>");
            } else {

                System.out.println("Error al intentar insertar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar insertar el registro.");
                //out.print("<script>alert('Error al intentar insertar el registro.');<script>");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);
            //out.print("<script>alert('Error de Conexion.');<script>");
        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
                //out.print("<script>alert('Error de Conexion.');<script>");
            }

        }
    }

    //METODO PARA GESTIONAR ACTUALIZACION DETALLE_PEDIDO:
    public void actualizarDetallePedido(DetallePedido detallePedido) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE detalle_pedido SET cantidad = ?, subTotal = ?, idPedido = ?, idArtManufacturado = ?  WHERE idDetalle = ? ");

            ps.setInt(1, detallePedido.getCantidad());
            ps.setDouble(2, detallePedido.getSubTotal());
            ps.setLong(3, detallePedido.getIdPedido());
            ps.setLong(4, detallePedido.getIdArticuloManufacturado());
            ps.setLong(5, detallePedido.getIdDetallePedido());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue actualizado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue modificado con exito a la Base de Datos.");
            } else {

                System.out.println("Error al intentar actualizar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar modificar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO ELIMINAR DETALLE_PEDIDO:
    public void eliminarDetallePedido(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM detalle_pedido WHERE idDetalle = ?");

            ps.setLong(1, id); //Se puede usar indicando el primer signo de pregunta del qwery y alojar la variable

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue eliminado con exito a la Base de Datos.");
            } else {

                System.out.println("Error al intentar eliminar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar eliminar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO BUSCAR ONE DETALLE_PEDIDO:
    public DetallePedido buscarOneDetallePedido(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        DetallePedido detallePedido = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM detalle_pedido WHERE idDetalle = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idDetallePedido = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidad = rs.getInt(2);
                double subTotal = rs.getDouble(3);
                Long idPedido = rs.getLong(4);
                Long idArticuloManufacturado = rs.getLong(5);
                

                detallePedido = new DetallePedido(idDetallePedido, cantidad, subTotal, idPedido, idArticuloManufacturado);

                System.out.println("El Registro fue encontrado con exito.");
                //JOptionPane.showMessageDialog(null, "El Registro fue encontrado con exito.");

            } else {

                System.out.println("El Registro no fue encontrado en la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro no fue encontrado en la Base de Datos.");
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

        return detallePedido; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL DETALLE_PEDIDO:
    public List<DetallePedido> buscarAllDetallePedido() {

        Connection conexion = null;
        Conexion con = new Conexion();
        DetallePedido detallePedido = null;
        List<DetallePedido> listaDetallePedido = new ArrayList<DetallePedido>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM detalle_pedido");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idDetallePedido = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidad = rs.getInt(2);
                double subTotal = rs.getDouble(3);
                Long idPedido = rs.getLong(4);
                Long idArticuloManufacturado = rs.getLong(5);
                

                detallePedido = new DetallePedido(idDetallePedido, cantidad, subTotal, idPedido, idArticuloManufacturado);

                listaDetallePedido.add(detallePedido);

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

        return listaDetallePedido; //devolvemos la lista de alumnos encontrado

    }
    
}
