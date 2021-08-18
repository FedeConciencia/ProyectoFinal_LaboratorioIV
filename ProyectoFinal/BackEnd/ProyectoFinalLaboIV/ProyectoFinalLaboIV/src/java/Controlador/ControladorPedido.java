package Controlador;

import Conexion.Conexion;
import Modelo.Pedido;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class ControladorPedido {

    //METODO PARA INSERTAR PEDIDO:
    public void insertarPedido(Pedido pedido) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO pedido (codigo, horaEstimadaFin, tipoEnvio, total, fechaAlta, fechaBaja, estado, idCliente, idDomicilio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, pedido.getCodigo());
            ps.setTime(2, Time.valueOf(pedido.getHoraEstimadaFin()));  //Modifico por LocalTime que representa solo la hora y en BD con TIME
            ps.setInt(3, pedido.getTipoEnvio());
            ps.setDouble(4, pedido.getTotal());
            ps.setDate(5, Date.valueOf(pedido.getFechaAlta()));
            ps.setDate(6, Date.valueOf(pedido.getFechaBaja()));
            ps.setString(7, pedido.getEstado());
            ps.setLong(8, pedido.getIdCliente());
            ps.setLong(9, pedido.getIdDomicilio());

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

    //METODO PARA GESTIONAR ACTUALIZACION PEDIDO:
    public void actualizarPedido(Pedido pedido) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE pedido SET codigo = ?, horaEstimadaFin = ?, tipoEnvio = ?, total = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idCliente = ?, idDomicilio = ?  WHERE idPedido = ?");

            ps.setString(1, pedido.getCodigo());
            ps.setTime(2, Time.valueOf(pedido.getHoraEstimadaFin()));  //Modifico por LocalTime que representa solo la hora y en BD con TIME
            ps.setInt(3, pedido.getTipoEnvio());
            ps.setDouble(4, pedido.getTotal());
            ps.setDate(5, Date.valueOf(pedido.getFechaAlta()));
            ps.setDate(6, Date.valueOf(pedido.getFechaBaja()));
            ps.setString(7, pedido.getEstado());
            ps.setLong(8, pedido.getIdCliente());
            ps.setLong(9, pedido.getIdDomicilio());
            ps.setLong(10, pedido.getIdPedido());

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

    //METODO ELIMINAR PEDIDO:
    public void eliminarPedido(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM pedido WHERE idPedido = ?");

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

    //METODO BUSCAR ONE PEDIDO:
    public Pedido buscarOnePedido(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Pedido pedido = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM pedido WHERE idPedido = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idPedido = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                LocalTime horaEstimadaFin = (rs.getTime(3)).toLocalTime(); //modifico a local time para obtener solo la hora
                int tipoEnvio = rs.getInt(4);
                double total = rs.getDouble(5);
                LocalDate fechaAlta = (rs.getDate(6)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(7)).toLocalDate();
                String estado = rs.getString(8);
                Long idCliente = rs.getLong(9);
                Long idDomicilio = rs.getLong(10);

                pedido = new Pedido(idDomicilio, codigo, horaEstimadaFin, tipoEnvio, total, idCliente, idDomicilio, fechaAlta, fechaBaja, estado);

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

        return pedido; //devolvemos el alumno encontrado
    }

    //OBTENER ALL PEDIDOS:
    public List<Pedido> buscarAllPedido() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Pedido pedido = null;
        List<Pedido> listaPedido = new ArrayList<Pedido>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM pedido");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idPedido = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                LocalTime horaEstimadaFin = (rs.getTime(3)).toLocalTime();
                int tipoEnvio = rs.getInt(4);
                double total = rs.getDouble(5);
                LocalDate fechaAlta = (rs.getDate(6)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(7)).toLocalDate();
                String estado = rs.getString(8);
                Long idCliente = rs.getLong(9);
                Long idDomicilio = rs.getLong(10);

                pedido = new Pedido(idDomicilio, codigo, horaEstimadaFin, tipoEnvio, total, idCliente, idDomicilio, fechaAlta, fechaBaja, estado);

                listaPedido.add(pedido);

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

        return listaPedido; //devolvemos la lista de alumnos encontrado

    }

    //DELETE LOGICO PEDIDO A TRAVES DE UPDATE:
    public void eliminarLogicoPedido(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE pedido SET fechaBaja = ?, estado = ?  WHERE idPedido = ? ");

            ps.setDate(1, Date.valueOf(fecha));
            ps.setString(2, "inactivo");
            ps.setLong(3, id);

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado (Logico) de la Base de Datos.");
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

}
