import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { jsPDF } from "jspdf";


var crypto = require("crypto");


const TablaEgreso = (props) => {


  let history = useHistory();



  let pruebaPedido  = {};
  let pruebaIdFactura = 0;
  let email = "";
  let pruebaLista = new Array();
 

  const [datos, setDatos] = useState([])

  
  useEffect(() => {

 
      getPedido()

  }, [])


  //Metodo para obtener lista de todos los pedidos  =>
  const getPedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      console.log("LISTA DE PEDIDOS =>",resJson);

      setDatos(resJson)

    }catch(error){

      console.log("Error: " + error);

    }
      
  }

  //Metodo evento onClick cambiarEstado (Actualizacion de estadoPedido en Pedido) =>
  const cambiarEstado = async (id, e) => {

    try{

      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
          params: {

              action:'actualizarEstado',
              estado: "4",
              idPedido: id,
          

          }
      })

      const resJson = await response.data

      console.log(resJson)

      history.push('/returnTablaEgreso');

    }catch(error){

      console.log(error)

    }  

  }


  //Metodo evento onClick cambiarEstado (Actualizacion de estadoPedido en Pedido) si es pedido Domicilio (Delivery) =>
  const cambiarEstadoDomicilio = async (id, e) => {

    try{

      
      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
          params: {

              action:'actualizarEstado',
              estado: "3",
              idPedido: id,
          

          }
        })
        
        const resJson = await response.data

        console.log(resJson)
  
        history.push('/returnTablaEgreso');
  
      }catch(error){
  
        console.log(error)
  
      }  

  }


  //Metodo evento Estado Finalizado =>
  const cambiarEstadoFinalizado = async (id, e) => {

    try{

        const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
          params: {

              action:'actualizarEstado',
              estado: "5",
              idPedido: id,
          

          }
        })
      
        const resJson = await response.data

        console.log(resJson)

        history.push('/returnTablaEgreso');

    }catch(error){

        console.log(error)

    }  


  }

  

  //Metodo Crear Factura  =>
  const crearFactura = async (id, e) => {

      
    //Obtenemos el pedido buscado por idPedido =>
    await getPedidoId(id);
    
    
    //Insertamos la Factura Generada =>
    await setFactura(id);
    

    //Listamos todos los detallesPedidos asociados al idPedido =>
    await getDetallePedido(id);
    

    //Creamos los detalles_Facturas con los detalles_Pedidos asociados al idPedido =>
    await setDetalleFactura();
   

    //Creamos el PDF Factura:
    await crearPdf()


    //Un estado mas 5 que bloquea el boton final
    await cambiarEstadoFinalizado(id);


  }

  //Metodo para generar PDF Factura desde el Servidor y enviar al Mail =>
  const crearPdf = async () => {

    //Se obtiene el email del cliente a traves del id_Factura =>
    await getEmail();

    console.log("EMAIL DENTRO DE PDF => ", email)


    try{


      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxFacturaPedidoServlet", {
            params: {

    
                action:'pdfMail',
                idFactura: pruebaIdFactura,
                email: email,
                

            }
      })

      const resJson = await response.data;
        
      console.log("PDF => ", resJson)


    }catch(error){

      console.log("ERROR =>", error)

    }

  }


  //Metodo  para obtener el email del cliente x idFactura =>
  const getEmail = async () => {

    try{


      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
            params: {

    
                action:'emailXid',
                idFactura: pruebaIdFactura, 
                
    
            }
      })

      const resJson = await response.data;
        
      console.log("GET ID_FACTURA X EMAIL => ", resJson)

      email = resJson;
      
      console.log("ID_FACTURA X EMAIL(SIN HOOKS) => ", email)

    }catch(error){

      console.log("ERROR =>", error)

    }

  }


  //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
  const passwordCodigo = () => {

            
    var id = crypto.randomBytes(7).toString('hex');

    console.log("CODIGO PEDIDO => ", id)

    return id

  }

  //Metodo para obtener el pedido por idPedido =>
  const getPedidoId = async (id) => {

    try{


      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
            params: {

    
                action:'buscar',
                idPedido: id, 
                  
    
            }
      })

      
      const resJson = await response.data;
        
      console.log("PEDIDO => ", resJson)

      pruebaPedido = resJson;
      
      console.log("GET_PEDIDO(SIN HOOKS) => ", pruebaPedido)

    }catch(error){

      console.log("ERROR =>", error)

    }

  }

  //Metodo para crear la Factura =>
  const setFactura = async (id) => {

     
     let codigo = passwordCodigo();

     console.log("PEDIDO DENTRO SET_FACTURA =>", pruebaPedido)

     let montoDescuento = 0;

     if(pruebaPedido !== undefined){

      console.log("INGRESO A CARGA FACTURA")


      if(pruebaPedido.tipoEnvio === 2){

          montoDescuento = (pruebaPedido.total / 0.9) - pruebaPedido.total;  

      }


      try{


        const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
            params: {

                action:'insertar',
                codigo: codigo,
                montoDescuento: montoDescuento,
                formaPago: "verificada",
                totalVenta: pruebaPedido.total,
                fechaAlta: moment().format('YYYY-MM-DD'), 
                fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                estado: "activo",
                idPedido: id,
            

            }
          })

        
          const resJson = await response.data;
          
          console.log("FACTURA CREADA => ", resJson)
      
        }catch(error){

          console.log("ERROR =>", error)

        }
      

    }
    
  }


  const getDetallePedido = async (id) => {

    try{

      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet", {
          params: {

  
              action:'listarXId',
              idPedido: id, 
              
          }
      })

    
      const resJson = await response.data;

      console.log("LISTA DETALLE PEDIDO => ", resJson)

      pruebaLista = resJson;

      console.log("GET_LISTA(HOOK) => ", pruebaLista)

    }catch(error){

      console.log("ERROR =>", error)


    }    

  }


  const getIdFactura = async () => {

    try{

      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
          params: {

  
              action:'buscarUltimoId',
              
            
          }
      })

    

      const resJson = await response.data;

      console.log("ULTIMO ID FACTURA => ", resJson)

      pruebaIdFactura = resJson;

      console.log("GET_ID_FACTURA(HOOK) => ", pruebaIdFactura)
            
      
    }catch(error){


      console.log("ERROR =>", error)

    }  
                
        
  }  


  const setDetalleFactura = async () => {

      console.log("LISTA DETALLE_PEDIDO EN SET_DETALLE_FACTURA=> ", pruebaLista)

      await getIdFactura();
           
      if(pruebaLista !== undefined){

        console.log("INGRESO A CARGA DETALLE_FACTURA")


      for(let i = 0; i < pruebaLista.length; i++){

        try{

          const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet", {
                params: {

        
                    action:'insertar',
                    cantidad: pruebaLista[i].cantidad,
                    subTotal: pruebaLista[i].subTotal,
                    idFactura: pruebaIdFactura,
                    idArticuloManufacturado: pruebaLista[i].idArticuloManufacturado,
                    
        
        
                }
          })

          const resJson = await response.data

          console.log("CARGA DETALLE FACTURA => ", resJson)


        }catch(error){

          console.log("ERROR =>", error)

        }     
            
      
      }      

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
                            
                        pedido.estadoPedido > 1 && pedido.estadoPedido < 6 ?

                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).format('LTS')}</td>
                            <td>{ 
                            
                              pedido.estadoPedido  === 2 ?

                              <span>PREPARADO</span>
                              :
                              pedido.estadoPedido  === 3 ?

                              <span>DELIVERY</span>
                              :
                              pedido.estadoPedido  === 4 ?
                              <span>FACTURAR</span>
                              :
                              pedido.estadoPedido  === 5 ?
                              <span>FINALIZADO</span>
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
                            {  pedido.estadoPedido === 4 ?

                            <Button onClick={ (e) => crearFactura(pedido.idPedido, e) }  className="boton" variant="danger" size="sm">FACTURAR</Button>
                            :
  
                            pedido.tipoEnvio === 1 && pedido.estadoPedido === 2 ?
                            <Button onClick={ (e) => cambiarEstadoDomicilio(pedido.idPedido, e) }  className="boton" variant="warning" size="sm">DELIVERY</Button>
                            :
                            pedido.estadoPedido === 5 ?
                            <></>
                            :
                            <Button onClick={ (e) => cambiarEstado(pedido.idPedido, e) }  className="boton" variant="primary" size="sm">CONFIRMAR</Button>
                        
                            }
                            
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


export default TablaEgreso;