import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormUsuario = (props) => {


  const [datos, setDatos] = useState([])
    
  
  useEffect(() => {


      getUsuario()

  },[])


  //Metodo para obtener todos los usuarios =>
  const getUsuario = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
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
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Rol</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>IdCliente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((usuario, i)=> (
                        
                        <tr id={usuario.idUsuario} key={i}>

                            <td>{usuario.idUsuario}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.contraseña}</td>
                            <td>{usuario.rol}</td>
                            <td>{moment(usuario.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(usuario.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{usuario.estado}</td>
                            <td>{usuario.idCliente}</td>
                            <td>

                            <Button href={`actualizarUsuario/${usuario.idUsuario}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicUsuario/${usuario.idUsuario}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarUsuario`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>            
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormUsuario;