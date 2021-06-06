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

/**
 *
 * @author El Juanelo
 */
public class ControladorArticuloInsumo {
    
    public void insertarArticuloInsumo(ArticuloInsumo articuloInsumo){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO articulo_insumo (denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, "
                + "esInsumo, fechaAlta, fechaBaja, estado, idRubro) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, articuloInsumo.getDenominacion());
            preparedStatement.setDouble(2, articuloInsumo.getPrecioCompra());
            preparedStatement.setDouble(3, articuloInsumo.getPrecioVenta());
            preparedStatement.setDouble(4, articuloInsumo.getStockActual());
            preparedStatement.setDouble(5, articuloInsumo.getStockMinimo());
            preparedStatement.setString(6, articuloInsumo.getUnidadMedida());
            preparedStatement.setString(7, articuloInsumo.getEsInsumo());
            preparedStatement.setDate(8, Date.valueOf(articuloInsumo.getFechaAlta()));
            preparedStatement.setDate(9, Date.valueOf(articuloInsumo.getFechaBaja()));
            preparedStatement.setString(10, articuloInsumo.getEstado());
            preparedStatement.setLong(11, articuloInsumo.getIdRubroArticulo());
            
            int resultado = preparedStatement.executeUpdate();
            
            if(resultado > 0)
                System.out.println("El Registro fue guardado con éxito.");
            else
                System.out.println("El Registro falló en ser guardado.");
            
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la inserción.\n\t" + ex.getMessage());
        }
        finally{
            try{
                preparedStatement.close();
                conexion.close();
            } catch(SQLException ex){
                System.out.println("Error.\n\t"+ ex.getMessage());
            }
        }
    }
    
    public void actualizarArticuloInsumo(ArticuloInsumo articuloInsumo){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE articulo_insumo SET denominacion = ?, precioCompra = ?, precioVenta = ?, stockActual = ?, stockMinimo = ?, "
                + "unidadMedida = ?, esInsumo = ?, fechaAlta = ?, fechaBaja = ?, estado = ?, idRubro = ? WHERE idArticulo = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, articuloInsumo.getDenominacion());
            preparedStatement.setDouble(2, articuloInsumo.getPrecioCompra());
            preparedStatement.setDouble(3, articuloInsumo.getPrecioVenta());
            preparedStatement.setDouble(4, articuloInsumo.getStockActual());
            preparedStatement.setDouble(5, articuloInsumo.getStockMinimo());
            preparedStatement.setString(6, articuloInsumo.getUnidadMedida());
            preparedStatement.setString(7, articuloInsumo.getEsInsumo());
            preparedStatement.setDate(8, Date.valueOf(articuloInsumo.getFechaAlta()));
            preparedStatement.setDate(9, Date.valueOf(articuloInsumo.getFechaBaja()));
            preparedStatement.setString(10, articuloInsumo.getEstado());
            preparedStatement.setLong(11, articuloInsumo.getIdRubroArticulo());
            preparedStatement.setLong(12, articuloInsumo.getIdArticuloInsumo());
            
            int resultado = preparedStatement.executeUpdate();
            
            if(resultado > 0)
                System.out.println("El Registro fue actualizado con éxito.");
            else
                System.out.println("El Registro falló en ser actualizado.");
            
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la inserción.\n\t" + ex.getMessage());
        }
        finally{
            try{
                preparedStatement.close();
                conexion.close();
            } catch(SQLException ex){
                System.out.println("Error.\n\t"+ ex.getMessage());
            }
        }
    }
    
    public void eliminarArticuloInsumo(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "DELETE FROM articulo_insumo WHERE idArticulo = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setLong(1, id);
            
            int resultado = preparedStatement.executeUpdate();
            
            if(resultado > 0)
                System.out.println("El Registro fue eliminado con éxito.");
            else
                System.out.println("Fallo en eliminar Registro.");
            
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la inserción.\n\t" + ex.getMessage());
        }
        finally{
            try{
                preparedStatement.close();
                conexion.close();
            } catch(SQLException ex){
                System.out.println("Error.\n\t"+ ex.getMessage());
            }
        }
    }
    
    public void eliminarLogicoArticuloInsumo(long id, LocalDate fecha) {

        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE articulo_insumo SET fechaBaja = ?, estado = ?  WHERE idArticulo = ? ";

        try {

            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);

            preparedStatement.setDate(1, Date.valueOf(fecha));
            preparedStatement.setString(2, "inactivo");
            preparedStatement.setLong(3, id);
           

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = preparedStatement.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado (Logico) de la Base de Datos.");
            } else {

                System.out.println("Error al intentar actualizar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (SQLException ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                preparedStatement.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }
    }
    
    public ArticuloInsumo buscarOneArticuloInsumo(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_insumo WHERE idArticulo = ?";
        ResultSet resultSet = null;
        
        ArticuloInsumo articuloInsumo = null;
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setLong(1, id);
            
            resultSet = preparedStatement.executeQuery();
            
            if(resultSet.next()){
                long idArticulo = resultSet.getLong(1);
                String denominacion = resultSet.getString(2);
                double precioCompra = resultSet.getDouble(3);
                double precioVenta = resultSet.getDouble(4);
                double stockActual = resultSet.getDouble(5);
                double stockMinimo = resultSet.getDouble(6);
                String unidadMedida = resultSet.getString(7);
                String esInsumo = resultSet.getString(8);
                LocalDate fechaAlta = resultSet.getDate(9).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(10).toLocalDate();
                String estado = resultSet.getString(11);
                long idRubro = resultSet.getLong(12);
                
                articuloInsumo = new ArticuloInsumo(idArticulo, denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, idRubro, fechaAlta, fechaBaja, estado);
                
                System.out.println("El Registro fue encontrado con éxito.");
            }
            else{
                System.out.println("El Registro no fue encontrado.");
            }
            
            resultSet.close();
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la inserción.\n\t" + ex.getMessage());
        }
        finally{
            try{
                resultSet.close();
                preparedStatement.close();
                conexion.close();
            } catch(SQLException ex){
                System.out.println("Error.\n\t"+ ex.getMessage());
            }
        }
        
        return articuloInsumo;
    }
    
    public List<ArticuloInsumo> buscarAllArticuloInsumo(){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_insumo";
        ResultSet resultSet = null;
        
        ArticuloInsumo articuloInsumo = null;
        List<ArticuloInsumo> listaArticuloInsumo = new ArrayList<>();
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            resultSet = preparedStatement.executeQuery();
            
            while(resultSet.next()){
                long idArticulo = resultSet.getLong(1);
                String denominacion = resultSet.getString(2);
                double precioCompra = resultSet.getDouble(3);
                double precioVenta = resultSet.getDouble(4);
                double stockActual = resultSet.getDouble(5);
                double stockMinimo = resultSet.getDouble(6);
                String unidadMedida = resultSet.getString(7);
                String esInsumo = resultSet.getString(8);
                LocalDate fechaAlta = resultSet.getDate(9).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(10).toLocalDate();
                String estado = resultSet.getString(11);
                long idRubro = resultSet.getLong(12);
                
                articuloInsumo = new ArticuloInsumo(idArticulo, denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, idRubro, fechaAlta, fechaBaja, estado);
                
                listaArticuloInsumo.add(articuloInsumo);
            }
            
            resultSet.close();
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la inserción.\n\t" + ex.getMessage());
        }
        finally{
            try{
                resultSet.close();
                preparedStatement.close();
                conexion.close();
            } catch(SQLException ex){
                System.out.println("Error.\n\t"+ ex.getMessage());
            }
        }
        
        return listaArticuloInsumo;
    }
    
}
