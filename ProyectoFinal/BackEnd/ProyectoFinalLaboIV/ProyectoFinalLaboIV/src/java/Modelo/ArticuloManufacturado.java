package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author El Juanelo
 */
public class ArticuloManufacturado extends EstadoEntidad {
    
    private long idArticulo;
    private int tiempoEstimado;
    private String denominacion;
    private double precioVenta;
    private String imagen;
    private long idRubroGeneral;
    
    private RubroGeneral rubroGeneral;
    private List<ArticuloManufacturadoDetalle> artManDetalles;
    private List<DetallePedido> detallesPedido;
    private List<DetalleFactura> detallesFactura;
    
    public ArticuloManufacturado(){ 
        super();
        this.artManDetalles = new ArrayList<>();
        this.detallesPedido = new ArrayList<>();
        this.detallesFactura = new ArrayList<>();
    }
    
    public ArticuloManufacturado(long idArticulo, int tiempoEstimado, String denominacion, 
           long idRubroGeneral, double precioVenta, String imagen, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.idArticulo = idArticulo;
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagen = imagen;
        this.idRubroGeneral = idRubroGeneral;
        this.artManDetalles = new ArrayList<>();
        this.detallesPedido = new ArrayList<>();
        this.detallesFactura = new ArrayList<>();
    }
        
    public ArticuloManufacturado(long idArticulo,int tiempoEstimado, String denominacion, long idRubroGeneral,
            double precioVenta, String imagen, LocalDate fechaAlta, LocalDate fechaBaja, String estado){
        super(fechaAlta, fechaBaja, estado);
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagen = imagen;
        this.idRubroGeneral = idRubroGeneral;
        this.artManDetalles = new ArrayList<>();
        this.detallesPedido = new ArrayList<>();
        this.detallesFactura = new ArrayList<>();
    }
    
    public ArticuloManufacturado(int tiempoEstimado, String denominacion, long idRubroGeneral,
            double precioVenta, String imagen, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagen = imagen;
        this.idRubroGeneral = idRubroGeneral;
        this.artManDetalles = new ArrayList<>();
        this.detallesPedido = new ArrayList<>();
        this.detallesFactura = new ArrayList<>();
    }
    
    public long getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(long idArticulo) {
        this.idArticulo = idArticulo;
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

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public long getIdRubroGeneral() {
        return idRubroGeneral;
    }

    public void setIdRubroGeneral(long idRubroGeneral) {
        this.idRubroGeneral = idRubroGeneral;
    }

    public RubroGeneral getRubro() {
        return rubroGeneral;
    }

    public void setRubro(RubroGeneral rubro) {
        this.rubroGeneral = rubro;
    }

    public List<ArticuloManufacturadoDetalle> getArtManDetalles() {
        return artManDetalles;
    }

    public void setArtManDetalles(List<ArticuloManufacturadoDetalle> artManDetalles) {
        this.artManDetalles = artManDetalles;
    }

    public List<DetallePedido> getDetallesPedido() {
        return detallesPedido;
    }

    public void setDetallesPedido(List<DetallePedido> detallesPedido) {
        this.detallesPedido = detallesPedido;
    }

    public List<DetalleFactura> getDetallesFactura() {
        return detallesFactura;
    }

    public void setDetallesFactura(List<DetalleFactura> detallesFactura) {
        this.detallesFactura = detallesFactura;
    }
    
}
