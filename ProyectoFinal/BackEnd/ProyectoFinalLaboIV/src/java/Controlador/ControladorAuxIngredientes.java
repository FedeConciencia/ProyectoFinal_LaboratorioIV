
package Controlador;

import Conexion.Conexion;
import Modelo.ArticuloManufacturado;
import Modelo.AuxIngredientes;
import java.sql.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;


public class ControladorAuxIngredientes {
    
    //METODO OBTENER DATOS RELACION INNER JOIN:
    public List<AuxIngredientes> buscarIngredientes(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxIngredientes auxIngredientes = null;
        List<AuxIngredientes> listaIngredientes = new ArrayList<AuxIngredientes>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT manuf.denominacion AS NombreArt, manuf.precioVenta AS PrecioVenta, manuf.tiempoEstimado AS Tiempo\n" +
                                            ", manfDet.cantidad AS Cantidad, manfDet.unidadMedida AS UnidadMedida, insumo.denominacion AS NombreInsum\n" +
                                            "FROM articulo_manufacturado AS manuf INNER JOIN articulo_manufacturado_detalle AS manfDet\n" +
                                            "ON manuf.idArticulo = manfDet.idArticuloManufacturado INNER JOIN articulo_insumo AS insumo\n" +
                                            "ON manfDet.idArticuloInsumo = insumo.idArticulo WHERE manuf.idArticulo = ? GROUP BY insumo.denominacion;");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            while (rs.next()) { //si nos devuelve un dato true

                String denominacionArtManuf = rs.getString(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                double precioVenta = rs.getDouble(2);
                int tiempoEstimado = rs.getInt(3);
                double cantidad = rs.getDouble(4);
                String unidadMedida = rs.getString(5);
                String denominacionArtInsumo = rs.getString(6);
                

                auxIngredientes = new AuxIngredientes(denominacionArtManuf, precioVenta, tiempoEstimado, cantidad, unidadMedida, denominacionArtInsumo);

                listaIngredientes.add(auxIngredientes);
                
                //System.out.println("El Registro fue encontrado con exito.");
                //JOptionPane.showMessageDialog(null, "El Registro fue encontrado con exito.");


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

        return listaIngredientes; //devolvemos el alumno encontrado
    }
    
    
}
