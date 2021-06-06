package Controlador;

import Conexion.Conexion;
import Modelo.Configuracion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author El Juanelo
 */
public class ControladorConfiguracion {
    
    public void insertarConfiguracion(Configuracion configuracion){
        
        Connection conexion = null;
        PreparedStatement preparedStatement = null;
        String consulta = "INSERT INTO configuracion (cantidadCocineros, emailEmpresa, tokenMercadoPago) "
                + "VALUES (?,?,?)";
        
        try{
            conexion = (new Conexion()).getConnection();
            preparedStatement = conexion.prepareStatement(consulta);
            
            preparedStatement.setDouble(1, configuracion.getCantidadCocineros());
            preparedStatement.setString(2, configuracion.getEmailEmpresa());
            preparedStatement.setString(3, configuracion.getTokenMercadoPago());
            
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
    // NO LO CONTINÚO PORQUE NO SE COMO VA A SER EXACTAMENTE LA TABLA
}
