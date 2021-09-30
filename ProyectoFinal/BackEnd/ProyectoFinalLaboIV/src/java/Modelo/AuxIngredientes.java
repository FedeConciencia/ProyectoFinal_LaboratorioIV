
package Modelo;


public class AuxIngredientes {
    
    //Clase auxiliar para mostrar la union de 3 clases:
    
    //Variables/Atributos de clase:
   
    private String denominacionArtMan;
    private double precioVenta;
    private int tiempoEstimado;
    private double cantidad;
    private String unidadMedida;
    private long idArticulo;
    private String denominacionArtInsumo;
    private double stockActual;
    private double stockMinimo;
    
    //Constructores:

    public AuxIngredientes() {
    }

    public AuxIngredientes(String denominacionArtMan, double precioVenta, int tiempoEstimado, double cantidad, String unidadMedida, long idArticulo, String denominacionArtInsumo, double stockActual, double stockMinimo) {
        this.denominacionArtMan = denominacionArtMan;
        this.precioVenta = precioVenta;
        this.tiempoEstimado = tiempoEstimado;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.idArticulo = idArticulo;
        this.denominacionArtInsumo = denominacionArtInsumo;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
    }
    
   
   
    //Metodos Accesores (Getters and Setters):

    public String getDenominacionArtMan() {
        return denominacionArtMan;
    }

    public void setDenominacionArtMan(String denominacionArtMan) {
        this.denominacionArtMan = denominacionArtMan;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public int getTiempoEstimado() {
        return tiempoEstimado;
    }

    public void setTiempoEstimado(int tiempoEstimado) {
        this.tiempoEstimado = tiempoEstimado;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public String getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public String getDenominacionArtInsumo() {
        return denominacionArtInsumo;
    }

    public void setDenominacionArtInsumo(String denominacionArtInsumo) {
        this.denominacionArtInsumo = denominacionArtInsumo;
    }

    public double getStockActual() {
        return stockActual;
    }

    public void setStockActual(double stockActual) {
        this.stockActual = stockActual;
    }

    public double getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(double stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public long getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(long idArticulo) {
        this.idArticulo = idArticulo;
    }
    
    
    
    @Override
    public String toString(){
        
        return "NombreArtManf: " + denominacionArtMan + "\nPrecio Venta: " + precioVenta +
                "\nTiempo Estimado: " + tiempoEstimado + "\nCantidad: " + cantidad +
                "\nUnidad de Medida: " + unidadMedida + "\nNombreArtInsumo: " + denominacionArtInsumo +
                "\nStock Actual: " + stockActual + "\nStock Minimo: " + stockMinimo;
        
    }
    
    
}
