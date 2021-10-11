import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const TablaIngreso = (props) => {

    let array = new Array(); 

    const [datos, setDatos] = useState([])

    let history = useHistory();


    useEffect(() => {


        getPedido()
      
  

    }, [])


    //Metodo para listar todos los pedidos =>
    const getPedido = async () => {

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
        const resJson = await response.json()

        setDatos(resJson)

      }catch(error){

        console.log("Error: " + error);

      }
        
    }

    //Metodo evento actualizar estadoPedido =>
    const cambiarEstado = async (id, e) => {

      try{

        const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
          params: {

              action:'actualizarEstado',
              estado: "1",
              idPedido: id,
          

          }
        })

        let resJson = await response;

        console.log(resJson)

        //Actualizar Stock, se pasa el idPedido =>
        await decrementarStock(id);

        await history.push('/returnTablaIngreso');

      }catch(error){

        console.log(error)

      }  
    

    }

    //Metodo para decrementar stock (resolucion backend)=>
    const decrementarStock = async(id) => {


        try{

          const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxActualizarStockServlet", {
            params: {

                action:'actualizar',
                idPedido: id,
            

            }

          }) 

          //Obtenemos el array de datos AuxActualizarStock =>
          array = await response.data;
          
          console.log("DATOS INSUMOS => ", array)


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
                            
                        pedido.estadoPedido === 0 ?

                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).add(5,'M').format('HH:MM:SS')}</td>
                            <td>
                              
                              {pedido.estadoPedido === 0 ?
                              <span>POR CONFIRMAR</span>
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

                
                <Button type="button" href={`/cajeroPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default TablaIngreso;