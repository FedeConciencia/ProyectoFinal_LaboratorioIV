
package Modelo;


public class AuxDueño {
    
    private String denominacionComidad;
    private int cantidadComida;
    private double ingresos;
    private int cantidadPedidos;
    private String nombreCliente;
    private String apellidoCliente;
    private long idCliente;
    private double ganancia;

    public AuxDueño() {
    }

    //Instanciar el Ranking de Comidas:
    public AuxDueño(String denominacionComidad, int cantidadComida) {
        this.denominacionComidad = denominacionComidad;
        this.cantidadComida = cantidadComida;
    }

    //Instanciar la recaudacion:
    public AuxDueño(double ingresos) {
        this.ingresos = ingresos;
    }

    //Instanciar pedidos x cliente:
    public AuxDueño(int cantidadPedidos, String nombreCliente, String apellidoCliente, long idCliente) {
        this.cantidadPedidos = cantidadPedidos;
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        this.idCliente = idCliente;
    }
    
    //Instanciar la ganancia:
    public AuxDueño(double ganacia, String relleno) {
        this.ganancia = ganacia;
    }

    public String getDenominacionComidad() {
        return denominacionComidad;
    }

    public void setDenominacionComidad(String denominacionComidad) {
        this.denominacionComidad = denominacionComidad;
    }

    public int getCantidadComida() {
        return cantidadComida;
    }

    public void setCantidadComida(int cantidadComida) {
        this.cantidadComida = cantidadComida;
    }

    public double getIngresos() {
        return ingresos;
    }

    public void setIngresos(double ingresos) {
        this.ingresos = ingresos;
    }

    public int getCantidadPedidos() {
        return cantidadPedidos;
    }

    public void setCantidadPedidos(int cantidadPedidos) {
        this.cantidadPedidos = cantidadPedidos;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidoCliente() {
        return apellidoCliente;
    }

    public void setApellidoCliente(String apellidoCliente) {
        this.apellidoCliente = apellidoCliente;
    }

    public long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(long idCliente) {
        this.idCliente = idCliente;
    }

    public double getGanancia() {
        return ganancia;
    }

    public void setGanancia(double ganancia) {
        this.ganancia = ganancia;
    }
    
    
    
}
