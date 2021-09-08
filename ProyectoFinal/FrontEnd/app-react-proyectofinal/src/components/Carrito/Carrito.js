import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/carrito.css';
import Alert from "react-bootstrap/Alert";

const Carrito = (props) => {

    const [datos, setDatos] = useState([])

    //Estado que permite forzar una actualizacion con useEffect:
    const [recargar, setRecargar] = useState(false)

    useEffect(() => {
        //Guardamos en el estado datos los valores obtenidos del localStorage productos:
        setDatos(JSON.parse(localStorage.getItem("productos")))
        obtenerCantidadesTotales()
        //Fuerza la actualizacion del componente:
        setRecargar(false)
    }, [recargar])

    //Metodo para incrementar cantidad desde el evento boton:

    const sumar = (id, event) => {
        console.log(datos[id].cantidad)
        console.log(event)
        datos[id].cantidad++;
        console.log(datos[id].cantidad)
        localStorage.setItem("productos", JSON.stringify(datos))
        //Fuerza la actualizacion del componente:
        setRecargar(true)
    }

    //Metodo para decrementar cantidad desde el evento boton:

    const restar = (id, event) => {
        console.log(datos[id].cantidad)
        console.log(event)
        datos[id].cantidad--;
        console.log(datos[id].cantidad)

        //Si cantidad es 0 elimina el producto con el indice y actualiza el localStorage:
        if(datos[id].cantidad === 0){
            datos.splice(id, 1)
        }

        localStorage.setItem("productos", JSON.stringify(datos))
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
        let sumaCantidad = 0;
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


        //Fuerza la actualizacion del componente:
        setRecargar(true)


    }



    return(
        <Fragment>
          
          
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

                        
                        {datos.map((articulo, i)=> (
                        
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

                        )) }
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

                <br></br>

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