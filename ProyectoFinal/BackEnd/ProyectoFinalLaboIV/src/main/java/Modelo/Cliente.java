package Modelo;

import java.time.LocalDate;
import java.util.List;


public class Cliente extends EstadoEntidad {
    
    //Variables/Atributos de clase:
    
    private long idCliente;
    private String nombre;
    private String apellido;
    private String dni;
    private LocalDate fechaNacimiento;
    private String telefono;
    private String email;
    
    //Variables de Relacion Bidireccional (1:1) con Clase Usuario:
    
    private Usuario usuario;
    
    //Variables de Relacion Bidireccional (1:1) con Clase Domicilio:
    
    private Domicilio domicilio;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Pedido:
    
    private List<Pedido> listaPedido;
    
    //Constructores:

    public Cliente() {
        
    }

    public Cliente(long idCliente, String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    public Cliente(long idCliente, String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    public Cliente(long idCliente, String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    public Cliente(String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta) {
        super(fechaAlta);
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    public Cliente(String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    public Cliente(String nombre, String apellido, String dni, LocalDate fechaNacimiento, String telefono, String email, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }

    

    //Metodos Accesores (Getters and Setters):

    public long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Domicilio getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(Domicilio domicilio) {
        this.domicilio = domicilio;
    }

    public List<Pedido> getListaPedido() {
        return listaPedido;
    }

    public void setListaPedido(List<Pedido> listaPedido) {
        this.listaPedido = listaPedido;
    }

  
  
     //Metodo de Muestra de Objeto:
    
    @Override
    public String toString() {
        return "\nIdCliente: " + idCliente + "\nNombre: " + nombre + "\nApellido: " + apellido + 
                "\nDni: " + dni + "\nFechaNacimiento: " + fechaNacimiento + "\nTelefono: " + telefono + 
                "\nEmail: " + email + "\nFechaAlta: " + fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    

    
}

