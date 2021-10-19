package Controlador;

import Conexion.Conexion;
import Modelo.Configuracion;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControladorConfiguracion {

    //METODO PARA INSERTAR CONFIGURACION:
    public void insertarConfiguracion(Configuracion configuracion) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO configuracion (cantidadCocineros, emailEmpresa, tokenMercadoPago, fechaAlta, fechaBaja, estado) VALUES (?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, configuracion.getCantidadCocineros());
            ps.setString(2, configuracion.getEmailEmpresa());
            ps.setString(3, configuracion.getTokenMercadoPago());
            ps.setDate(4, Date.valueOf(configuracion.getFechaAlta()));
            ps.setDate(5, Date.valueOf(configuracion.getFechaBaja()));
            ps.setString(6, configuracion.getEstado());

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

    //METODO PARA GESTIONAR ACTUALIZACION CONFIGURACION:
    public void actualizarConfiguracion(Configuracion configuracion) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE configuracion SET cantidadCocineros = ?, emailEmpresa = ?, tokenMercadoPago = ?, fechaAlta = ?, fechaBaja = ?, estado = ?  WHERE idConfiguracion = ? ");
            
            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, configuracion.getCantidadCocineros());
            ps.setString(2, configuracion.getEmailEmpresa());
            ps.setString(3, configuracion.getTokenMercadoPago());
            ps.setDate(4, Date.valueOf(configuracion.getFechaAlta()));
            ps.setDate(5, Date.valueOf(configuracion.getFechaBaja()));
            ps.setString(6, configuracion.getEstado());
            ps.setLong(7, configuracion.getIdConfiguracion());

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

    //METODO ELIMINAR CONFIGURACION:
    public void eliminarConfiguracion(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM configuracion WHERE idConfiguracion = ?");

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

    //METODO BUSCAR ONE CONFIGURACION:
    public Configuracion buscarOneConfiguracion(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Configuracion configuracion = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM configuracion WHERE idConfiguracion = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idConfiguracion = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidadCocineros = rs.getInt(2);
                String emailEmpresa = rs.getString(3);
                String tokenMercadoPago = rs.getString(4);
                LocalDate fechaAlta = (rs.getDate(5)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(6)).toLocalDate();
                String estado = rs.getString(7);

                configuracion = new Configuracion(idConfiguracion, cantidadCocineros, emailEmpresa, tokenMercadoPago, fechaAlta, fechaBaja, estado);

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

        return configuracion; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL CONFIGURACION:
    public List<Configuracion> buscarAllConfiguracion() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Configuracion configuracion = null;
        List<Configuracion> listaConfiguracion = new ArrayList<Configuracion>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM configuracion");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idConfiguracion = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidadCocineros = rs.getInt(2);
                String emailEmpresa = rs.getString(3);
                String tokenMercadoPago = rs.getString(4);
                LocalDate fechaAlta = (rs.getDate(5)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(6)).toLocalDate();
                String estado = rs.getString(7);

                configuracion = new Configuracion(idConfiguracion, cantidadCocineros, emailEmpresa, tokenMercadoPago, fechaAlta, fechaBaja, estado);

                listaConfiguracion.add(configuracion);

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

        return listaConfiguracion; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO CONFIGURACION A TRAVES DE UPDATE:
    
    public void eliminarLogicoConfiguracion(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE configuracion SET fechaBaja = ?, estado = ?  WHERE idConfiguracion = ? ");

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

