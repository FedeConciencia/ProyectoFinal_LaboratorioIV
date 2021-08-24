package Modelo;

/**
 *
 * @author El Juanelo
 */
public class ArticuloManufacturadoDetalle {
    
    private long idArticuloDetalle;
    private double cantidad;
    private long idArticuloManufacturado;
    private long idArticuloInsumo;
    
    private ArticuloManufacturado articuloManufacturado;
    private ArticuloInsumo articuloInsumo;
    
    public ArticuloManufacturadoDetalle(){}
    
    public ArticuloManufacturadoDetalle(long idArticuloDetalle, double cantidad,
            long idArticuloManufacturado, long idArticuloInsumo,
            ArticuloManufacturado artMan, ArticuloInsumo artInsumo){
        this.idArticuloDetalle = idArticuloDetalle;
        this.cantidad = cantidad;
        this.idArticuloManufacturado = idArticuloManufacturado;
        this.idArticuloInsumo = idArticuloInsumo;
        this.articuloManufacturado = artMan;
        this.articuloInsumo = artInsumo;
    }
    
    public ArticuloManufacturadoDetalle(double cantidad, 
            long idArticuloManufacturado, long idArticuloInsumo,
            ArticuloManufacturado artMan, ArticuloInsumo artInsumo){
        this.cantidad = cantidad;
        this.idArticuloManufacturado = idArticuloManufacturado;
        this.idArticuloInsumo = idArticuloInsumo;
        this.articuloManufacturado = artMan;
        this.articuloInsumo = artInsumo;
    }

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
    
}
