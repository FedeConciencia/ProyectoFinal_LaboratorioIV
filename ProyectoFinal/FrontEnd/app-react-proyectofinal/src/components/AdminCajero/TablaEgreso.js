import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";

//Permite crear un random de numero hex, dec, etc
var crypto = require("crypto");

//Se descarga libreria moment: npm install moment --save, para el manejo de Date y LocalDate: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:
//Se aplica libreria moment a campo LocalTime y funciona correctamente:


//Se pasan los props (parametros):
const TablaEgreso = (props) => {


 const [datos, setDatos] = useState([])

 const [lista, setLista] = useState([])

 
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getPedido()
    
      

  }, [lista])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getPedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      alert(JSON.stringify(resJson));

      //Este metodo .setState permite asignar a la variable de estado db el .JSON
      setDatos(resJson)

    }catch(error){

      console.log("Error: " + error);

    }
      
  }

  const cambiarEstado = (id, e) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "4",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(JSON.stringify(response))
        //window.location.reload()
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }


  const cambiarEstadoDomicilio = (id, e) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "3",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(JSON.stringify(response))
        
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }

  const crearFactura = async (id, e) => {

        //Insertamos la Factura Generada:
        setFactura(id);

        
        getDetallePedido(id);

        console.log("LISTA DETALLE =>", lista)
         

        const timerDos = setTimeout(() => {

          setDetalleFactura();

        }, 20000);  




        //Creamos el PDF Factura:




  }

  //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
  const passwordCodigo = () => {

            
    var id = crypto.randomBytes(7).toString('hex');

    console.log("CODIGO PEDIDO => ", id)

    return id

}


  const setFactura = (id) => {

     //Guardo el codigo generado Random:
     let codigo = passwordCodigo();

     const pedido = getPedidoId(id);

     let montoDescuento = 0;

     if(pedido !== undefined){

      console.log("INGRESO A CARGA FACTURA")

     const timerUno = setTimeout(() => {

      if(pedido.tipoEnvio === 1){

          montoDescuento = (pedido.total / 0.9) - pedido.total;  

      }


      axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
          params: {

              action:'insertar',
              codigo: codigo,
              montoDescuento: montoDescuento,
              formaPago: "verificada",
              totalVenta: pedido.total,
              fechaAlta: moment().format('YYYY-MM-DD'), 
              fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
              estado: "activo",
              idPedido: id,
          

          }
        })
      .then(response => {

        console.log("CARGA FACTURA => ", response.data)

          
      })
      .catch(error =>{
          console.log("Error");
          console.log(error);
      })

    }, 20000); 
    
  }

  }


  const getPedidoId = (id) => {


    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'buscar',
                    idPedido: id, 
                    
        
                    //fechaAlta, fechaBaja, estado se crean x defecto:
        
        
                }
              })
            .then(response => {
        
              console.log("PEDIDO => ", response.data)

                return response.data

            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


  }


  const getDetallePedido = (id) => {


    axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet", {
                params: {

        
                    action:'listarXId',
                    idPedido: id, 
                    
        
                    //fechaAlta, fechaBaja, estado se crean x defecto:
        
        
                }
              })
            .then(response => {
        
              console.log("LISTA DETALLE PEDIDO => ", response.data)

              

              setLista(response.data);

            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


  }


  const getIdFactura = () => {


    axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
                params: {

        
                    action:'proximoId',
                    
                  
                }
              })
            .then(response => {
      

                console.log("ULTIMO ID FACTURA => ", response.data)

                return response.data
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })

  }  


  const setDetalleFactura = () => {

      console.log(lista)

      let ultimoId = getIdFactura();


      if(lista !== undefined){

        console.log("INGRESO A CARGA DETALLE FACTURA")


      for(let i = 0; i < lista.length; i++){

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet", {
                params: {

        
                    action:'insertar',
                    cantidad: lista[i].cantidad,
                    subTotal: lista[i].subTotal,
                    idFactura: ultimoId,
                    idArticuloManufacturado: lista[i].idArtManufacturado,
                    
        
        
                }
              })
            .then(response => {
        
              console.log("CARGA DETALLE FACTURA => ", response.data)


        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


          }

      }


  }  


   
  //la logica la hacemos antes de pasar la informacion a la vista:
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
                            
                        pedido.estadoPedido > 1 ?

                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).add(5,'M').format('HH:MM:SS')}</td>
                            <td>{ 
                            
                              pedido.estadoPedido  === 2 ?

                              <span>PREPARADO</span>
                              :
                              pedido.estadoPedido  === 3 ?

                              <span>DELIVERY</span>
                              :
                              pedido.estadoPedido  === 4 ?
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