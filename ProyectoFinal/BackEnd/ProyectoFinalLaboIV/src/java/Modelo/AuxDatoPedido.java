
package Modelo;

public class AuxDatoPedido {
    
    private int tiempoEstimado;
    private String denominacion;
    private double precioUnitario;
    private int cantidad;
    private double subTotal;
    private double totalPedido;
    private int idPedido;
    private int idArtManufacturado;

    public AuxDatoPedido() {
    }

    public AuxDatoPedido(int tiempoEstimado, String denominacion, double precioUnitario, int cantidad, double subTotal, double totalPedido, int idPedido, int idArtManufacturado) {
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.totalPedido = totalPedido;
        this.idPedido = idPedido;
        this.idArtManufacturado = idArtManufacturado;
    }

    public int getTiempoEstimado() {
        return tiempoEstimado;
    }

    public void setTiempoEstimado(int tiempoEstimado) {
        this.tiempoEstimado = tiempoEstimado;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
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

    public double getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(double totalPedido) {
        this.totalPedido = totalPedido;
    }

    public int getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }

    public int getArtManufacturado() {
        return idArtManufacturado;
    }

    public void setArtManufacturado(int idArtManufacturado) {
        this.idArtManufacturado = idArtManufacturado;
    }
    
    @Override
    public String toString(){
        
        return "TiempoEstimado: " + tiempoEstimado + "\nDenominacion: " + denominacion +
                "\nPrecioUnitario: " + precioUnitario + "\nCantidad: " + cantidad + 
                "\nSubTotal: " + subTotal + "\nTotalPedido: " + totalPedido +
                "\nIdPedido: " + idPedido + "\nidArticuloManufacturado: " + idArtManufacturado;
        
    }
    
    
}
