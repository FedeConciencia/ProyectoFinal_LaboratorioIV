package Controlador;

import Conexion.Conexion;
import Modelo.ArticuloManufacturadoDetalle;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorArticuloManufacturadoDetalle {
    
    //METODO PARA INSERTAR ARTICULO_MANUFACTURADO_DETALLE:
    public void insertarArtManDetalle(ArticuloManufacturadoDetalle artManDetalle) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO articulo_manufacturado_detalle (cantidad, unidadMedida, idArticuloManufacturado, idArticuloInsumo) VALUES (?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setDouble(1, artManDetalle.getCantidad());
            ps.setString(2, artManDetalle.getUnidadMedida());
            ps.setLong(3, artManDetalle.getIdArticuloManufacturado());
            ps.setLong(4, artManDetalle.getIdArticuloInsumo());
            

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

    //METODO PARA GESTIONAR ACTUALIZACION ARTICULO_MANUFACTURADO_DETALLE:
    public void actualizarArtManDetalle(ArticuloManufacturadoDetalle artManDetalle) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_manufacturado_detalle SET cantidad = ?, unidadMedida = ?, idArticuloManufacturado = ?, idArticuloInsumo = ?  WHERE idArticuloDetalle = ? ");

            ps.setDouble(1, artManDetalle.getCantidad());
            ps.setString(2, artManDetalle.getUnidadMedida());
            ps.setLong(3, artManDetalle.getIdArticuloManufacturado());
            ps.setLong(4, artManDetalle.getIdArticuloInsumo());
            ps.setLong(5, artManDetalle.getIdArticuloDetalle());

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

    //METODO ELIMINAR ARTICULO_MANUFACTURADO_DETALLE:
    public void eliminarArtManDetalle(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM articulo_manufacturado_detalle WHERE idArticuloDetalle = ?");

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

    //METODO BUSCAR ONE ARTICULO_MANUFACTURADO_DETALLE:
    public ArticuloManufacturadoDetalle buscarOneArtManDetalle(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloManufacturadoDetalle artManDetalle = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM articulo_manufacturado_detalle WHERE idArticuloDetalle = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idArtDetalle = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                double cantidad = rs.getDouble(2);
                String unidadMedida = rs.getString(3);
                Long idArtManufacturado = rs.getLong(4);
                Long idArtInsumo = rs.getLong(5);

                artManDetalle = new ArticuloManufacturadoDetalle(idArtDetalle, cantidad, unidadMedida, idArtManufacturado, idArtInsumo);

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

        return artManDetalle; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL ARTICULO_MANUFACTURADO_DETALLE:
    public List<ArticuloManufacturadoDetalle> buscarAllArtManDetalle() {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloManufacturadoDetalle artManDetalle = null;
        List<ArticuloManufacturadoDetalle> listaArtManDetalle = new ArrayList<ArticuloManufacturadoDetalle>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM articulo_manufacturado_detalle");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idArtDetalle = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                double cantidad = rs.getDouble(2);
                String unidadMedida = rs.getString(3);
                Long idArtManufacturado = rs.getLong(4);
                Long idArtInsumo = rs.getLong(5);

                artManDetalle = new ArticuloManufacturadoDetalle(idArtDetalle, cantidad, unidadMedida, idArtManufacturado, idArtInsumo);

                listaArtManDetalle.add(artManDetalle);

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

        return listaArtManDetalle; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO ARTICULO_MANUFACTURADO_DETALLE A TRAVES DE UPDATE:
    
    public void eliminarLogicoArtManDetalle(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_manufacturado_detalle SET fechaBaja = ?, estado = ?  WHERE idArticuloDetalle = ? ");

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
