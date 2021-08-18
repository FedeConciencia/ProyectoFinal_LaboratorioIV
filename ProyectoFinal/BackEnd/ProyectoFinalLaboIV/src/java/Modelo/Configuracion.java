package Modelo;

import java.time.LocalDate;


public class Configuracion extends EstadoEntidad {
    
    private Long idConfiguracion;
    private int cantidadCocineros;
    private String emailEmpresa;
    private String tokenMercadoPago;

    public Configuracion() {
    }

    public Configuracion(Long idConfiguracion, int cantidadCocineros, String emailEmpresa, String tokenMercadoPago) {
        this.idConfiguracion = idConfiguracion;
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }

    public Configuracion(int cantidadCocineros, String emailEmpresa, String tokenMercadoPago) {
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }

    public Configuracion(int cantidadCocineros, String emailEmpresa, String tokenMercadoPago, LocalDate fechaAlta) {
        super(fechaAlta);
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }

    public Configuracion(int cantidadCocineros, String emailEmpresa, String tokenMercadoPago, LocalDate fechaAlta, String estado) {
        super(fechaAlta, estado);
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }

    public Configuracion(int cantidadCocineros, String emailEmpresa, String tokenMercadoPago, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }

    public Configuracion(Long idConfiguracion, int cantidadCocineros, String emailEmpresa, String tokenMercadoPago, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        super(fechaAlta, fechaBaja, estado);
        this.idConfiguracion = idConfiguracion;
        this.cantidadCocineros = cantidadCocineros;
        this.emailEmpresa = emailEmpresa;
        this.tokenMercadoPago = tokenMercadoPago;
    }
    
    

    public Long getIdConfiguracion() {
        return idConfiguracion;
    }

    public void setIdConfiguracion(Long idConfiguracion) {
        this.idConfiguracion = idConfiguracion;
    }

    public int getCantidadCocineros() {
        return cantidadCocineros;
    }

    public void setCantidadCocineros(int cantidadCocineros) {
        this.cantidadCocineros = cantidadCocineros;
    }

    public String getEmailEmpresa() {
        return emailEmpresa;
    }

    public void setEmailEmpresa(String emailEmpresa) {
        this.emailEmpresa = emailEmpresa;
    }

    public String getTokenMercadoPago() {
        return tokenMercadoPago;
    }

    public void setTokenMercadoPago(String tokenMercadoPago) {
        this.tokenMercadoPago = tokenMercadoPago;
    }
    
    
    //Metodo de Muestra de Objeto:
    
    @Override
    public String toString() {
        return "\nIdConfiguracion: " + idConfiguracion + "\nCantidad Concineros: " + cantidadCocineros + 
                "\nEmail Empresa: " + emailEmpresa + "\nToken MercadoPago: " + tokenMercadoPago + 
                "\nFechaAlta: " + fechaAlta + "\nFechaBaja: " + fechaBaja + 
                "\nEstado: " + estado;
    
    }
    
}
