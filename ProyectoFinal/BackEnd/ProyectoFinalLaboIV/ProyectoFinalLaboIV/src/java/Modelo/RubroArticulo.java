package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author El Juanelo
 */
public class RubroArticulo extends EstadoEntidad {
    private long idRubro;
    private String denominacion;
    private RubroArticulo padre;
    private List<RubroArticulo> rubArtHijos;
    private List<ArticuloInsumo> articuloInsumos;
    
    public RubroArticulo(){
        super();
        this.denominacion = "";
        this.rubArtHijos = new ArrayList<>();
        this.articuloInsumos = new ArrayList<>();
    }
    
    public RubroArticulo(long idRubro, String denominacion,
            LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
        this.rubArtHijos = new ArrayList<>();
        this.articuloInsumos = new ArrayList<>();
    }
    
    public RubroArticulo(long idRubro, String denominacion,
            LocalDate fechaAlta, LocalDate fechaBaja, String estado){
        super(fechaAlta, fechaBaja, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
        this.rubArtHijos = new ArrayList<>();
        this.articuloInsumos = new ArrayList<>();
    }
    
    public RubroArticulo(String denominacion, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.denominacion = denominacion;
        this.rubArtHijos = new ArrayList<>();
        this.articuloInsumos = new ArrayList<>();
    }

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
    
}
