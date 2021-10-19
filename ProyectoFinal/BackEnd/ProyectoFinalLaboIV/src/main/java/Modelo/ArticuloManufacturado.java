package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ArticuloManufacturado extends EstadoEntidad {
    
    //Variables/Atributos de clase:
    
    private long idArticulo;
    private int tiempoEstimado;
    private String denominacion;
    private double precioVenta;
    private String imagen;
    private long idRubro;
    
    //Variables de Relacion Bidireccional (1:N) con Clase RubroGeneral:
    private RubroGeneral rubroGeneral;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArtManufacturadoDetalle:
    private List<ArticuloManufacturadoDetalle> artManufacturadoDetalles;
    
    //Variables de Relacion Bidireccional (1:N) con Clase DetallePedido:
    private List<DetallePedido> listaDetallePedido;
    
    //Variables de Relacion Bidireccional (1:N) con Clase DetalleFactura:
    private List<DetalleFactura> listaDetalleFactura;
    
    //Constructores:

    public ArticuloManufacturado() {
    }

    public ArticuloManufacturado(long idArticulo, int tiempoEstimado, String denominacion, double precioVenta, String imagen, long idRubro, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idArticulo = idArticulo;
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagen = imagen;
        this.idRubro = idRubro;
    }


    public ArticuloManufacturado(int tiempoEstimado, String denominacion, double precioVenta, String imagen, long idRubro, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.tiempoEstimado = tiempoEstimado;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagen = imagen;
        this.idRubro = idRubro;
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

    public long getIdRubro() {
        return idRubro;
    }

    public void setIdRubro(long idRubro) {
        this.idRubro = idRubro;
    }

    public RubroGeneral getRubroGeneral() {
        return rubroGeneral;
    }

    public void setRubroGeneral(RubroGeneral rubroGeneral) {
        this.rubroGeneral = rubroGeneral;
    }

    public List<ArticuloManufacturadoDetalle> getArtManufacturadoDetalles() {
        return artManufacturadoDetalles;
    }

    public void setArtManufacturadoDetalles(List<ArticuloManufacturadoDetalle> artManufacturadoDetalles) {
        this.artManufacturadoDetalles = artManufacturadoDetalles;
    }

    public List<DetallePedido> getListaDetallePedido() {
        return listaDetallePedido;
    }

    public void setListaDetallePedido(List<DetallePedido> listaDetallePedido) {
        this.listaDetallePedido = listaDetallePedido;
    }

    public List<DetalleFactura> getListaDetalleFactura() {
        return listaDetalleFactura;
    }

    public void setListaDetalleFactura(List<DetalleFactura> listaDetalleFactura) {
        this.listaDetalleFactura = listaDetalleFactura;
    }
    
    
    //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdArticulo: " + idArticulo + "\nTiempoEstimado: " + tiempoEstimado + "\nDenominacion: " + denominacion + 
                "\nPrecioVenta: " + precioVenta + "\nImagen: " + imagen + "\nIdRubro: " + idRubro + 
                 "\nFechaAlta: " +  fechaAlta + "\nFechaBaja: " + fechaBaja +  "\nEstado: " + estado;
    }
    
}

