package Controlador;

import Conexion.Conexion;
import Modelo.Cliente;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControladorCliente {

    //METODO PARA INSERTAR CLIENTE:
    public void insertarCliente(Cliente cliente) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO cliente (nombre, apellido, dni, fechaNacimiento, telefono, email, fechaAlta, fechaBaja, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, cliente.getNombre());
            ps.setString(2, cliente.getApellido());
            ps.setString(3, cliente.getDni());
            ps.setDate(4, Date.valueOf(cliente.getFechaNacimiento()));
            ps.setString(5, cliente.getTelefono());
            ps.setString(6, cliente.getEmail());
            ps.setDate(7, Date.valueOf(cliente.getFechaAlta()));
            ps.setDate(8, Date.valueOf(cliente.getFechaBaja()));
            ps.setString(9, cliente.getEstado());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue insertado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue insertado con exito a la Base de Datos.");
                //out.print("<script>alert('El Registro fue insertado con exito a la Base de Datos.');<script>");
            } else {

                System.out.println("Error al intentar insertar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar insertar el registro.");
                //out.print("<script>alert('Error al intentar insertar el registro.');<script>");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);
            //out.print("<script>alert('Error de Conexion.');<script>");
        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
                //out.print("<script>alert('Error de Conexion.');<script>");
            }

        }
    }

    //METODO PARA GESTIONAR ACTUALIZACION CLIENTE:
    public void actualizarCliente(Cliente cliente) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE cliente SET nombre = ?, apellido = ?, dni = ?, fechaNacimiento = ?, telefono = ?, email = ?, fechaAlta = ?, fechaBaja = ?, estado = ?  WHERE idCliente = ? ");

            ps.setString(1, cliente.getNombre());
            ps.setString(2, cliente.getApellido());
            ps.setString(3, cliente.getDni());
            ps.setDate(4, Date.valueOf(cliente.getFechaNacimiento()));
            ps.setString(5, cliente.getTelefono());
            ps.setString(6, cliente.getEmail());
            ps.setDate(7, Date.valueOf(cliente.getFechaAlta()));
            ps.setDate(8, Date.valueOf(cliente.getFechaBaja()));
            ps.setString(9, cliente.getEstado());
            ps.setLong(10, cliente.getIdCliente());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue actualizado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue modificado con exito a la Base de Datos.");
            } else {

                System.out.println("Error al intentar actualizar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar modificar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO ELIMINAR CLIENTE:
    public void eliminarCliente(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM cliente WHERE idCliente = ?");

            ps.setLong(1, id); //Se puede usar indicando el primer signo de pregunta del qwery y alojar la variable

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue eliminado con exito a la Base de Datos.");
            } else {

                System.out.println("Error al intentar eliminar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar eliminar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO BUSCAR ONE CLIENTE:
    public Cliente buscarOneCliente(Long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Cliente cliente = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM cliente WHERE idCliente = ?");

            ps.setLong(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                Long idCliente = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                String apellido = rs.getString(3);
                String dni = rs.getString(4);
                LocalDate fechaNacimiento = (rs.getDate(5)).toLocalDate();
                String telefono = rs.getString(6);
                String email = rs.getString(7);
                LocalDate fechaAlta = (rs.getDate(8)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(9)).toLocalDate();
                String estado = rs.getString(10);

                cliente = new Cliente(idCliente, nombre, apellido, dni, fechaNacimiento, telefono, email, fechaAlta, fechaBaja, estado);

                System.out.println("El Registro fue encontrado con exito.");
                //JOptionPane.showMessageDialog(null, "El Registro fue encontrado con exito.");

            } else {

                System.out.println("El Registro no fue encontrado en la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro no fue encontrado en la Base de Datos.");
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

        return cliente; //devolvemos el alumno encontrado
    }
    
    //OBTENER ALL CLIENTES:
    public List<Cliente> buscarAllCliente() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Cliente cliente = null;
        List<Cliente> listaCliente = new ArrayList<Cliente>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM cliente");

            rs = ps.executeQuery();

            while (rs.next()) {

                Long idCliente = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                String apellido = rs.getString(3);
                String dni = rs.getString(4);
                LocalDate fechaNacimiento = (rs.getDate(5)).toLocalDate();
                String telefono = rs.getString(6);
                String email = rs.getString(7);
                LocalDate fechaAlta = (rs.getDate(8)).toLocalDate();
                LocalDate fechaBaja = (rs.getDate(9)).toLocalDate();
                String estado = rs.getString(10);

                cliente = new Cliente(idCliente, nombre, apellido, dni, fechaNacimiento, telefono, email, fechaAlta, fechaBaja, estado);

                listaCliente.add(cliente);

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

        return listaCliente; //devolvemos la lista de alumnos encontrado

    }
    
    //DELETE LOGICO CLIENTE A TRAVES DE UPDATE:
    
    public void eliminarLogicoCliente(Long id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE cliente SET fechaBaja = ?, estado = ?  WHERE idCliente = ? ");

            ps.setDate(1, Date.valueOf(fecha));
            ps.setString(2, "inactivo");
            ps.setLong(3, id);
           

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado (Logico) de la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue modificado con exito a la Base de Datos.");
            } else {

                System.out.println("Error al intentar actualizar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar modificar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }

    }
    
    //METODO PARA OBTENER EL ULTIMO IDCLIENTE INGRESADO Y LE SUME 1 (EL SIGUIENTE ID):
    
     public long buscarUltimoId() {

        Connection conexion = null;
        Conexion con = new Conexion();
        long idCliente = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT MAX(idCliente) FROM cliente");

            rs = ps.executeQuery();

            while (rs.next()) {

                idCliente = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                //idCliente++; //Incrementa en 1 el ultimo idCliente. Obteniendo el siguiente
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

        return idCliente; //devolvemos el ultimo id

    }
     
     
     //METODO PARA OBTENER EL PROXIMO ID A GENERARSE EN TABLA CLIENTE:
    
     public long proximoId() {

        Connection conexion = null;
        Conexion con = new Conexion();
        long idCliente = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        PreparedStatement ps1 = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.
            
            //Debemos ejecutar esta primer consulta para posteriormente ejecutar el segundo query:
            
            ps1 = conexion.prepareStatement("SET @@SESSION.information_schema_stats_expiry = 0");
            
            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps1.executeUpdate();
            
            ps = conexion.prepareStatement("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'proyectofinal' AND TABLE_NAME = 'cliente'");
                                           
            rs = ps.executeQuery();

            while (rs.next()) {

                idCliente = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                
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

        return idCliente; //devolvemos el ultimo id

    }
     
     
     //METODO PARA OBTENER IDCLIENTE INGRESADO EMAIL:
    
     public long buscarIdxEmail(String email) {

        Connection conexion = null;
        Conexion con = new Conexion();
        long idCliente = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT idCliente from cliente where email = ?");
            
            ps.setString(1, email);

            rs = ps.executeQuery();
            
            
            if(rs.next()) {

                idCliente = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                //idCliente++; //Incrementa en 1 el ultimo idCliente. Obteniendo el siguiente
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

        return idCliente; //devolvemos el ultimo id

    }
     
     
     //METODO PARA BUSCAR IDDOMICILIO INGRESADO IDCLIENTE:
    
     public long buscarDomicilioxIdCliente(long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        long idDomicilio = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT idDomicilio from domicilio where idCliente = ?");
            
            ps.setLong(1, id);

            rs = ps.executeQuery();
            
            
            if(rs.next()) {

                idDomicilio = rs.getLong(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                //idCliente++; //Incrementa en 1 el ultimo idCliente. Obteniendo el siguiente
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

        return idDomicilio; //devolvemos el ultimo id

    }
     


}

