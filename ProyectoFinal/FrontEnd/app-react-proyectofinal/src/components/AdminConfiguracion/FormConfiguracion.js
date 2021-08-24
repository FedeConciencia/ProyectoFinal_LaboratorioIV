import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Se pasan los props (parametros):
const FormConfiguracion = (props) => {


 const [datos, setDatos] = useState([])
    
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getConfiguracion()
    
      

  }, [])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getConfiguracion = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet?action=listar");
      const resJson = await response.json();
      alert(JSON.stringify(resJson));

      //Este metodo .setDatos permite asignar a la variable de estado db el .JSON
      setDatos(resJson)

    }catch(error){

      console.log("Error: " + error);

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
                            <th>Cantidad_Cocineros</th>
                            <th>Email_Empresa</th>
                            <th>Token_Mercado_Pago</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((configuracion, i)=> (
                        
                        <tr id={configuracion.idConfiguracion} key={i}>

                            <td>{configuracion.idConfiguracion}</td>
                            <td>{configuracion.cantidadCocineros}</td>
                            <td>{configuracion.emailEmpresa}</td>
                            <td>{configuracion.tokenMercadoPago}</td>
                            <td>{moment(configuracion.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(configuracion.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{configuracion.estado}</td>
                            <td>

                            <Button href={`actualizarConfiguracion/${configuracion.idConfiguracion}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicConfiguracion/${configuracion.idConfiguracion}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarConfiguracion/${configuracion.idConfiguracion}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`/registrarConfiguracion`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>            
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormConfiguracion;