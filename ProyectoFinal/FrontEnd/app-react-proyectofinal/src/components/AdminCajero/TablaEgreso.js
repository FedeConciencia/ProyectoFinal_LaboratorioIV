import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { jsPDF } from "jspdf";


//const nodemailer = require("nodemailer");

//Permite crear un random de numero hex, dec, etc
var crypto = require("crypto");

//Se descarga libreria moment: npm install moment --save, para el manejo de Date y LocalDate: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:
//Se aplica libreria moment a campo LocalTime y funciona correctamente:


//Actualizado con Axios con Async Await y Variables Globales =>
const TablaEgreso = (props) => {

//Redireccion de la Pagina:
 let history = useHistory();

 //Substituir por let los Hooks variables globales=>

 let pruebaPedido  = {};
 let pruebaIdFactura = 0;
 let email = "";
 let pruebaLista = new Array();
 


  // Hooks dentro de useEffect =>

  const [datos, setDatos] = useState([])

  /*

 const [pedido, setPedido] = useState({})

 const [idFactura, setIdFactura] = useState()

 const [lista, setLista] = useState([])

 */

 
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

      //Se ejecuta el metodo getOne al cargar la pagina
      getPedido()

  }, [])


  //Metodo para obtener lista de todos los pedidos se ejecuta en el useEffect (cargar pagina) =>

  const getPedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      console.log("LISTA DE PEDIDOS =>",resJson);

      //Este metodo .setState permite asignar a la variable de estado db el .JSON
      setDatos(resJson)

    }catch(error){

      console.log("Error: " + error);

    }
      
  }

  //Libreria axios y promesa para evento onClick cambiarEstado (Actualizacion de estadoPedido en Pedido) =>

  const cambiarEstado = (id, e) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "4",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(response)
        
        //Redireccionar a la pagina form cliente:
        history.push('/returnTablaEgreso');
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }


  //Libreria axios y promesa para evento onClick cambiarEstado (Actualizacion de estadoPedido en Pedido) si es pedido Domicilio (Delivery) =>

  const cambiarEstadoDomicilio = (id, e) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "3",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(response)

        //Redireccionar a la pagina form cliente:
        history.push('/returnTablaEgreso');
        
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }


  //Estado Finalizado =>

  const cambiarEstadoFinalizado = (id) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "5",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(response)

        //Redireccionar a la pagina form cliente:
        history.push('/returnTablaEgreso');
        
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }

  /*

  //Metodo para crear la factura con setTimeOut (tiempo espera) =>

  const crearFactura = (id, e) => {

      
      //Obtenemos el pedido buscado por idPedido =>
      getPedidoId(id);
      
      
      //Se ejecuta una esperda de 10 segundos:
      const timerDos = setTimeout(() => {
        //Insertamos la Factura Generada =>
        setFactura(id);
      }, 3000);

      //Se ejecuta una esperda de 15 segundos:
      const timerTres = setTimeout(() => {
        //Listamos todos los detallesPedidos asociados al idPedido =>
        getDetallePedido(id);
      }, 5000);

      //Se ejecuta una esperda de 20 segundos:
      const timerCuatro = setTimeout(() => {
        //Creamos los detalles_Facturas con los detalles_Pedidos asociados al idPedido =>
        setDetalleFactura();
      }, 10000);  

         
      //Creamos el PDF Factura:


  }

  */

  //Metodo Crear Factura (Testeo) con Async-Await =>

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


    //Generar mail:


    //Un estado mas 5 que bloquea el boton final
    await cambiarEstadoFinalizado(id);


}

