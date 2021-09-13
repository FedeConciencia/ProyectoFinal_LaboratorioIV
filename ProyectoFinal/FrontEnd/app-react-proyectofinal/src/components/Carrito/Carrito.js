import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/carrito.css';
import Alert from "react-bootstrap/Alert";
import ModalCarritoVacio from './ModalCarritoVacio';

const Carrito = (props) => {

    const [datos, setDatos] = useState([])

    //Estado que permite forzar una actualizacion con useEffect:
    const [recargar, setRecargar] = useState(false)

    // Hook modal carrito vacio
    const [modalCarrito, setModalCarrito] = useState()

    // Hook cantidadTotal 
    const [cantidadTotal, setCantidadTotal] = useState(0)

    // Hook sinStock 
    const [sinStock, setSinStock] = useState(true)

    useEffect(() => {
        //Guardamos en el estado datos los valores obtenidos del localStorage productos:
        setDatos(JSON.parse(localStorage.getItem("productos")))
        activarModal()
        obtenerCantidadesTotales()
        //Fuerza la actualizacion del componente:
        setRecargar(false)
    }, [recargar, cantidadTotal])

    //Metodo para incrementar cantidad desde el evento boton:

    const sumar = (indice, event) => {
        console.log(datos[indice].cantidad)
        console.log(event) 
        console.log("Bandera sinStock =>", sinStock) 
        hayIngredientes(datos[indice].idArticulo, datos[indice].cantidad);

        if(sinStock){
            
            datos[indice].cantidad++;
            console.log(datos[indice].cantidad)
            localStorage.setItem("productos", JSON.stringify(datos))
        }
        else {
            console.log("Ingreso mensaje ?????")
            document.querySelector("#mensaje").innerHTML = "No hay suficientes ingredientes."
        }
        //Fuerza la actualizacion del componente:
        setRecargar(true)
    }


    const hayIngredientes = async (id, cantidad) => {
        
            const responseIngre = await fetch("http://localhost:8080/ProyectoFinalLaboIV/AuxIngredientesServlet?action=listar&idArticulo="+id); 
            const resJsonIngre = await responseIngre.json();
            console.log(resJsonIngre)
            let cantidadAux = 0
            

            for (let i = 0; i < resJsonIngre.length; i++) {
                
                cantidadAux = (cantidad * resJsonIngre[i].cantidad)
                console.log("cantidadAux", cantidadAux)
                console.log("sumaCantidad", cantidad)
                console.log("resJsonIngre[i].cantidad", resJsonIngre[i].cantidad)
                if(cantidadAux > resJsonIngre[i].stockActual){
                    console.log("Condicion ingreso => ", cantidadAux > resJsonIngre[i].stockActual)
                    setSinStock(false);
                    
                }
                
            }
            console.log(sinStock)
            
       
    }

    //Metodo para decrementar cantidad desde el evento boton:

    const restar = (indice, event) => {
        console.log(datos[indice].cantidad)
        console.log(event)
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

                <Button href={`/`} className="boton" variant="success" size="lg">CONFIRMAR</Button>&nbsp;&nbsp;&nbsp;
                
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