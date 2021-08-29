
package Controlador;

import Conexion.Conexion;
import Modelo.Domicilio;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorDomicilio {
    
    //METODO PARA INSERTAR DOMICILIO:
    public void insertarDomicilio(Domicilio domicilio) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO domicilio (calle, numero, localidad, fechaAlta, fechaBaja, estado, idCliente) VALUES (?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, domicilio.getCalle());
            ps.setString(2, domicilio.getNumero());
            ps.setString(3, domicilio.getLocalidad());
            ps.setDate(4, Date.valueOf(domicilio.getFechaAlta()));
            ps.setDate(5, Date.valueOf(domicilio.getFechaBaja()));
            ps.setString(6, domicilio.getEstado());
            ps.setLong(7, domicilio.getIdCliente());

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

    //METODO PARA GESTIONAR ACTUALIZACION DOMICILIO:
    public void actualizarDomicilio(Domicilio domicilio) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE domicilio SET calle = ?, numero = ?, localidad = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idCliente = ?  WHERE idDomicilio = ? ");

            ps.setString(1, domicilio.getCalle());
            ps.setString(2, domicilio.getNumero());
            ps.setString(3, domicilio.getLocalidad());
            ps.setDate(4, Date.valueOf(domicilio.getFechaAlta()));
            ps.setDate(5, Date.valueOf(domicilio.getFechaBaja()));
            ps.setString(6, domicilio.getEstado());
            ps.setLong(7, domicilio.getIdCliente());
            ps.setLong(8, domicilio.getIdDomicilio());

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

    //METODO ELIMINAR DOMICILIO:
    public void eliminarDomicilio(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM domicilio WHERE idDomicilio = ?");

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

    //METODO BUSCAR ONE DOMICILIO:
    public Domicilio buscarOneDomicilio(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Domicilio domicilio = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM domicilio WHERE idDomicilio = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idDomicilio = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String calle = rs.getString(2);
                String numero = rs.getString(3);
                String localidad = rs.getString(4);
                LocalDate fechaAlta = (rs.getDate(5)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(6)).toLocalDate();
                String estado = rs.getString(7);
                Long idCliente = rs.getLong(8);

                domicilio = new Domicilio(idDomicilio, calle, numero, localidad ,  idCliente, fechaAlta, fechaBaja, estado);

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

        return domicilio; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL DOMICILIO:
    public List<Domicilio> buscarAllDomicilio() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Domicilio domicilio = null;
        List<Domicilio> listaDomicilio = new ArrayList<Domicilio>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM usuario");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idDomicilio = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String calle = rs.getString(2);
                String numero = rs.getString(3);
                String localidad = rs.getString(4);
                LocalDate fechaAlta = (rs.getDate(5)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(6)).toLocalDate();
                String estado = rs.getString(7);
                Long idCliente = rs.getLong(8);

                domicilio = new Domicilio(idDomicilio, calle, numero, localidad ,  idCliente, fechaAlta, fechaBaja, estado);

                listaDomicilio.add(domicilio);

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

        return listaDomicilio; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO DOMICILIO A TRAVES DE UPDATE:
    
    public void eliminarLogicoDomicilio(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE domicilio SET fechaBaja = ?, estado = ?  WHERE idDomicilio = ? ");

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
