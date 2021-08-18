package Controlador;

import Conexion.Conexion;
import Modelo.ArticuloManufacturado;
import java.sql.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;


public class ControladorArticuloManufacturado {
    
   //METODO PARA INSERTAR ART_MANUFACTURADO:
    public void insertarArtManufacturado(ArticuloManufacturado artManufacturado) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO articulo_manufacturado (tiempoEstimado, denominacion, precioVenta, imagen, fechaAlta, fechaBaja, estado, idRubro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, artManufacturado.getTiempoEstimado());
            ps.setString(2, artManufacturado.getDenominacion());
            ps.setDouble(3, artManufacturado.getPrecioVenta());
            ps.setString(4, artManufacturado.getImagen());
            ps.setDate(5, Date.valueOf(artManufacturado.getFechaAlta()));
            ps.setDate(6, Date.valueOf(artManufacturado.getFechaBaja()));
            ps.setString(7, artManufacturado.getEstado());
            ps.setLong(8, artManufacturado.getIdRubro());

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

    //METODO PARA GESTIONAR ACTUALIZACION ART_MANUFACTURADO:
    public void actualizarArtManufacturado(ArticuloManufacturado artManufacturado) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_manufacturado SET tiempoEstimado = ?, denominacion = ?, precioVenta = ?, imagen = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idRubro = ?  WHERE idArticulo = ? ");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, artManufacturado.getTiempoEstimado());
            ps.setString(2, artManufacturado.getDenominacion());
            ps.setDouble(3, artManufacturado.getPrecioVenta());
            ps.setString(4, artManufacturado.getImagen());
            ps.setDate(5, Date.valueOf(artManufacturado.getFechaAlta()));
            ps.setDate(6, Date.valueOf(artManufacturado.getFechaBaja()));
            ps.setString(7, artManufacturado.getEstado());
            ps.setLong(8, artManufacturado.getIdRubro());
            ps.setLong(9, artManufacturado.getIdArticulo());

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

    //METODO ELIMINAR ART_MANUFACTURADO:
    public void eliminarArtManufacturado(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM articulo_manufacturado WHERE idArticulo = ?");

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

    //METODO BUSCAR ONE ART_MANUFACTURADO:
    public ArticuloManufacturado buscarOneArtManufacturado(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloManufacturado artManufacturado = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM articulo_manufacturado WHERE idArticulo = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                long idArticulo = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int tiempoEstimado = rs.getInt(2);
                String denominacion = rs.getString(3);
                double precioVenta = rs.getDouble(4);
                String imagen = rs.getString(5);
                LocalDate fechaAlta = (rs.getDate(6)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(7)).toLocalDate();
                String estado = rs.getString(8);
                long idRubro = rs.getLong(9);

                artManufacturado = new ArticuloManufacturado(idArticulo, tiempoEstimado, denominacion, precioVenta, imagen, idRubro, fechaAlta, fechaBaja, estado);

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

        return artManufacturado; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL ART_MANUFACTURADO:
    public List<ArticuloManufacturado> buscarAllArtManufacturado() {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloManufacturado artManufacturado = null;
        List<ArticuloManufacturado> listaArtManufacturado = new ArrayList<ArticuloManufacturado>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM articulo_manufacturado");

            rs = ps.executeQuery();

            while (rs.next()) {

                long idArticulo = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int tiempoEstimado = rs.getInt(2);
                String denominacion = rs.getString(3);
                double precioVenta = rs.getDouble(4);
                String imagen = rs.getString(5);
                LocalDate fechaAlta = (rs.getDate(6)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(7)).toLocalDate();
                String estado = rs.getString(8);
                long idRubro = rs.getLong(9);

                artManufacturado = new ArticuloManufacturado(idArticulo, tiempoEstimado, denominacion, precioVenta, imagen, idRubro, fechaAlta, fechaBaja, estado);

                listaArtManufacturado.add(artManufacturado);

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

        return listaArtManufacturado; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO ART_MANUFACTURADO A TRAVES DE UPDATE:
    
    public void eliminarLogicoArtManufacturado(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_manufacturado SET fechaBaja = ?, estado = ?  WHERE idArticulo = ? ");

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
