package Controlador;

import Conexion.Conexion;
import Modelo.MercadoPago;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorMercadoPago {
    
    
    //METODO PARA INSERTAR MERCADO_PAGO:
    public void insertarMercadoPago(MercadoPago mercadoPago) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO mercadoPago (codigo, fechaAlta, fechaAprobacion, fechaBaja, metodoPago, numeroTarjeta, estado, idPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, mercadoPago.getCodigo());
            ps.setDate(2, Date.valueOf(mercadoPago.getFechaAlta()));
            ps.setDate(3, Date.valueOf(mercadoPago.getFechaAprobacion()));
            ps.setDate(4, Date.valueOf(mercadoPago.getFechaBaja()));
            ps.setString(5, mercadoPago.getMetodoPago());
            ps.setString(6, mercadoPago.getNumeroTarjeta());
            ps.setString(7, mercadoPago.getEstado());
            ps.setLong(8, mercadoPago.getIdPedido());

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

    //METODO PARA GESTIONAR ACTUALIZACION MERCADO_PAGO:
    public void actualizarMercadoPago(MercadoPago mercadoPago) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE mercadoPago SET codigo = ?, fechaAlta = ?, fechaAprobacion = ?, fechaBaja = ?, metodoPago = ?, numeroTarjeta = ?, estado = ?, idPedido = ?  WHERE idMercadoPago = ? ");

            ps.setString(1, mercadoPago.getCodigo());
            ps.setDate(2, Date.valueOf(mercadoPago.getFechaAlta()));
            ps.setDate(3, Date.valueOf(mercadoPago.getFechaAprobacion()));
            ps.setDate(4, Date.valueOf(mercadoPago.getFechaBaja()));
            ps.setString(5, mercadoPago.getMetodoPago());
            ps.setString(6, mercadoPago.getNumeroTarjeta());
            ps.setString(7, mercadoPago.getEstado());
            ps.setLong(8, mercadoPago.getIdPedido());
            ps.setLong(9, mercadoPago.getIdMercadoPago());
            
            
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

    //METODO ELIMINAR MERCADO_PAGO:
    public void eliminarMercadoPago(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM mercadoPago WHERE idMercadoPago = ?");

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

    //METODO BUSCAR ONE MERCADO_PAGO:
    public MercadoPago buscarOneMercadoPago(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        MercadoPago mercadoPago = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM mercadoPago WHERE idMercadoPago = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idMercadoPago = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                LocalDate fechaAlta = (rs.getDate(3)).toLocalDate();
                LocalDate fechaAprobacion = (rs.getDate(4)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(5)).toLocalDate();
                String metodoPago = rs.getString(6);
                String numeroTarjeta = rs.getString(7);
                String estado = rs.getString(8);
                Long idPedido = rs.getLong(9);
                

                mercadoPago = new MercadoPago(idMercadoPago, codigo, fechaAprobacion, metodoPago, numeroTarjeta, idPedido, fechaAlta, fechaBaja, estado);

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

        return mercadoPago; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL MERCADO_PAGO:
    public List<MercadoPago> buscarAllMercadoPago() {

        Connection conexion = null;
        Conexion con = new Conexion();
        MercadoPago mercadoPago = null;
        List<MercadoPago> listaMercadoPago = new ArrayList<MercadoPago>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM mercadoPago");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idMercadoPago = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                LocalDate fechaAlta = (rs.getDate(3)).toLocalDate();
                LocalDate fechaAprobacion = (rs.getDate(4)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(5)).toLocalDate();
                String metodoPago = rs.getString(6);
                String numeroTarjeta = rs.getString(7);
                String estado = rs.getString(8);
                Long idPedido = rs.getLong(9);
                

                mercadoPago = new MercadoPago(idMercadoPago, codigo, fechaAprobacion, metodoPago, numeroTarjeta, idPedido, fechaAlta, fechaBaja, estado);

                listaMercadoPago.add(mercadoPago);

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

        return listaMercadoPago; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO MERCADO_PAGO A TRAVES DE UPDATE:
    
    public void eliminarLogicoMercadoPago(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE mercadoPago SET fechaBaja = ?, estado = ?  WHERE idMercadoPago = ? ");

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

