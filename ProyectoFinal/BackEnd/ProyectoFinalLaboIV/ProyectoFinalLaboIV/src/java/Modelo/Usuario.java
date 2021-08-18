
package Modelo;

import java.time.LocalDate;


public class Usuario extends EstadoEntidad {
    
    //Variables de Clase:
    
    private Long idUsuario;
    private String usuario;
    private String contraseña;
    private String rol;
    private Long idCliente;
    
    
    //Variables de Relacion Bidireccional (1:1) con Clase Cliente:
    
    private Cliente cliente;

   
    //Constructores:

    public Usuario() {
    }

    public Usuario(Long idUsuario, String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }

    public Usuario(Long idUsuario, String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }

    public Usuario(Long idUsuario, String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }

    public Usuario(String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta) {
        super(fechaAlta);
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }

    public Usuario(String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }

    public Usuario(String usuario, String contraseña, String rol, Long idCliente, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.idCliente = idCliente;
    }
    
    

    //Metodos Accesores (Getters and Setters):

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    
    
    //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdUsuario: " + idUsuario + "\nUsuario: " + usuario + "\nContraseña: " + 
                contraseña + "\nRol: " + rol + "\nIdCliente: " + idCliente +
                "\nFechaAlta: " + fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
    

    
    
    
    
    

    
    
    
    
    
    
    
    
    
}
