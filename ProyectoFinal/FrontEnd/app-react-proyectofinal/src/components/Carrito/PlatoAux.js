// Clase auxiliar para manejar el carrito con mayor facilidad
export default class PlatoAux {

    constructor(plato) {
        this.idArticulo = plato.idArticulo;
        this.tiempoEstimado = plato.tiempoEstimado;
        this.denominacion = plato.denominacion;
        this.precioVenta = plato.precioVenta;
        this.cantidad = 1;
        this.idRubro = plato.idRubro;
        console.log(plato)
    }
    
}