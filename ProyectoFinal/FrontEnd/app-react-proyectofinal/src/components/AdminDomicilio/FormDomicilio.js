import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormDomicilio = (props) => {


  const [datos, setDatos] = useState([])
    
  useEffect(() => {

          
       
    getDomicilio()
      
        

  },[])


  
  //Metodo para obtener la lista de domicilios =>
  const getDomicilio = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=listar");
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
                            <th>Calle</th>
                            <th>Numero</th>
                            <th>Localidad</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>IdCliente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((domicilio, i)=> (
                        
                        <tr id={domicilio.idDomicilio} key={i}>

                            <td>{domicilio.idDomicilio}</td>
                            <td>{domicilio.calle}</td>
                            <td>{domicilio.numero}</td>
                            <td>{domicilio.localidad}</td>
                            <td>{moment(domicilio.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(domicilio.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{domicilio.estado}</td>
                            <td>{domicilio.idCliente}</td>
                            <td>

                            <Button href={`actualizarDomicilio/${domicilio.idDomicilio}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicDomicilio/${domicilio.idDomicilio}`} className="boton" variant="danger" size="sm">DELETE</Button>
                           

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarDomicilio`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>                       

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
    );                        

}


export default FormDomicilio;