//Metodo para generar PDF =>
const crearPdf = async () => {

  //Se obtiene el email del cliente a traves del id_Factura =>
  await getEmail();

  console.log("EMAIL DENTRO DE PDF => ", email)

  let doc = new jsPDF();

  try{


    const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxFacturaPedidoServlet", {
          params: {

  
              action:'listar',
              idFactura: pruebaIdFactura, 
              

          }
    })

    //Axios no hace falta pasar a JSON el response =>
    const resJson = await response.data;
      
    console.log("PDF => ", resJson)


 
    //Genera el PDF desde REACT =>
    
    doc.text("Fecha: " + moment().format('YYYY-MM-DD'), 150, 10);
    doc.text("Codigo Factura: " + resJson[0].codigo , 10, 10);
    doc.text("-------------------------------", 10, 20);
    if(resJson[0].tipoEnvio === 1){

      doc.text("Tipo de Envio: Domicilio" , 10, 30);

    }else{

      doc.text("Tipo de Envio: Retiro Local" , 10, 30);

    }

    doc.text("-------------------------------", 10, 40);

    doc.text("Metodo Pago: " + resJson[0].metodoPago , 10, 50);

    doc.text("-------------------------------", 10, 60);

    let contador = 60;

    for(let i = 0; i < resJson.length; i ++){

      contador += 10;
      doc.text("Producto: " + resJson[i].denominacion, 10, contador);
      contador += 10;
      doc.text("Cantidad: " + resJson[i].cantidad, 10, contador);
      contador += 10;
      doc.text("Precio Unitario: $" + resJson[i].precioVenta, 10, contador);
      contador += 10;
      doc.text("SubTotal: $" + resJson[i].subTotal, 10, contador);
      contador += 10;
      doc.text("-------------------------------", 10, contador);

    }

    contador += 10;
    doc.text("Descuento: $" + resJson[0].montoDescuento, 10, contador);
    contador += 10;
    doc.text("Total: $" + resJson[0].total, 10, contador);

    //Guarda el Documento =>
    //doc.save("factura.pdf");

    //Enviar Email:

    //Se pasa el documento pdf a formato base64:
    let pdfBase64 = doc.output('datauristring');

    //var blob = doc.output();
    //var dataUri = "data:" + "application/pdf" + ";base64," + btoa(blob);


    console.log(pdfBase64);

    /*

    //Envio Mail con Nodemade =>
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'mina.williamson96@ethereal.email',
          pass: '9JqM9ZmEeFVjxjkRKx'
      }
    });

    const mailOptions = {
      from: 'mina.williamson96@ethereal.email',
      to: 'federicosabatini@gmail.com',
      subject: 'EL BUEN SABOR => FACTURA',
      text: 'Hola, El Buen Sabor le adjunta la Factura.\nGracias por elegirnos.\nSaludos',
      
      attachments: [{
        filename: 'Factura.pdf',
        path: `${pdfBase64}`,
        contentType: 'application/pdf',
      }],

      
      
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 

    */

    /*
    //Envio Mail con SmtpJS =>
    window.Email.send({
      SecureToken : "2482a8b0-c4d5-4179-9600-558f70ea4ba3", //Se crea desde la pagina => https://smtpjs.com/ 
      To : `${email}`,
      From : "mina.williamson96@ethereal.email",
      Subject : "EL BUEN SABOR => FACTURA",
      Body : "Hola, El Buen Sabor le adjunta la Factura.\nGracias por elegirnos.\nSaludos",
      
      Attachments : [
        {
          name : "generated.pdf", //El nombre debe ser el mismo de la generacion del pdf x doc.output
          path : pdfBase64,
        }]
      
    }).then(
      message => alert(message)
    );

    //Se debe crear el password para aplicaciones desde la cuenta de Gmail => https://www.youtube.com/watch?v=j70RVlA2rwU
    
    */
  

  }catch(error){

    console.log("ERROR =>", error)

  }

}


//Metodo Async-Await con Axios para obtener el email del cliente x idFactura =>

const getEmail = async () => {

  try{


    const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
          params: {

  
              action:'emailXid',
              idFactura: pruebaIdFactura, 
              
  
          }
    })

    //Axios no hace falta pasar a JSON el response =>
    const resJson = await response.data;
      
    console.log("GET ID_FACTURA X EMAIL => ", resJson)

    //setPedido(resJson)

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

  //Metodo Async-Await con Axios para obtener el pedido por idPedido =>

  const getPedidoId = async (id) => {

    try{


      const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
            params: {

    
                action:'buscar',
                idPedido: id, 
                
    
                //fechaAlta, fechaBaja, estado se crean x defecto:
    
    
            }
      })

      //Axios no hace falta pasar a JSON el response =>
      const resJson = await response.data;
        
      console.log("PEDIDO => ", resJson)

      //setPedido(resJson)

      pruebaPedido = resJson;
      
      console.log("GET_PEDIDO(SIN HOOKS) => ", pruebaPedido)

    }catch(error){

      console.log("ERROR =>", error)

    }

  }

  //Metodo Async-Await con Axios para crear la Factura =>

  const setFactura = async (id) => {

     //Guardo el codigo generado Random:
     let codigo = passwordCodigo();

     console.log("PEDIDO DENTRO SET_FACTURA =>", pruebaPedido)

     let montoDescuento = 0;

     if(pruebaPedido !== undefined){

      console.log("INGRESO A CARGA FACTURA")


      if(pruebaPedido.tipoEnvio === 1){

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

        //Axios no hace falta pasar a JSON el response =>
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

      //Axios no hace falta pasar a JSON el response =>

      const resJson = await response.data;

      console.log("LISTA DETALLE PEDIDO => ", resJson)

      //setLista(resJson);

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

      //Axios no hace falta pasar a JSON el response =>

      const resJson = await response.data;

      console.log("ULTIMO ID FACTURA => ", resJson)

      //setIdFactura(resJson)

      pruebaIdFactura = resJson;

      console.log("GET_ID_FACTURA(HOOK) => ", pruebaIdFactura)
            
      
    }catch(error){


      console.log("ERROR =>", error)

    }  
                
        
  }  


  const setDetalleFactura = async () => {

      console.log("LISTA DETALLE_PEDIDO EN SET_DETALLE_FACTURA=> ", pruebaLista)

      
      //Esperamos la ejecucion con await =>
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