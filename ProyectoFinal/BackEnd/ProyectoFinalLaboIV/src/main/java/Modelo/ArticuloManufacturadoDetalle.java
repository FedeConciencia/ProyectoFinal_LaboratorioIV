package Modelo;

public class ArticuloManufacturadoDetalle {
    
    //Variables/Atributos de clase:
   
    private long idArticuloDetalle;
    private double cantidad;
    private String unidadMedida;
    private long idArticuloManufacturado;
    private long idArticuloInsumo;
    
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArticuloManufacturado:
    private ArticuloManufacturado articuloManufacturado;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArticuloInsumo:
    private ArticuloInsumo articuloInsumo;
    
    //Constructores:

    public ArticuloManufacturadoDetalle() {
    }

    public ArticuloManufacturadoDetalle(long idArticuloDetalle, double cantidad, String unidadMedida, long idArticuloManufacturado, long idArticuloInsumo) {
        this.idArticuloDetalle = idArticuloDetalle;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.idArticuloManufacturado = idArticuloManufacturado;
        this.idArticuloInsumo = idArticuloInsumo;
    }

    public ArticuloManufacturadoDetalle(double cantidad, String unidadMedida, long idArticuloManufacturado, long idArticuloInsumo) {
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.idArticuloManufacturado = idArticuloManufacturado;
        this.idArticuloInsumo = idArticuloInsumo;
    }
    
    //Metodos Accesores (Getters and Setters):

    public long getIdArticuloDetalle() {
        return idArticuloDetalle;
    }

    public void setIdArticuloDetalle(long idArticuloDetalle) {
        this.idArticuloDetalle = idArticuloDetalle;
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

    public long getIdArticuloManufacturado() {
        return idArticuloManufacturado;
    }

    public void setIdArticuloManufacturado(long idArticuloManufacturado) {
        this.idArticuloManufacturado = idArticuloManufacturado;
    }

    public long getIdArticuloInsumo() {
        return idArticuloInsumo;
    }

    public void setIdArticuloInsumo(long idArticuloInsumo) {
        this.idArticuloInsumo = idArticuloInsumo;
    }

    public ArticuloManufacturado getArticuloManufacturado() {
        return articuloManufacturado;
    }

    public void setArticuloManufacturado(ArticuloManufacturado articuloManufacturado) {
        this.articuloManufacturado = articuloManufacturado;
    }

    public ArticuloInsumo getArticuloInsumo() {
        return articuloInsumo;
    }

    public void setArticuloInsumo(ArticuloInsumo articuloInsumo) {
        this.articuloInsumo = articuloInsumo;
    }
    
    //Metodo de Muestra de Objeto:
    
    @Override
    public String toString() {
        return "\nIdArticuloDetalle: " + idArticuloDetalle + "\nCantidad: " + cantidad + "\nUnidad Medida: " + unidadMedida + 
                "\nIdArticuloManuFacturado: " + idArticuloManufacturado + "\nIdArticuloInsumo: " + idArticuloInsumo;
    }
    
    
}

