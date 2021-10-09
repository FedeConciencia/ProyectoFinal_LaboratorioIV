import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormMercadoPago = (props) => {


  const [datos, setDatos] = useState([])
    
  
  useEffect(() => {

      getMercadoPago()
    
    
  },[])

  //Metodo para obtener todos los registros =>
  const getMercadoPago = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet?action=listar");
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
                            <th>Codigo</th>
                            <th>Fecha Alta</th>
                            <th>Fecha Aprobacion</th>
                            <th>fecha_Baja</th>
                            <th>Metodo Pago</th>
                            <th>Numero Tarjeta</th>
                            <th>Estado</th>
                            <th>IdPedido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((mercado, i)=> (
                        
                        <tr id={mercado.idMercadoPago} key={i}>

                            <td>{mercado.idMercadoPago}</td>
                            <td>{mercado.codigo}</td>
                            <td>{moment(mercado.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(mercado.fechaAprobacion).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(mercado.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{mercado.metodoPago}</td>
                            <td>{mercado.numeroTarjeta}</td>
                            <td>{mercado.estado}</td>
                            <td>{mercado.idPedido}</td>
                            <td>

                            <Button href={`actualizarMercadoPago/${mercado.idMercadoPago}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicMercadoPago/${mercado.idMercadoPago}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            
                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarMercadoPago`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormMercadoPago;