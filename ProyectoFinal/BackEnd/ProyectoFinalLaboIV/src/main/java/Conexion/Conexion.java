package Conexion;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {

    public String URL = "jdbc:mysql://localhost:3306/proyectofinal?autoReconnect=true&useSSL=false";
    public String usuario = "root";
    public String contraseña = "12345";

    public Connection getConnection() {  //Metodo para gestionar la conexion.

        Connection conexion = null;

        try {

            Class.forName("com.mysql.jdbc.Driver");
            conexion = (Connection) DriverManager.getConnection(URL, usuario, contraseña);
            //JOptionPane.showMessageDialog(null, "La conexion fue Exitosa."); No hace falta el metodo.
        } catch (Exception ex) {

            System.out.println("Error. " + ex);
        }

        return conexion;
    }

}

