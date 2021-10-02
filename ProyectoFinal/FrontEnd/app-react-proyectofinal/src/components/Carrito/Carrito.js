import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/carrito.css';
import Alert from "react-bootstrap/Alert";
import ModalCarritoVacio from './ModalCarritoVacio';

const Carrito = (props) => {

    let ingredientes = new Array();
    let productos = new Array();
    let sinStock = true; //Se modifica por una variable global

    //Estado para guardar los productos del localStorage =>
    const [datos, setDatos] = useState([])

    const [ingred, setIngred] = useState([])

    //Estado que permite forzar una actualizacion con useEffect:
    const [recargar, setRecargar] = useState(false)

    // Hook modal carrito vacio
    const [modalCarrito, setModalCarrito] = useState()

    // Hook cantidadTotal 
    const [cantidadTotal, setCantidadTotal] = useState(0)


    useEffect(() => {
        
        //Guardamos en el estado datos los valores obtenidos del localStorage productos:
        setDatos(JSON.parse(localStorage.getItem("productos")))
        productos = JSON.parse(localStorage.getItem("productos"))
        console.log("VALOR PRODUCTOS => ", productos)
        //Guardamos todos los ingredientes de los articulos que se encuentran en el carrito.
        obtenerIngredientes(productos)
        console.log("VALOR INGREDIENTES => ", ingredientes)
        //Mantiene actualizado cantidad_Total y monto_Total
        obtenerCantidadesTotales()
        //Activa el modal si no existen productos en el carrito
        activarModal()
        //Fuerza la actualizacion del componente:
        setRecargar(false)

    }, [recargar, cantidadTotal])

    

    //Metodo para incrementar cantidad desde el evento boton:

    const sumar = (indice, e) => {

        //Se cambia al ingresar el incremento, se muestra actualizado =>
        datos[indice].cantidad++;

        //Verifico el stock de ingredientes =>
        verificarStockIngredientes(datos[indice].cantidad);

        if(sinStock === true){
        
            console.log(datos[indice].cantidad)
            //Guardo la actualizacion de datos.
            localStorage.setItem("productos", JSON.stringify(datos))
        }
        else {
             //Se decrementa manteniendo igual =>
            datos[indice].cantidad--;
            document.querySelector("#mensaje").innerHTML = "No hay suficientes ingredientes: " + datos[indice].denominacion + " !!!"
        }
        //Fuerza la actualizacion del componente:
        setRecargar(true)
    }

     //Metodo para decrementar cantidad desde el evento boton:

     const restar = (indice, e) => {

        //Libera si se bloquea el de sumar por falta de stock y disminuye:
        sinStock = true;

        //No hace falta decrementar ingredientes ya que no se estan modificando ni en local, variables o BD solo como logica de eventos =>

        console.log(datos[indice].cantidad)
        datos[indice].cantidad--;
        console.log(datos[indice].cantidad)

        //Si cantidad es 0 elimina el producto con el indice y actualiza el localStorage:
        if(datos[indice].cantidad === 0){
            datos.splice(indice, 1)
        }

        localStorage.setItem("productos", JSON.stringify(datos))
        //Se borra mensaje:
        document.querySelector("#mensaje").innerHTML = ""
        //Fuerza la actualizacion del componente:
        setRecargar(true)
    }


    //Metodo para obtener los ingredientes del articulo seleccionado =>
    const obtenerIngredientes = async (datos) => {

        //Ahora podemos obtener todos los ingredientes y guardarlos en un estado =>

        try{

            for(let i = 0; i < datos.length; i++){
        
                const responseIngre = await fetch("http://localhost:8080/ProyectoFinalLaboIV/AuxIngredientesServlet?action=listar&idArticulo="+datos[i].idArticulo); 
                const resJsonIngre = await responseIngre.json();
                console.log(resJsonIngre)
            

                for (let i = 0; i < resJsonIngre.length; i++) {

                    ingredientes.push(resJsonIngre[i])

                }    

            }    

            setIngred(ingredientes)

            console.log("INGREDIENTES = > ", ingredientes)

        }catch(error){

            console.log(error)

        }    
 
    }

    //Metodo para verificar stock de ingredientes, producto seleccionado =>
    const verificarStockIngredientes = (cantidad) => {

        console.log("INGRESO VALIDAR STOCK=>")

        let cantidadAux = 0

        for (let i = 0; i < ingred.length; i++) {

            //Ahora sumaCantidad = cantidad esta actualizado todo el tiempo:
                
            cantidadAux = (cantidad * ingred[i].cantidad)
            console.log("cantidadAux", cantidadAux)
            console.log("sumaCantidad", cantidad)
            console.log("resJsonIngre[i].cantidad", ingred[i].cantidad)

            if(cantidadAux > ingred[i].stockActual){
                console.log("Condicion ingreso => ", cantidadAux > ingred[i].stockActual)
                sinStock = false;
                
            }
            
        }

        console.log(sinStock)
        

    }

   
    //Metodo para borrar todos los datos desde el evento boton:

    const borrarTodo = (event) => {
        //Borramos todos los elementos del array datos:
        datos.splice(0, datos.length)
        localStorage.setItem("productos", JSON.stringify(datos))
        //Fuerza la actualizacion del componente:
        setRecargar(true)
    }


    // PRUEBA => Metodo para sumar las cantidades y los totales y mostrar en la celda totalCantidad y totalMonto:

    const obtenerCantidadesTotales = () => {
        
        let array = new Array();
        array = JSON.parse(localStorage.getItem("productos"));
        
        
        if(array) {


            let sumaCantidad = cantidadTotal;
            let sumaMonto = 0;

            for (let i = 0; i < array.length; i++) {
                sumaCantidad += array[i].cantidad;
                sumaMonto += array[i].precioVenta * array[i].cantidad;

            }

            console.log(array)
            console.log(sumaCantidad)
            //Se pasa el valor obtenido para mostrar =>
            document.querySelector("#cantidadTotal").innerHTML = sumaCantidad;
            document.querySelector("#montoTotal").innerHTML = "$ " + sumaMonto;

            //Pasamos el valor del totalCarrito:
            localStorage.setItem("totalCarrito", JSON.stringify(sumaMonto))

            //Fuerza la actualizacion del componente:
            //setRecargar(true)
        }
        else {

            array = [];

           
            //Se pasa el valor obtenido para mostrar =>
            document.querySelector("#cantidadTotal").innerHTML = 0;
            document.querySelector("#montoTotal").innerHTML = "$ " + 0;


            //Fuerza la actualizacion del componente:
            //setRecargar(true)
        }


    }

    function validarCarritoVacio() {
        let array = JSON.parse(localStorage.getItem("productos"));
        if(array)
            return datos === null || array.length === 0
        else
            return true
    }

    function activarModal() {
        console.log("Entro a activar modal")
        //Guardo en una constante el componente modalFaltante y paso el props:
        const modalCarrito = () => {

            return (
                
                //Al componente ModalFaltante le asigamos propiedades que luego son accedidas por el componente para mostrar.
                <ModalCarritoVacio
                validar={validarCarritoVacio}
                ></ModalCarritoVacio>
            );
        }
        console.log("Salgo de activar modal", validarCarritoVacio())
        //Guardo la constante en el estado:  
        setModalCarrito(modalCarrito)
    }


    return(
        <Fragment>
          
            {modalCarrito}

            <div className="center">

            <br></br>

            <Alert variant="success" className="bodyDetalle"> 

                <Form>

                <Alert.Heading className="titulo">CARRITO DE COMPRAS</Alert.Heading>

                <br></br>    

                <br></br>    

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Denominacion</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>

                        
                        {datos !== null ? datos.map((articulo, i)=> (
                        
                        <tr id={articulo.idArticulo} key={i}>

                            <td>{i+1}</td>
                            <td>{articulo.denominacion}</td>
                            <td id="cantidad">{articulo.cantidad}</td>
                            <td>
                                <Button onClick={(e) => sumar(i, e)} className="boton" variant="primary" size="sm">+</Button>&nbsp;&nbsp;
                                <Button onClick={(e) => restar(i, e)} className="boton" variant="warning" size="sm">-</Button>
                            </td>
                            <td>$ {articulo.precioVenta * articulo.cantidad}</td>
                            
                        </tr>

                        )) : (
                            <></>
                        )}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td id="cantidadTotal"></td>
                            <td>
                                <Button onClick={(e) => borrarTodo(e)} className="boton" variant="warning" size="lg">VACIAR</Button>
                            </td>
                            <td id="montoTotal"></td>
                        </tr>
                            
                    </tbody>
                    
                </Table>

                <h3 id="mensaje"></h3>

                <br></br>
                <br></br>

                <Button href={`/verificarDomicilio`} className="boton" variant="success" size="lg">CONFIRMAR</Button>&nbsp;&nbsp;&nbsp;
                
                <Button type="button" href={`/productos`} className="boton" variant="danger" size="lg">RETURN</Button>            
                <br></br>
                <br></br>

                </Form>

            </Alert>    
            </div>

         
      </Fragment>
    )
}

export default Carrito;