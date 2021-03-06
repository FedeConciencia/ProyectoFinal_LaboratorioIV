import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { jsPDF } from "jspdf";


const HistorialCliente = (props) => {


    let history = useHistory();


    const [datos, setDatos] = useState([])
 

    useEffect(() => {

          
        getFacturasXEmail()
      

    }, [])


    //Metodo para obtener todas las facturas asociadas al cliente x email:
    const getFacturasXEmail = async () => {

      
      let emails = JSON.parse(localStorage.getItem("usuario")).usuario;

      console.log("EMAIL =>", emails)

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=listarXemail&email="+emails);
        const resJson = await response.json();

        setDatos(resJson)

      }catch(error){

        console.log("Error: " + error);

      }
        
    }

    //Metodo para generar PDF de Factura desde Aplicacion Cliente =>
    const crearPdf = async (idFactura, e) => {

        let doc = new jsPDF();
      
        try{
      
      
            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxFacturaPedidoServlet", {
                  params: {
        
          
                      action:'listar',
                      idFactura: idFactura, 

          
                  }
            })
        
            
            const resJson = await response.data;
              
            console.log("PDF => ", resJson)
            
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
        
            doc.save("factura.pdf");

      
        }catch(error){
      
            console.log("ERROR =>", error)
      
        }
      
      }

  
      return (

      <Fragment>

            <div className="center">

            <Container>

            <br></br>  
            <br></br> 

            <Alert variant="success">                  

                <Alert.Heading className="titulo">HISTORIAL FACTURAS CLIENTE</Alert.Heading>


                <Form>

                <br></br>
                <br></br>      

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Descuento</th>
                            <th>Total Venta</th>
                            <th>Forma Pago</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((factura, i)=> ( 
                            
                        
                        <tr id={factura.idFactura} key={i}>

                            <td>{factura.codigo}</td>
                            <td>{factura.montoDescuento}</td>
                            <td>{factura.totalVenta}</td>
                            <td>{factura.formaPago}</td>
                            <td>{moment(factura.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD')}</td>
                            <td>

                            <Button onClick={ (e) => crearPdf(factura.idFactura, e) }  className="boton" variant="danger" size="sm">GENERAR FACTURA</Button>
                            
                            </td>
                           

                        </tr> 

                        ))}

                            
                    </tbody>
                    
                </Table>

                <br></br>

                
                <Button type="button" href={`/`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>

                </Alert>

                </Container>
            </div>

         
      </Fragment>
      );                        

}


export default HistorialCliente;