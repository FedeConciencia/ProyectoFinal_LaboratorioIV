import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormFactura = (props) => {


  const [datos, setDatos] = useState([])
    
  
  useEffect(() => {


      getFactura()
     

  },[])


  const getFactura = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=listar");
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
                            <th>Monto Descuento</th>
                            <th>Forma Pago</th>
                            <th>Total Venta</th>
                            <th>Fecha Alta</th>
                            <th>Fecha Baja</th>
                            <th>Estado</th>
                            <th>IdPedido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((factura, i)=> (
                        
                        <tr id={factura.idFactura} key={i}>

                            <td>{factura.idFactura}</td>
                            <td>{factura.codigo}</td>
                            <td>{factura.montoDescuento}</td>
                            <td>{factura.formaPago}</td>
                            <td>{factura.totalVenta}</td>
                            <td>{moment(factura.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(factura.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{factura.estado}</td>
                            <td>{factura.idPedido}</td>
                            <td>

                            <Button href={`actualizarFactura/${factura.idFactura}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicFactura/${factura.idFactura}`} className="boton" variant="danger" size="sm">DELETE</Button>
                           

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarFactura`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormFactura;