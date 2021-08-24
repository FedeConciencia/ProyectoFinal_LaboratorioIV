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

/**
 *
 * @author El Juanelo
 */
public class ControladorArticuloManufacturadoDetalle {
    
    public void insertarArticuloManufacturadoDetalle(ArticuloManufacturadoDetalle artManufacturado){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO articulo_manufacturado_detalle (cantidad, idArticuloManufacturado, idArticuloInsumo) "
                + "VALUES (?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setDouble(1, artManufacturado.getCantidad());
            preparedStatement.setLong(2, artManufacturado.getIdArticuloManufacturado());
            preparedStatement.setLong(3, artManufacturado.getIdArticuloInsumo());
            
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
    
    public void actualizarArticuloManufacturadoDetalle(ArticuloManufacturadoDetalle artManufacturado){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE articulo_manufacturado_detalle SET cantidad = ?, idArticuloManufacturado = ?, idArticuloInsumo = ? "
                + " WHERE idArticuloDetalle = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setDouble(1, artManufacturado.getCantidad());
            preparedStatement.setLong(2, artManufacturado.getIdArticuloManufacturado());
            preparedStatement.setLong(3, artManufacturado.getIdArticuloInsumo());
            preparedStatement.setLong(4, artManufacturado.getIdArticuloDetalle());
            
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
    
    public void eliminarArticuloManufacturadoDetalle(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "DELETE FROM articulo_manufacturado_detalle WHERE idArticuloDetalle = ?";
        
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
        
    public ArticuloManufacturadoDetalle buscarOneArticuloManufacturadoDetalle(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_manufacturado_detalle WHERE idArticuloDetalle = ?";
        ResultSet resultSet = null;
        
        ArticuloManufacturadoDetalle articuloDetalle = null;
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setLong(1, id);
            
            resultSet = preparedStatement.executeQuery();
            
            if(resultSet.next()){
                long idArticuloDetalle = resultSet.getLong(1);
                int cantidad = resultSet.getInt(2);
                long idArticuloManufacturado = resultSet.getLong(3);
                long idArticuloInsumo = resultSet.getLong(4);
                
                articuloDetalle = new ArticuloManufacturadoDetalle(idArticuloDetalle, cantidad, idArticuloManufacturado, idArticuloInsumo, null, null);
                
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
        
        return articuloDetalle;
    }
    
    public List<ArticuloManufacturadoDetalle> buscarAllArticuloManufacturadoDetalle(){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_manufacturado_detalle";
        ResultSet resultSet = null;
        
        ArticuloManufacturadoDetalle articuloDetalle = null;
        List<ArticuloManufacturadoDetalle> listaArtMan = new ArrayList<>();
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            resultSet = preparedStatement.executeQuery();
            
            while(resultSet.next()){
                long idArticuloDetalle = resultSet.getLong(1);
                int cantidad = resultSet.getInt(2);
                long idArticuloManufacturado = resultSet.getLong(3);
                long idArticuloInsumo = resultSet.getLong(4);
                
                articuloDetalle = new ArticuloManufacturadoDetalle(idArticuloDetalle, cantidad, idArticuloManufacturado, idArticuloInsumo, null, null);
                
                listaArtMan.add(articuloDetalle);
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
        
        return listaArtMan;
    }
}
