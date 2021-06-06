package Controlador;

import Conexion.Conexion;
import Modelo.RubroGeneral;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Date;
import java.time.LocalDate;

/**
 *
 * @author El Juanelo
 */
public class ControladorRubroGeneral {
    
    public void insertarRubroGeneral(RubroGeneral rubroGeneral){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO rubro_general (denominacion, fechaAlta, fechaBaja, estado) "
                + "VALUES (?,?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, rubroGeneral.getDenominacion());
            preparedStatement.setDate(2, Date.valueOf(rubroGeneral.getFechaAlta()));
            preparedStatement.setDate(3, Date.valueOf(rubroGeneral.getFechaBaja()));
            preparedStatement.setString(4, rubroGeneral.getEstado());
            
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
    
    public void actualizarRubroGeneral(RubroGeneral rubroGeneral){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE rubro_general SET denominacion = ?, fechaAlta = ?, fechaBaja = ?, estado = ? "
                + " WHERE idRubro = ?";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setString(1, rubroGeneral.getDenominacion());
            preparedStatement.setDate(2, Date.valueOf(rubroGeneral.getFechaAlta()));
            preparedStatement.setDate(3, Date.valueOf(rubroGeneral.getFechaBaja()));
            preparedStatement.setString(4, rubroGeneral.getEstado());
            preparedStatement.setLong(5, rubroGeneral.getIdRubro());
            
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
    
    public void eliminarRubroGeneral(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "DELETE FROM rubro_general WHERE idRubro = ?";
        
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
    
    public void eliminarLogicoRubroGeneral(long id, LocalDate fecha){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "UPDATE rubro_general SET fechaBaja = ?, estado = ? WHERE idRubro = ?";
        
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
    
    public RubroGeneral buscarOneRubroGeneral(long id){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM rubro_general WHERE idRubro = ?";
        ResultSet resultSet = null;
        
        RubroGeneral rubro = null;
        
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
                
                rubro = new RubroGeneral(idRubro, denominacion, fechaAlta, fechaBaja, estado);
                
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
        
        return rubro;
    }
    
    public List<RubroGeneral> buscarAllRubroGeneral(){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "SELECT * FROM rubro_general";
        ResultSet resultSet = null;
        
        RubroGeneral rubro = null;
        List<RubroGeneral> listaArtMan = new ArrayList<>();
        
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
                
                rubro = new RubroGeneral(idRubro, denominacion, fechaAlta, fechaBaja, estado);
                
                listaArtMan.add(rubro);
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
