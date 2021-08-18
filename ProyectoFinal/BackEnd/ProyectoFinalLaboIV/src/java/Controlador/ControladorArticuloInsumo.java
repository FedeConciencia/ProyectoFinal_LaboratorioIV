package Controlador;

import Conexion.Conexion;
import Modelo.ArticuloInsumo;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorArticuloInsumo {
    
   //METODO PARA INSERTAR ART_INSUMO:
    public void insertarArtInsumo(ArticuloInsumo artInsumo) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO articulo_insumo (denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, fechaAlta, fechaBaja, estado, idRubro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, artInsumo.getDenominacion());
            ps.setDouble(2, artInsumo.getPrecioCompra());
            ps.setDouble(3, artInsumo.getPrecioVenta());
            ps.setDouble(4, artInsumo.getStockActual());
            ps.setDouble(5, artInsumo.getStockMinimo());
            ps.setString(6, artInsumo.getUnidadMedida());
            ps.setString(7, artInsumo.getEsInsumo());
            ps.setDate(8, Date.valueOf(artInsumo.getFechaAlta()));
            ps.setDate(9, Date.valueOf(artInsumo.getFechaBaja()));
            ps.setString(10, artInsumo.getEstado());
            ps.setLong(11, artInsumo.getIdRubro());

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

    //METODO PARA GESTIONAR ACTUALIZACION ART_INSUMO:
    public void actualizarArtInsumo(ArticuloInsumo artInsumo) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_insumo SET denominacion = ?, precioCompra = ?, precioVenta = ?, stockActual = ?, stockMinimo = ?, unidadMedida = ?, esInsumo = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idRubro = ?  WHERE idArticulo = ? ");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, artInsumo.getDenominacion());
            ps.setDouble(2, artInsumo.getPrecioCompra());
            ps.setDouble(3, artInsumo.getPrecioVenta());
            ps.setDouble(4, artInsumo.getStockActual());
            ps.setDouble(5, artInsumo.getStockMinimo());
            ps.setString(6, artInsumo.getUnidadMedida());
            ps.setString(7, artInsumo.getEsInsumo());
            ps.setDate(8, Date.valueOf(artInsumo.getFechaAlta()));
            ps.setDate(9, Date.valueOf(artInsumo.getFechaBaja()));
            ps.setString(10, artInsumo.getEstado());
            ps.setLong(11, artInsumo.getIdRubro());
            ps.setLong(12, artInsumo.getIdArticulo());

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

    //METODO ELIMINAR ART_INSUMO:
    public void eliminarArtInsumo(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM articulo_insumo WHERE idArticulo = ?");

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

    //METODO BUSCAR ONE ART_INSUMO:
    public ArticuloInsumo buscarOneArtInsumo(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloInsumo artInsumo = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM articulo_insumo WHERE idArticulo = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                long idArticulo = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String denominacion = rs.getString(2);
                double precioCompra = rs.getDouble(3);
                double precioVenta = rs.getDouble(4);
                double stockActual = rs.getDouble(5);
                double stockMinimo = rs.getDouble(6);
                String unidadMedida = rs.getString(7);
                String esInsumo = rs.getString(8);
                LocalDate fechaAlta = (rs.getDate(9)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(10)).toLocalDate();
                String estado = rs.getString(11);
                long idRubro = rs.getLong(12);

                artInsumo = new ArticuloInsumo(idArticulo, denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, idRubro, fechaAlta, fechaBaja, estado);

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

        return artInsumo; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL ART_INSUMO:
    public List<ArticuloInsumo> buscarAllArtInsumo() {

        Connection conexion = null;
        Conexion con = new Conexion();
        ArticuloInsumo artInsumo = null;
        List<ArticuloInsumo> listaArtInsumo = new ArrayList<ArticuloInsumo>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM articulo_insumo");

            rs = ps.executeQuery();

            while (rs.next()) {

                long idArticulo = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String denominacion = rs.getString(2);
                double precioCompra = rs.getDouble(3);
                double precioVenta = rs.getDouble(4);
                double stockActual = rs.getDouble(5);
                double stockMinimo = rs.getDouble(6);
                String unidadMedida = rs.getString(7);
                String esInsumo = rs.getString(8);
                LocalDate fechaAlta = (rs.getDate(9)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(10)).toLocalDate();
                String estado = rs.getString(11);
                long idRubro = rs.getLong(12);

                artInsumo = new ArticuloInsumo(idArticulo,denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, idRubro, fechaAlta, fechaBaja, estado);

                listaArtInsumo.add(artInsumo);

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

        return listaArtInsumo; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO ART_INSUMO A TRAVES DE UPDATE:
    
    public void eliminarLogicoArtInsumo(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE articulo_insumo SET fechaBaja = ?, estado = ?  WHERE idArticulo = ? ");

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
