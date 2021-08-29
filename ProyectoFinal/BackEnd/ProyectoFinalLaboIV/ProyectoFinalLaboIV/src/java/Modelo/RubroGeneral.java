package Modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author El Juanelo
 */
public class RubroGeneral extends EstadoEntidad {
    
    private long idRubro;
    private String denominacion;
    private List<ArticuloManufacturado> articulosManufacturados;
    
    public RubroGeneral(){ 
        super(); 
        this.articulosManufacturados = new ArrayList<>();
    }
    
    public RubroGeneral(long idRubro, String denominacion, LocalDate fechaAlta, 
            String estado){
        super(fechaAlta, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
        this.articulosManufacturados = new ArrayList<>();
    }
    
    public RubroGeneral(long idRubro, String denominacion, LocalDate fechaAlta, LocalDate fechaBaja,
            String estado){
        super(fechaAlta, fechaBaja, estado);
        this.idRubro = idRubro;
        this.denominacion = denominacion;
        this.articulosManufacturados = new ArrayList<>();
    }
    
    public RubroGeneral(String denominacion, LocalDate fechaAlta, String estado){
        super(fechaAlta, estado);
        this.denominacion = denominacion;
        this.articulosManufacturados = new ArrayList<>();
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
    
}
