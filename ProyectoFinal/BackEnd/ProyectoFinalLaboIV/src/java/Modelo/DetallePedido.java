
package Modelo;


public class DetallePedido extends EstadoEntidad {
    
    //Variables de Clase:
    
    private Long idDetallePedido;
    private int cantidad;
    private double subTotal;
    private Long idPedido;
    private Long idArticuloManufacturado;
    
    //Variables de Relacion Bidireccional (1:N) con Clase Pedido:
    
    private Pedido pedido;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArticuloManufacturado:
    
    private ArticuloManufacturado articuloManufacturado;
    
    
    //Constructores:

    public DetallePedido() {
    }

    public DetallePedido(Long idDetallePedido, int cantidad, double subTotal, Long idPedido, Long idArticuloManufacturado) {
        this.idDetallePedido = idDetallePedido;
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.idPedido = idPedido;
        this.idArticuloManufacturado = idArticuloManufacturado;
    }

    public DetallePedido(int cantidad, double subTotal, Long idPedido, Long idArticuloManufacturado) {
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.idPedido = idPedido;
        this.idArticuloManufacturado = idArticuloManufacturado;
    }
    
     //Metodos Accesores (Getters and Setters):

    public Long getIdDetallePedido() {
        return idDetallePedido;
    }

    public void setIdDetallePedido(Long idDetallePedido) {
        this.idDetallePedido = idDetallePedido;
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

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdArticuloManufacturado() {
        return idArticuloManufacturado;
    }

    public void setIdArticuloManufacturado(Long idArticuloManufacturado) {
        this.idArticuloManufacturado = idArticuloManufacturado;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
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
        return "\nIdDetallePedido: " + idDetallePedido + "\nCantidad: " + cantidad + 
                "\nSubTotal: " + subTotal + "\nIdPedido: " + idPedido + 
                "\nIdArticuloManufacturado: " + idArticuloManufacturado;
    }
    
  
    
}
