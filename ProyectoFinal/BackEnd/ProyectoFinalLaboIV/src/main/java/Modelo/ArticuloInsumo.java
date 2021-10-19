package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ArticuloInsumo extends EstadoEntidad {
    
    
    //Variables/Atributos de clase:
    
    private long idArticulo;
    private String denominacion;
    private double precioCompra;
    private double precioVenta;
    private double stockActual;
    private double stockMinimo;
    private String unidadMedida;
    private String esInsumo;
    private long idRubro;
    
    //Variables de Relacion Bidireccional (1:N) con Clase RubroArticulo:
    private RubroArticulo rubroArticulo;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArtManufacturadoDetalle:
    private List<ArticuloManufacturadoDetalle> listaArtManufacturadoDetalle;
    
    //Constructores:

    public ArticuloInsumo() {
    }

    public ArticuloInsumo(long idArticulo, String denominacion, double precioCompra, double precioVenta, double stockActual, double stockMinimo, String unidadMedida, String esInsumo, long idRubro, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idArticulo = idArticulo;
        this.denominacion = denominacion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.unidadMedida = unidadMedida;
        this.esInsumo = esInsumo;
        this.idRubro = idRubro;
    }

    public ArticuloInsumo(String denominacion, double precioCompra, double precioVenta, double stockActual, double stockMinimo, String unidadMedida, String esInsumo, long idRubro, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.denominacion = denominacion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.unidadMedida = unidadMedida;
        this.esInsumo = esInsumo;
        this.idRubro = idRubro;
    }
    
    //Metodos Accesores (Getters and Setters):

    public long getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(long idArticulo) {
        this.idArticulo = idArticulo;
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

    public long getIdRubro() {
        return idRubro;
    }

    public void setIdRubro(long idRubro) {
        this.idRubro = idRubro;
    }

    public RubroArticulo getRubroArticulo() {
        return rubroArticulo;
    }

    public void setRubroArticulo(RubroArticulo rubroArticulo) {
        this.rubroArticulo = rubroArticulo;
    }

    public List<ArticuloManufacturadoDetalle> getListaArtManufacturadoDetalle() {
        return listaArtManufacturadoDetalle;
    }

    public void setListaArtManufacturadoDetalle(List<ArticuloManufacturadoDetalle> listaArtManufacturadoDetalle) {
        this.listaArtManufacturadoDetalle = listaArtManufacturadoDetalle;
    }
    
    //Metodo de Muestra de Objeto:
    
    @Override
    public String toString() {
        return "\nIdArticulo: " + idArticulo + "\nDenominacion: " + denominacion + "\nPrecio_Compra: " + precioCompra + 
                "\nPrecio_Venta: " + precioVenta + "\nStock_Actual: " + stockActual + "\nStock_Minimo: " + stockMinimo + 
                "\nUnidad_Medida: " + unidadMedida + "\nEs_Insumo: " + esInsumo + "\nIdRubro: " + idRubro + "\nFechaAlta: " + 
                fechaAlta + "\nFechaBaja: " + fechaBaja + "\nEstado: " + estado;
    }
    
 
    
}
