
package Modelo;


public class AuxIngredientes {
    
    //Clase auxiliar para mostrar la union de 3 clases:
    
    //Variables/Atributos de clase:
   
    private String denominacionArtMan;
    private double precioVenta;
    private int tiempoEstimado;
    private double cantidad;
    private String unidadMedida;
    private String denominacionArtInsumo;
    
    //Constructores:

    public AuxIngredientes() {
    }

    public AuxIngredientes(String denominacionArtMan, double precioVenta, int tiempoEstimado, double cantidad, String unidadMedida, String denominacionArtInsumo) {
        this.denominacionArtMan = denominacionArtMan;
        this.precioVenta = precioVenta;
        this.tiempoEstimado = tiempoEstimado;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.denominacionArtInsumo = denominacionArtInsumo;
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
    
    
    @Override
    public String toString(){
        
        return "NombreArtManf: " + denominacionArtMan + "\nPrecio Venta: " + precioVenta +
                "\nTiempo Estimado: " + tiempoEstimado + "\nCantidad: " + cantidad +
                "\nUnidad de Medida: " + unidadMedida + "\nNombreArtInsumo: " + denominacionArtInsumo;
        
    }
    
    
}
