package Modelo;

public class AuxActualizarStock {
    
    private int cantidadArticulo;
    private String articulo;
    private String insumo;
    private int cantidadInsumo;
    private double stockActual;
    private long idInsumo;

    public AuxActualizarStock() {
    }

    public AuxActualizarStock(int cantidadArticulo, String articulo, String insumo, int cantidadInsumo, double stockActual, long idInsumo) {
        this.cantidadArticulo = cantidadArticulo;
        this.articulo = articulo;
        this.insumo = insumo;
        this.cantidadInsumo = cantidadInsumo;
        this.stockActual = stockActual;
        this.idInsumo = idInsumo;
    }
    
    

    public int getCantidadArticulo() {
        return cantidadArticulo;
    }

    public void setCantidadArticulo(int cantidadArticulo) {
        this.cantidadArticulo = cantidadArticulo;
    }

    public String getArticulo() {
        return articulo;
    }

    public void setArticulo(String articulo) {
        this.articulo = articulo;
    }

    public String getInsumo() {
        return insumo;
    }

    public void setInsumo(String insumo) {
        this.insumo = insumo;
    }

    public int getCantidadInsumo() {
        return cantidadInsumo;
    }

    public void setCantidadInsumo(int cantidadInsumo) {
        this.cantidadInsumo = cantidadInsumo;
    }

    public double getStockActual() {
        return stockActual;
    }

    public void setStockActual(double stockActual) {
        this.stockActual = stockActual;
    }

    public long getIdInsumo() {
        return idInsumo;
    }

    public void setIdInsumo(long idInsumo) {
        this.idInsumo = idInsumo;
    }
    
    
    
    @Override
    public String toString(){
        
        return "CantidadArticulo: " + cantidadArticulo + "\nArticulo: " + articulo +
                "\nInsumo: " + insumo + "\nCantidadInsumo: " + cantidadInsumo +
                "\nStockActual: " + stockActual + "\nIdInsumo: " + idInsumo;
    }
    
    
    
}

