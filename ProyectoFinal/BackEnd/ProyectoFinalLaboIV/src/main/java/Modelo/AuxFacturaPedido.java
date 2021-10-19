package Modelo;

public class AuxFacturaPedido {
    
    private int tipoEnvio;
    private String codigo;
    private double montoDescuento;
    private String metodoPago;
    private double total;
    private int cantidad;
    private double subTotal;
    private String denominacion;
    private double precioVenta;

    public AuxFacturaPedido() {
    }

    public AuxFacturaPedido(int tipoEnvio, String codigo, double montoDescuento, String metodoPago, double total, int cantidad, double subTotal, String denominacion, double precioVenta) {
        this.tipoEnvio = tipoEnvio;
        this.codigo = codigo;
        this.montoDescuento = montoDescuento;
        this.metodoPago = metodoPago;
        this.total = total;
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
    }

    public int getTipoEnvio() {
        return tipoEnvio;
    }

    public void setTipoEnvio(int tipoEnvio) {
        this.tipoEnvio = tipoEnvio;
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

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    @Override
    public String toString() {
        return "TipoEnvio: " + tipoEnvio + "\nCodigo:" + codigo + "\nMontoDescuento: " + montoDescuento + 
                "\nMetodoPago: " + metodoPago + "\nTotal: " + total + 
                "\nCantidad: " + cantidad + "\nSubTotal: " + subTotal + 
                "\nDenominacion: " + denominacion + "\nPrecioVenta: " + precioVenta;
    }
    
  
    
}

