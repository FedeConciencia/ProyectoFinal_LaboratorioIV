package Modelo;

import java.time.LocalDate;


public class Domicilio extends EstadoEntidad {
    
    //Variables de Clase:
    
    private Long idDomicilio;
    private String calle;
    private String numero;
    private String localidad;
    private Long idCliente;
    
    
    //Variables de Relacion Bidireccional (1:N) con Clase Cliente:
    
    private Cliente cliente;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Pedido:
    
    private Pedido pedido;
    
    //Constructores:

    public Domicilio() {
    }

    public Domicilio(Long idDomicilio, String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idDomicilio = idDomicilio;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }

    public Domicilio(Long idDomicilio, String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idDomicilio = idDomicilio;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }

    public Domicilio(Long idDomicilio, String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idDomicilio = idDomicilio;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }

    public Domicilio(String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta) {
        super(fechaAlta);
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }

    public Domicilio(String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }

    public Domicilio(String calle, String numero, String localidad, Long idCliente, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.idCliente = idCliente;
    }
    
    //Metodos Accesores (Getters and Setters):

    public Long getIdDomicilio() {
        return idDomicilio;
    }

    public void setIdDomicilio(Long idDomicilio) {
        this.idDomicilio = idDomicilio;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
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

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    
    
    
    //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdDomicilio: " + idDomicilio + "\nCalle: " + calle + "\nNumero: " + numero + 
                "\nLocalidad: " + localidad + "\nIdCliente: " + idCliente + "\nFechaAlta: " + 
                fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
    
    
    
    
}

