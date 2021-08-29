
package Modelo;


public class DetalleFactura extends EstadoEntidad {
    
     //Variables de Clase:
    
    private Long idDetalleFactura;
    private int cantidad;
    private double subTotal;
    private Long idFactura;
    private Long idArticuloManufacturado;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Factura:
    
    private Factura factura;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArticuloManufacturado:
    
    private ArticuloManufacturado articuloManufacturado;
    
    
    //Constructores:

    public DetalleFactura() {
    }
    
    
    public DetalleFactura(Long idDetalleFactura, int cantidad, double subTotal, Long idFactura, Long idArticuloManufacturado) {
        this.idDetalleFactura = idDetalleFactura;
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.idFactura = idFactura;
        this.idArticuloManufacturado = idArticuloManufacturado;
    }

    public DetalleFactura(int cantidad, double subTotal, Long idFactura) {
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.idFactura = idFactura;
    }

    public DetalleFactura(int cantidad, double subTotal, Long idFactura, Long idArticuloManufacturado) {
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.idFactura = idFactura;
        this.idArticuloManufacturado = idArticuloManufacturado;
    }
    
    
    
     //Metodos Accesores (Getters and Setters):

    public Long getIdDetalleFactura() {
        return idDetalleFactura;
    }

    public void setIdDetalleFactura(Long idDetalleFactura) {
        this.idDetalleFactura = idDetalleFactura;
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

    public Long getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(Long idFactura) {
        this.idFactura = idFactura;
    }

    public Long getIdArticuloManufacturado() {
        return idArticuloManufacturado;
    }

    public void setIdArticuloManufacturado(Long idArticuloManufacturado) {
        this.idArticuloManufacturado = idArticuloManufacturado;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public ArticuloManufacturado getArticuloManufacturado() {
        return articuloManufacturado;
    }

    public void setArticuloManufacturado(ArticuloManufacturado articuloManufacturado) {
        this.articuloManufacturado = articuloManufacturado;
    }
    
    //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdDetalleFactura: " + idDetalleFactura + "\nCantidad: " + cantidad + 
                "\nSubTotal: " + subTotal + "\nIdFactura: " + idFactura + 
                "\nIdArticuloManufacturado: " + idArticuloManufacturado;
    }
    
    
    
}
