import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormCliente = (props) => {


 const [datos, setDatos] = useState([])
    
  
  useEffect(() => {

        
      
      getCliente()
    
      

  }, [])


  
  //Metodo que obtiene lista de clientes =>
  const getCliente = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
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
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dni</th>
                            <th>Fecha_Nacimiento</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((cliente, i)=> (
                        
                        <tr id={cliente.idCliente} key={i}>

                            <td>{cliente.idCliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.dni}</td>
                            <td>{moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td>{moment(cliente.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(cliente.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{cliente.estado}</td>
                            <td>

                            <Button href={`actualizarCliente/${cliente.idCliente}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicCliente/${cliente.idCliente}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`/registrarCliente`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>                       
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormCliente;