package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author El Juanelo
 */
public class ArticuloInsumo extends EstadoEntidad {
    
    private long idArticuloInsumo;
    private String denominacion;
    private double precioCompra;
    private double precioVenta;
    private double stockActual;
    private double stockMinimo;
    private String unidadMedida;
    private String esInsumo;
    private long idRubroArticulo;
    private RubroArticulo rubroArticulo;
    private List<ArticuloManufacturadoDetalle> artManDetalles;
    
    public ArticuloInsumo(){ 
        super();
        this.artManDetalles = new ArrayList<>();
    }
    
    public ArticuloInsumo(long id, String denominacion, double precioCompra,
            double precioVenta, double stockActual, double stockMinimo, 
            String unidadMedida, String esInsumo, long idRubroArticulo, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.idArticuloInsumo = id;
        this.denominacion = denominacion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.unidadMedida = unidadMedida;
        this.esInsumo = esInsumo;
        this.idRubroArticulo = idRubroArticulo;
        this.artManDetalles = new ArrayList<>();
    }
    
    public ArticuloInsumo(long id, String denominacion, double precioCompra,
            double precioVenta, double stockActual, double stockMinimo, 
            String unidadMedida, String esInsumo, long idRubroArticulo, 
            LocalDate fechaAlta, LocalDate fechaBaja, String estado){
        super(fechaAlta, fechaBaja, estado);
        this.idArticuloInsumo = id;
        this.denominacion = denominacion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.unidadMedida = unidadMedida;
        this.esInsumo = esInsumo;
        this.idRubroArticulo = idRubroArticulo;
        this.artManDetalles = new ArrayList<>();
    }
    
    public ArticuloInsumo(String denominacion, double precioCompra,
            double precioVenta, double stockActual, double stockMinimo, 
            String unidadMedida, String esInsumo, long idRubroArticulo, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.denominacion = denominacion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.unidadMedida = unidadMedida;
        this.esInsumo = esInsumo;
        this.idRubroArticulo = idRubroArticulo;
        this.artManDetalles = new ArrayList<>();
    }

    public long getIdArticuloInsumo() {
        return idArticuloInsumo;
    }

    public void setIdArticuloInsumo(long idArticuloInsumo) {
        this.idArticuloInsumo = idArticuloInsumo;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
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

    public String getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public String getEsInsumo() {
        return esInsumo;
    }

    public void setEsInsumo(String esInsumo) {
        this.esInsumo = esInsumo;
    }
    
    public long getIdRubroArticulo() {
        return idRubroArticulo;
    }

    public void setIdRubroArticulo(long idRubroArticulo) {
        this.idRubroArticulo = idRubroArticulo;
    }
    
    public RubroArticulo getRubroArticulo() {
        return rubroArticulo;
    }

    public void setRubroArticulo(RubroArticulo rubroArticulo) {
        this.rubroArticulo = rubroArticulo;
    }

    public List<ArticuloManufacturadoDetalle> getArtManDetalles() {
        return artManDetalles;
    }

    public void setArtManDetalles(List<ArticuloManufacturadoDetalle> artManDetalles) {
        this.artManDetalles = artManDetalles;
    }
    
}
