package Modelo;

import java.time.LocalDate;
import java.util.List;


public class Factura extends EstadoEntidad {
    
    
    //Variables de Clase:
    
    private Long idFactura;
    private String codigo;
    private double montoDescuento;
    private String formaPago;
    private double totalVenta;
    private Long idPedido;
   
    
    //Variables de Relacion Bidireccional (1:N) con Clase Pedido:
    
    private Pedido pedido;
    
    //Variables de Relacion Bidireccional (1:N) con Clase DetalleFactura:
    
    private List<DetalleFactura> listaDetalleFactura;
    
    
    //Constructores:
    
    public Factura() {
    }
    
    public Factura(Long idFactura, String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta) {
        super(fechaAlta);
        this.idFactura = idFactura;
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

    public Factura(Long idFactura, String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.idFactura = idFactura;
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

    public Factura(Long idFactura, String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idFactura = idFactura;
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

    public Factura(String codigo, String formaPago, double totalVenta, LocalDate fechaAlta) {
        super(fechaAlta);
        this.codigo = codigo;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
    }

    public Factura(String codigo, String formaPago, double totalVenta, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.codigo = codigo;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
    }

    public Factura(String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta) {
        super(fechaAlta);
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

    public Factura(String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

    public Factura(String codigo, double montoDescuento, String formaPago, double totalVenta, Long idPedido, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;
        this.idPedido = idPedido;
    }

  


    //Metodos Accesores (Getters and Setters):
    
   
    public Long getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(Long idFactura) {
        this.idFactura = idFactura;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public double getMontoDescuento() {
        return montoDescuento;
    }

    public void setMontoDescuento(double montoDescuento) {
        this.montoDescuento = montoDescuento;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

    public double getTotalVenta() {
        return totalVenta;
    }

    public void setTotalVenta(double totalVenta) {
        this.totalVenta = totalVenta;
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

    public List<DetalleFactura> getListaDetalleFactura() {
        return listaDetalleFactura;
    }

    public void setListaDetalleFactura(List<DetalleFactura> listaDetalleFactura) {
        this.listaDetalleFactura = listaDetalleFactura;
    }
    
   
    
    //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdFactura: " + idFactura + "\nCodigo: " + codigo + "\nMontoDescuento: " + montoDescuento + 
                "\nFormaPago: " + formaPago + "\nTotalVenta: " + totalVenta + 
                "\nIdPedido: " + idPedido +  "\nFechaAlta: " + 
                fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
    
 
    
}




