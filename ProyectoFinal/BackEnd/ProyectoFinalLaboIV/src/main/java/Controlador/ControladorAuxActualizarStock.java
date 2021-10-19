package Controlador;

import Conexion.Conexion;
import Modelo.AuxActualizarStock;
import java.sql.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;



public class ControladorAuxActualizarStock {
    
    //METODO OBTENER DATOS RELACION INNER JOIN:
    public List<AuxActualizarStock> actualizarStock(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxActualizarStock auxStock = null;
        List<AuxActualizarStock> lista = new ArrayList<AuxActualizarStock>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT dPedido.cantidad AS CantidadArt, art.denominacion AS Producto, insumo.denominacion AS Insumo, dArtIns.cantidad AS CantidadInsumo,\n" +
                                            "insumo.stockActual AS stockActual, dArtIns.idArticuloInsumo AS idInsumo FROM pedido AS p INNER JOIN detalle_pedido AS dPedido ON\n" +
                                            "p.idPedido = dPedido.idPedido INNER JOIN articulo_manufacturado AS art ON\n" +
                                            "dPedido.idArtManufacturado = art.idArticulo INNER JOIN articulo_manufacturado_detalle AS dArtIns ON\n" +
                                            "art.idArticulo = dArtIns.idArticuloManufacturado INNER JOIN articulo_insumo AS insumo ON\n" +
                                            "dArtIns.idArticuloInsumo = insumo.idArticulo WHERE p.idPedido = ?;");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            while (rs.next()) { //si nos devuelve un dato true

                int cantidadArticulo = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String articulo = rs.getString(2);
                String insumo = rs.getString(3);
                int cantidadInsumo = rs.getInt(4);
                double stockActual = rs.getDouble(5);
                long idInsumo = rs.getLong(6);
                
                

                auxStock = new AuxActualizarStock(cantidadArticulo, articulo, insumo, cantidadInsumo, stockActual, idInsumo);

                lista.add(auxStock);
                
                //System.out.println("El Registro fue encontrado con exito.");
                //JOptionPane.showMessageDialog(null, "El Registro fue encontrado con exito.");


            }
           
            
            conexion.close();
            
            //Actualizar Stock =>
            lista = descontarStock(lista);
            

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
        
        return lista; //devolvemos el alumno encontrado
    }
    
    //Metodo que permite descontar el Stock =>
    public List<AuxActualizarStock> descontarStock(List<AuxActualizarStock> lista){
        
        double stockActualizado = 0;
        ControladorArticuloInsumo controlador = new ControladorArticuloInsumo();
        
        
        
        for(AuxActualizarStock item: lista){
            
            stockActualizado = item.getStockActual() - (item.getCantidadArticulo() * item.getCantidadInsumo());
            controlador.actualizarArtInsumoStock(stockActualizado, item.getIdInsumo());
            item.setStockActual(stockActualizado);
                
        }
        
        return lista;
        
    }
    
}
