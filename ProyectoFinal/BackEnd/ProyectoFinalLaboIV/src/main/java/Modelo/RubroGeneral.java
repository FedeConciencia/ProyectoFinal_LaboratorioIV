package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class RubroGeneral extends EstadoEntidad {
    
    //Variables/Atributos de clase:
    
    private long idRubro;
    private String denominacion;
    
    
    //Variables de Relacion Bidireccional (1:N) con Clase Articulo_Manufacturado:
    
    private List<ArticuloManufacturado> listaArtManufacturado;
    
    //Constructores:

    public RubroGeneral() {
    }

    public RubroGeneral(long idRubro, String denominacion, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
    }

    
    public RubroGeneral(String denominacion, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.denominacion = denominacion;
    }
    
    //Metodos Accesores (Getters and Setters):

    public long getIdRubro() {
        return idRubro;
    }

    public void setIdRubro(long idRubro) {
        this.idRubro = idRubro;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public List<ArticuloManufacturado> getListaArtManufacturado() {
        return listaArtManufacturado;
    }

    public void setListaArtManufacturado(List<ArticuloManufacturado> listaArtManufacturado) {
        this.listaArtManufacturado = listaArtManufacturado;
    }
    
    
    //Metodo de Muestra de Objeto:
    
    @Override
    public String toString() {
        return "\nIdRubro: " + idRubro + "\nDenominacion: " + denominacion + "\nFechaAlta: " + 
                fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
    
}   

