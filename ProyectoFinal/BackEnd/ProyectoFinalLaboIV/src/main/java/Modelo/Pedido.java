package Modelo;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


public class Pedido extends EstadoEntidad {
    
    //Variables de Clase:
    
    private Long idPedido;
    private String codigo;
    private LocalTime horaEstimadaFin;  //Modifico por LocalTime que representa solo la hora y en BD con TIME
    private int estadoPedido;
    private int tipoEnvio;
    private double total;
    private Long idCliente;
    private Long idDomicilio;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Cliente:
    
    private Cliente cliente;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Domicilio:
    
    private Domicilio domicilio;
    
    //Variables de Relacion Bidireccional (1:1) con Clase Factura:
    
    private Factura factura;
    
    //Variables de Relacion Bidireccional (1:1) con Clase MercadoPago:
    
    private MercadoPago mercadoPago;
    
    //Variables de Relacion Bidireccional (1:N) con Clase DetallePedido:
    
    private List<DetallePedido> listaDetallePedido;
    
    //Constructores:

    public Pedido() {
    }

    public Pedido(Long idPedido, String codigo, LocalTime horaEstimadaFin, int estadoPedido,
            int tipoEnvio, double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idPedido = idPedido;
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }

    public Pedido(Long idPedido, String codigo, LocalTime horaEstimadaFin, int estadoPedido,
            int tipoEnvio, double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idPedido = idPedido;
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }

    public Pedido(Long idPedido, String codigo, LocalTime horaEstimadaFin, int estadoPedido,
            int tipoEnvio, double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idPedido = idPedido;
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }

    public Pedido(String codigo, LocalTime horaEstimadaFin, int estadoPedido, int tipoEnvio,
            double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta) {
        super(fechaAlta);
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }

    public Pedido(String codigo, LocalTime horaEstimadaFin, int estadoPedido, int tipoEnvio,
            double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }

    public Pedido(String codigo, LocalTime horaEstimadaFin, int estadoPedido, int tipoEnvio,
            double total, Long idCliente, Long idDomicilio, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.codigo = codigo;
        this.horaEstimadaFin = horaEstimadaFin;
        this.estadoPedido = estadoPedido;
        this.tipoEnvio = tipoEnvio;
        this.total = total;
        this.idCliente = idCliente;
        this.idDomicilio = idDomicilio;
    }
    
    //Metodos Accesores (Getters and Setters):

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalTime getHoraEstimadaFin() {
        return horaEstimadaFin;
    }

    public void setHoraEstimadaFin(LocalTime horaEstimadaFin) {
        this.horaEstimadaFin = horaEstimadaFin;
    }

    public int getEstadoPedido() {
        return estadoPedido;
    }

    public void setEstadoPedido(int estadoPedido) {
        this.estadoPedido = estadoPedido;
    }
    
    public int getTipoEnvio() {
        return tipoEnvio;
    }

    public void setTipoEnvio(int tipoEnvio) {
        this.tipoEnvio = tipoEnvio;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdDomicilio() {
        return idDomicilio;
    }

    public void setIdDomicilio(Long idDomicilio) {
        this.idDomicilio = idDomicilio;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Domicilio getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(Domicilio domicilio) {
        this.domicilio = domicilio;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public MercadoPago getMercadoPago() {
        return mercadoPago;
    }

    public void setMercadoPago(MercadoPago mercadoPago) {
        this.mercadoPago = mercadoPago;
    }

    public List<DetallePedido> getListaDetallePedido() {
        return listaDetallePedido;
    }

    public void setListaDetallePedido(List<DetallePedido> listaDetallePedido) {
        this.listaDetallePedido = listaDetallePedido;
    }
    
    
   
     //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdPedido: " + idPedido + "\nCodigo: " + codigo + "\nHoraEstimadaFin: " + horaEstimadaFin + 
                "\nEstadoPedido: " + estadoPedido + "\nTipoEnvio: " + tipoEnvio + "\nTotal: " + total 
                + "\nIdCliente: " + idCliente + "\nIdDomicilio: " + idDomicilio + "\nFechaAlta: " + 
                fechaAlta + "\nFechaBaja: " + fechaBaja + "\nEstado: " + estado;
    }
    

}
