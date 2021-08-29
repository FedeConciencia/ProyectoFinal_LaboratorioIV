package Modelo;

import java.time.LocalDate;

/**
 *
 * @author El Juanelo
 */
public class EstadoEntidad {
    protected LocalDate fechaAlta;
    protected LocalDate fechaBaja;
    protected String estado;
    
    public EstadoEntidad(){}
    
    public EstadoEntidad(LocalDate fechaAlta){
        this.fechaAlta = fechaAlta;
        this.fechaBaja = LocalDate.of(1900, 1, 1);
        this.estado = "";
    }
    
    public EstadoEntidad(LocalDate fechaAlta, String estado){
        this.fechaAlta = fechaAlta;
        this.fechaBaja = LocalDate.of(1900, 1, 1);
        this.estado = estado;
    }
    
    public EstadoEntidad(LocalDate fechaAlta, LocalDate fechaBaja, String estado){
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public LocalDate getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(LocalDate fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
}
