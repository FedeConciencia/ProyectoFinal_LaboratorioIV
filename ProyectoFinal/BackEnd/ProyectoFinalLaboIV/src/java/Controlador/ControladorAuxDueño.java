
package Controlador;

import Conexion.Conexion;
import Modelo.AuxDueño;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class ControladorAuxDueño {
    
    
    //OBTENER RANKING DE COMIDAS POR FECHAS:
    public List<AuxDueño> buscarRankingComidas(String date1, String date2) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxDueño auxDueño = null;
        List<AuxDueño> listaAuxDueño = new ArrayList<AuxDueño>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT a.denominacion AS Comida, sum(d.cantidad) AS Cantidad FROM detalle_pedido AS d INNER JOIN\n" +
                                            "articulo_manufacturado AS a ON d.idArtManufacturado = a.idArticulo INNER JOIN pedido AS p ON\n" +
                                            "d.idPedido = p.idPedido WHERE p.fechaAlta BETWEEN ? AND ? \n" +
                                            "GROUP BY a.denominacion ORDER BY Cantidad desc;");
            
            
            ps.setString(1, date1); 
            ps.setString(2, date2); 

            rs = ps.executeQuery();

            while (rs.next()) {

                String denominacionComida = rs.getString(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidadComida = rs.getInt(2);
                

                auxDueño = new AuxDueño(denominacionComida, cantidadComida);

                listaAuxDueño.add(auxDueño);

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

        return listaAuxDueño; //devolvemos la lista de alumnos encontrado

    }
    
}
