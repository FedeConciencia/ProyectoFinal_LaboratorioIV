
package Controlador;

import Conexion.Conexion;
import Modelo.Factura;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorFactura {
    
    
    //METODO PARA INSERTAR FACTURA:
    public void insertarFactura(Factura factura) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO factura (codigo, montoDescuento, formaPago, totalVenta, fechaAlta, fechaBaja, estado, idPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, factura.getCodigo());
            ps.setDouble(2, factura.getMontoDescuento());
            ps.setString(3, factura.getFormaPago());
            ps.setDouble(4, factura.getTotalVenta());
            ps.setDate(5, Date.valueOf(factura.getFechaAlta()));
            ps.setDate(6, Date.valueOf(factura.getFechaBaja()));
            ps.setString(7, factura.getEstado());
            ps.setLong(8, factura.getIdPedido());

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

    //METODO PARA GESTIONAR ACTUALIZACION FACTURA:
    public void actualizarFactura(Factura factura) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE factura SET codigo = ?, montoDescuento = ?, formaPago = ?, totalVenta = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idPedido = ?  WHERE idFactura = ? ");

            ps.setString(1, factura.getCodigo());
            ps.setDouble(2, factura.getMontoDescuento());
            ps.setString(3, factura.getFormaPago());
            ps.setDouble(4, factura.getTotalVenta());
            ps.setDate(5, Date.valueOf(factura.getFechaAlta()));
            ps.setDate(6, Date.valueOf(factura.getFechaBaja()));
            ps.setString(7, factura.getEstado());
            ps.setLong(8, factura.getIdPedido());
            ps.setLong(9, factura.getIdFactura());

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

    //METODO ELIMINAR FACTURA:
    public void eliminarFactura(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM factura WHERE idFactura = ?");

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

    //METODO BUSCAR ONE FACTURA:
    public Factura buscarOneFactura(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Factura factura = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM factura WHERE idFactura = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idFactura = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                double montoDescuento = rs.getDouble(3);
                String formaPago = rs.getString(4);
                double totalVenta = rs.getDouble(5);
                Long idPedido = rs.getLong(6);
                LocalDate fechaAlta = (rs.getDate(7)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(8)).toLocalDate();
                String estado = rs.getString(9);

                factura = new Factura(idFactura, codigo, montoDescuento, formaPago, totalVenta, idPedido, fechaAlta, fechaBaja, estado);

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

        return factura; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL FACTURA:
    public List<Factura> buscarAllFactura() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Factura factura = null;
        List<Factura> listaFactura = new ArrayList<Factura>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM factura");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idFactura = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                double montoDescuento = rs.getDouble(3);
                String formaPago = rs.getString(4);
                double totalVenta = rs.getDouble(5);
                Long idPedido = rs.getLong(6);
                LocalDate fechaAlta = (rs.getDate(7)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(8)).toLocalDate();
                String estado = rs.getString(9);

                factura = new Factura(idFactura, codigo, montoDescuento, formaPago, totalVenta, idPedido, fechaAlta, fechaBaja, estado);

                listaFactura.add(factura);

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

        return listaFactura; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO FACTURA A TRAVES DE UPDATE:
    
    public void eliminarLogicoFactura(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE factura SET fechaBaja = ?, estado = ?  WHERE idFactura = ? ");

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
