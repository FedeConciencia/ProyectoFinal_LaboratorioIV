import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';



const ConfirmarPedido = (props) => {


    let history = useHistory();


    const [datos, setDatos] = useState([])
 


    useEffect(() => {


        getPedido()
      

    }, [])


    //Metodo para obtener los pedidos =>
    const getPedido = async () => {

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
        const resJson = await response.json();

        setDatos(resJson)

      }catch(error){

        console.log("Error: " + error);

      }
        
    }

    //Metodo evento para cambiar el estadoPedido =>
    const cambiarEstado = async (id, e) => {

      try{

        const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
            params: {

                action:'actualizarEstado',
                estado: "2",
                idPedido: id,
            

            }
        })

        const resJson = await response.data

        console.log(resJson)

        history.push('/returnConfirmarPedido');
      
      }catch(error){

        console.log(error)

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
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((pedido, i)=> ( 
                            
                        pedido.estadoPedido === 1 ?

                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).format('LTS')}</td>
                            <td>{pedido.estadoPedido  === 1 ?

                              <span>COCINA</span>
                              :
                              <span></span>
                            
                            
                            }</td>
                            <td>
                              {pedido.tipoEnvio === 1 ?
                            
                              <span>DOMICILIO</span>
                              :
                              <span>RETIRO LOCAL</span>
                            
                            }</td>
                            <td>{pedido.total}</td>
                            <td>

                            <Button onClick={ (e) => cambiarEstado(pedido.idPedido, e) }  className="boton" variant="primary" size="sm">CONFIRMAR</Button>
                            

                            </td>
                           

                        </tr>

                        :

                        <></>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                
                <Button type="button" href={`/cocineroPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default ConfirmarPedido;