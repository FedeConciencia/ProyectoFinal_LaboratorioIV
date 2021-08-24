package Modelo;

/**
 *
 * @author El Juanelo
 */
public class Configuracion {
    private int cantidadCocineros;
    private String emailEmpresa;
    private String tokenMercadoPago;
    
    public Configuracion(){}
    
    public Configuracion(int cantCocineros, String emailEmp, String tokenMercPago){
        this.cantidadCocineros = cantCocineros;
        this.emailEmpresa = emailEmp;
        this.tokenMercadoPago = tokenMercPago;
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
    
    
}
