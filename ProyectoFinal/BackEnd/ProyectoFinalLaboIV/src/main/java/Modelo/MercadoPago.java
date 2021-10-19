package Modelo;

import java.time.LocalDate;


public class MercadoPago extends EstadoEntidad {
    
    //Variables de Clase:
    
    private Long idMercadoPago;
    private String codigo;
    private LocalDate fechaAprobacion;
    private String metodoPago;
    private String numeroTarjeta;
    private Long idPedido;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Pedido:
    
    private Pedido pedido;
    
    //Constructores:

    public MercadoPago() {
    }

    public MercadoPago(Long idMercadoPago, String codigo, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idMercadoPago = idMercadoPago;
        this.codigo = codigo;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(Long idMercadoPago, String codigo, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idMercadoPago = idMercadoPago;
        this.codigo = codigo;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(Long idMercadoPago, String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idMercadoPago = idMercadoPago;
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(Long idMercadoPago, String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idMercadoPago = idMercadoPago;
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(Long idMercadoPago, String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idMercadoPago = idMercadoPago;
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

  

    public MercadoPago(String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta) {
        super(fechaAlta);
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }

    public MercadoPago(String codigo, LocalDate fechaAprobacion, String metodoPago, String numeroTarjeta, Long idPedido, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.codigo = codigo;
        this.fechaAprobacion = fechaAprobacion;
        this.metodoPago = metodoPago;
        this.numeroTarjeta = numeroTarjeta;
        this.idPedido = idPedido;
    }
    
    //Metodos Accesores (Getters and Setters):

    public Long getIdMercadoPago() {
        return idMercadoPago;
    }

    public void setIdMercadoPago(Long idMercadoPago) {
        this.idMercadoPago = idMercadoPago;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getFechaAprobacion() {
        return fechaAprobacion;
    }

    public void setFechaAprobacion(LocalDate fechaAprobacion) {
        this.fechaAprobacion = fechaAprobacion;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
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
        return "\nIdMercadoPago: " + idMercadoPago + "\nCodigo: " + codigo + 
                "\nFechaAprobacion: " + fechaAprobacion + "\nMetodoPago: " + metodoPago + 
                "\nNumeroTarjeta: " + numeroTarjeta + "\nIdPedido: " + idPedido +
                 "\nFechaAlta: " + fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
    
    
}

