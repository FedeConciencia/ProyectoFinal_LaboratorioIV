package Controlador;

import Conexion.Conexion;
import Modelo.ArticuloManufacturado;
import java.sql.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

/**
 *
 * @author El Juanelo
 */
public class ControladorArticuloManufacturado {
    
    public void insertarArticuloManufacturado(ArticuloManufacturado artManufacturado){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO articulo_manufacturado (tiempoEstimado, denominacion, precioVenta, imagen, fechaAlta, fechaBaja, estado, idRubro) "
                + "VALUES (?,?,?,?,?,?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setInt(1, artManufacturado.getTiempoEstimado());
            preparedStatement.setString(2, artManufacturado.getDenominacion());
            preparedStatement.setDouble(3, artManufacturado.getPrecioVenta());
            preparedStatement.setString(4, artManufacturado.getImagen());
            preparedStatement.setDate(5, Date.valueOf(artManufacturado.getFechaAlta()));
            preparedStatement.setDate(6, Date.valueOf(artManufacturado.getFechaBaja()));
            preparedStatement.setString(7, artManufacturado.getEstado());
            preparedStatement.setLong(8, artManufacturado.getIdRubroGeneral());
            
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
    
    public void actualizarArticuloManufacturado(ArticuloManufacturado artManufacturado){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE articulo_manufacturado SET tiempoEstimado = ?, denominacion = ?, precioVenta = ?, imagen = ?, fechaAlta = ?, "
                + "fechaBaja = ?, estado = ? WHERE idArticulo = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setInt(1, artManufacturado.getTiempoEstimado());
            preparedStatement.setString(2, artManufacturado.getDenominacion());
            preparedStatement.setDouble(3, artManufacturado.getPrecioVenta());
            preparedStatement.setString(4, artManufacturado.getImagen());
            preparedStatement.setDate(5, Date.valueOf(artManufacturado.getFechaAlta()));
            preparedStatement.setDate(6, Date.valueOf(artManufacturado.getFechaBaja()));
            preparedStatement.setString(7, artManufacturado.getEstado());
            preparedStatement.setLong(8, artManufacturado.getIdArticulo());
            
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
    
    public void eliminarArticuloManufacturado(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "DELETE FROM articulo_manufacturado WHERE idArticulo = ?";
        
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
    
    public void eliminarLogicoArticuloManufacturado(long id, LocalDate fecha) {
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE articulo_manufacturado SET fechaBaja = ?, estado = ? WHERE idArticulo = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setDate(1, Date.valueOf(fecha));
            preparedStatement.setString(2, "inactivo");
            preparedStatement.setLong(3, id);
            
            int resultado = preparedStatement.executeUpdate();
            
            if(resultado > 0)
                System.out.println("El Registro fue eliminado(Lógico) con éxito.");
            else
                System.out.println("Fallo en eliminar Registro.");
            
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la baja lógica.\n\t" + ex.getMessage());
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
    
    public ArticuloManufacturado buscarOneArticuloManufacturado(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_manufacturado WHERE idArticulo = ?";
        ResultSet resultSet = null;
        
        ArticuloManufacturado artManufacturado = null;
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setLong(1, id);
            
            resultSet = preparedStatement.executeQuery();
            
            if(resultSet.next()){
                long idArticulo = resultSet.getLong(1);
                int tiempoEstimado = resultSet.getInt(2);
                String denominacion = resultSet.getString(3);
                double precioVenta = resultSet.getDouble(4);
                String imagen = resultSet.getString(5);
                LocalDate fechaAlta = resultSet.getDate(6).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(7).toLocalDate();
                String estado = resultSet.getString(8);
                long idRubro = resultSet.getLong(9);
                
                artManufacturado = new ArticuloManufacturado(idArticulo, tiempoEstimado, denominacion, idRubro, precioVenta, imagen, fechaAlta, fechaBaja, estado);
                
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
        
        return artManufacturado;
    }
    
    public List<ArticuloManufacturado> buscarAllArticuloManufacturado(){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM articulo_manufacturado";
        ResultSet resultSet = null;
        
        ArticuloManufacturado artManufacturado = null;
        List<ArticuloManufacturado> listaArtMan = new ArrayList<>();
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            resultSet = preparedStatement.executeQuery();
            
            while(resultSet.next()){
                long idArticulo = resultSet.getLong(1);
                int tiempoEstimado = resultSet.getInt(2);
                String denominacion = resultSet.getString(3);
                double precioVenta = resultSet.getDouble(4);
                String imagen = resultSet.getString(5);
                LocalDate fechaAlta = resultSet.getDate(6).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(7).toLocalDate();
                String estado = resultSet.getString(8);
                long idRubro = resultSet.getLong(9);
                
                artManufacturado = new ArticuloManufacturado(idArticulo, tiempoEstimado, denominacion, idRubro, precioVenta, imagen, fechaAlta, fechaBaja, estado);
                
                listaArtMan.add(artManufacturado);
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
