package Controlador;

import Conexion.Conexion;
import Modelo.RubroArticulo;
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
public class ControladorRubroArticulo {
    
    public void insertarRubroArticulo(RubroArticulo rubroArticulo){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO rubro_articulo (denominacion, fechaAlta, fechaBaja, estado) "
                + "VALUES (?,?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, rubroArticulo.getDenominacion());
            preparedStatement.setDate(2, Date.valueOf(rubroArticulo.getFechaAlta()));
            preparedStatement.setDate(3, Date.valueOf(rubroArticulo.getFechaBaja()));
            preparedStatement.setString(4, rubroArticulo.getEstado());
            
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
    
    public void actualizarRubroArticulo(RubroArticulo rubroArticulo){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE rubro_articulo SET denominacion = ?, fechaAlta = ?, fechaBaja = ?, estado = ? WHERE idRubro = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, rubroArticulo.getDenominacion());
            preparedStatement.setDate(2, Date.valueOf(rubroArticulo.getFechaAlta()));
            preparedStatement.setDate(3, Date.valueOf(rubroArticulo.getFechaBaja()));
            preparedStatement.setString(4, rubroArticulo.getEstado());
            preparedStatement.setLong(5, rubroArticulo.getIdRubro());
            
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
    
    public void eliminarRubroArticulo(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "DELETE FROM rubro_articulo WHERE idRubro = ?";
        
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
    
    public void eliminarLogicoRubroArticulo(long id, LocalDate fecha) {

        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE rubro_articulo SET fechaBaja = ?, estado = ?  WHERE idRubro = ? ";

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
    
    public RubroArticulo buscarOneRubroArticulo(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM rubro_articulo WHERE idRubro = ?";
        ResultSet resultSet = null;
        
        RubroArticulo rubroArticulo = null;
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setLong(1, id);
            
            resultSet = preparedStatement.executeQuery();
            
            if(resultSet.next()){
                long idRubro = resultSet.getLong(1);
                String denominacion = resultSet.getString(2);
                LocalDate fechaAlta = resultSet.getDate(3).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(4).toLocalDate();
                String estado = resultSet.getString(5);
                
                rubroArticulo = new RubroArticulo(idRubro, denominacion, fechaAlta, fechaBaja, estado);
                
                System.out.println("El Registro fue encontrado con éxito.");
            }
            else{
                System.out.println("El Registro no fue encontrado.");
            }
            
            resultSet.close();
            preparedStatement.close();
            conexion.close();
            
        } catch(SQLException ex){
            System.out.println("Error en la búsqueda.\n\t" + ex.getMessage());
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
        
        return rubroArticulo;
    }
    
    public List<RubroArticulo> buscarAllRubroArticulo(){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM rubro_articulo";
        ResultSet resultSet = null;
        
        RubroArticulo rubroArticulo = null;
        List<RubroArticulo> listaRubroArticulo = new ArrayList<>();
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            resultSet = preparedStatement.executeQuery();
            
            while(resultSet.next()){
                long idRubro = resultSet.getLong(1);
                String denominacion = resultSet.getString(2);
                LocalDate fechaAlta = resultSet.getDate(3).toLocalDate();
                LocalDate fechaBaja = resultSet.getDate(4).toLocalDate();
                String estado = resultSet.getString(5);
                
                rubroArticulo = new RubroArticulo(idRubro, denominacion, fechaAlta, fechaBaja, estado);
                
                listaRubroArticulo.add(rubroArticulo);
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
        
        return listaRubroArticulo;
    }
    
}
