import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormDetallePedido = (props) => {


 const [datos, setDatos] = useState([])
    
  
  useEffect(() => {


      getDetallePedido()
    
  },[])


  const getDetallePedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet?action=listar");
      const resJson = await response.json();
 
      setDatos(resJson)

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


  return (

      <Fragment>
          
          
            <div className="center">

                <Form>

                <br></br>    

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cantidad</th>
                            <th>SubTotal</th>
                            <th>IdPedido</th>
                            <th>IdArticulo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((detallePedido, i)=> (
                        
                        <tr id={detallePedido.idDetallePedido} key={i}>

                            <td>{detallePedido.idDetallePedido}</td>
                            <td>{detallePedido.cantidad}</td>
                            <td>{detallePedido.subTotal}</td>
                            <td>{detallePedido.idPedido}</td>
                            <td>{detallePedido.idArticuloManufacturado}</td>
                            <td>

                            <Button href={`actualizarDetallePedido/${detallePedido.idDetallePedido}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarDetallePedido/${detallePedido.idDetallePedido}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarDetallePedido`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormDetallePedido;