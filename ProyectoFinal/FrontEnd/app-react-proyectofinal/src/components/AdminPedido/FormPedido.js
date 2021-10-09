import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';


const FormPedido = (props) => {


  const [datos, setDatos] = useState([])
    

  useEffect(() => {

        
      getPedido()
    
    
  },[])

  //Metodo para listar pedidos =>
  const getPedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
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
                            <th>Hora Estimada</th>
                            <th>Estado Pedido</th>
                            <th>Tipo Envio</th>
                            <th>Total</th>
                            <th>Fecha Alta</th>
                            <th>Fecha Baja</th>
                            <th>Estado</th>
                            <th>IdCliente</th>
                            <th>IdDomicilio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((pedido, i)=> (
                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).add(5,'M').format('HH:MM:SS')}</td>
                            <td>{pedido.estadoPedido}</td>
                            <td>{pedido.tipoEnvio}</td>
                            <td>{pedido.total}</td>
                            <td>{moment(pedido.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(pedido.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{pedido.estado}</td>
                            <td>{pedido.idCliente}</td>
                            <td>{pedido.idDomicilio}</td>
                            <td>

                            <Button href={`actualizarPedido/${pedido.idPedido}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicPedido/${pedido.idPedido}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarPedido`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormPedido;