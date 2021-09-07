import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';

const Carrito = (props) => {

    const [datos, setDatos] = useState([])
    const [recargar, setRecargar] = useState(false)

    useEffect(() => {
        setDatos(JSON.parse(localStorage.getItem("productos")))
        obtenerCantidadesTotales()
        setRecargar(false)
    }, [recargar])

    const sumar = (id, event) => {
        console.log(datos[id].cantidad)
        console.log(event)
        datos[id].cantidad++;
        console.log(datos[id].cantidad)
        localStorage.setItem("productos", JSON.stringify(datos))
        setRecargar(true)
    }

    const restar = (id, event) => {
        console.log(datos[id].cantidad)
        console.log(event)
        datos[id].cantidad--;
        console.log(datos[id].cantidad)

        if(datos[id].cantidad === 0){
            datos.splice(id, 1)
        }

        localStorage.setItem("productos", JSON.stringify(datos))
        setRecargar(true)
    }

    const borrarTodo = (event) => {
        datos.splice(0, datos.length)
        localStorage.setItem("productos", JSON.stringify(datos))
        setRecargar(true)
    }

    function obtenerCantidadesTotales() {
        console.log(document)
        let array = document.querySelectorAll("cantidad")
        let suma = 0
        for (let i = 0; i < array.length; i++) {
            suma += array[i].innerHTML;
        }

        console.log(array)
        console.log(suma)
        //document.getElementById("cantidadTotal").innerHtml = suma;
        console.log(document.getElementsByTagName("cantidadTotal"))
        setRecargar(true)
    }

    return(
        <Fragment>
          
          
            <div className="center">

                <Form>

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
                                <Button onClick={(e) => sumar(i, e)} className="boton" variant="primary" size="mg">+</Button>
                                <Button onClick={(e) => restar(i, e)} className="boton" variant="warning" size="mg">-</Button>
                            </td>
                            <td>${articulo.precioVenta * articulo.cantidad}</td>
                            
                        </tr>

                        )) }
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td name="cantidadTotal">{0}</td>
                            <td>
                                <Button onClick={(e) => borrarTodo(e)} className="boton" variant="warning" size="lg">VACIAR</Button>
                            </td>
                            <td></td>
                        </tr>
                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`/`} className="boton" variant="success" size="lg">CONFIRMAR</Button>&nbsp;&nbsp;&nbsp;
                
                <Button type="button" href={`/productos`} className="boton" variant="danger" size="lg">RETURN</Button>            
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
    )
}

export default Carrito;