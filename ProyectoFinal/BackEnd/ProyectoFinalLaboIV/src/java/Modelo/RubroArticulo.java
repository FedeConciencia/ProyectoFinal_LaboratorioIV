package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class RubroArticulo extends EstadoEntidad {
    
    //Variables de Clase:
    private long idRubro;
    private String denominacion;
    
    //Variables de Relacion Bidireccional (1:N) con Clase RubroArticulo:
    private RubroArticulo padre;
    private List<RubroArticulo> rubArtHijos;
    
    //Variables de Relacion Bidireccional (1:N) con Clase ArticuloInsumo:
    
    private List<ArticuloInsumo> articuloInsumos;
    
    //Constructores:

    public RubroArticulo() {
    }

    public RubroArticulo(long idRubro, String denominacion, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
    }

    public RubroArticulo(String denominacion, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
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

    public RubroArticulo getPadre() {
        return padre;
    }

    public void setPadre(RubroArticulo padre) {
        this.padre = padre;
    }

    public List<RubroArticulo> getRubArtHijos() {
        return rubArtHijos;
    }

    public void setRubArtHijos(List<RubroArticulo> rubArtHijos) {
        this.rubArtHijos = rubArtHijos;
    }

    public List<ArticuloInsumo> getArticuloInsumos() {
        return articuloInsumos;
    }

    public void setArticuloInsumos(List<ArticuloInsumo> articuloInsumos) {
        this.articuloInsumos = articuloInsumos;
    }
    
    
     //Metodo de Muestra de Objeto:

    @Override
    public String toString() {
        return "\nIdRubroArticulo: " + idRubro + "\nDenominacion: " + denominacion  + 
                "\nFechaAlta: " + fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    }
    
}
