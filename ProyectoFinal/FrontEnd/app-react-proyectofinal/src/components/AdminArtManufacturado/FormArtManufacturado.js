import React, { useState, useEffect, Fragment, useContext } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';
import { ContextoUsuario } from "../ContextoUsuario";

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Se pasan los props (parametros):
const FormArtManufacturado = (props) => {


 const [datos, setDatos] = useState([])

   // Hook con el estado actual
   const {usuario, setUsuario} = useContext(ContextoUsuario);

   function VerificarRolUsuario() {
    if(usuario != null && usuario !== undefined) {
      if(usuario["rol"] !== undefined && usuario["rol"] === "administrador"){
          
        return <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>;
        
      }else if(usuario["rol"] !== undefined && usuario["rol"] === "cocinero"){

        return <Button type="button" href={`/cocineroPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>;

      }
    }

    return <span/>;
  }
    
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getArtManufacturado()
    
      

  }, [])



  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getArtManufacturado = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
      const resJson = await response.json();
      alert(JSON.stringify(resJson));

      //Este metodo .setState permite asignar a la variable de estado db el .JSON
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
                            <th>Tiempo_Estimado</th>
                            <th>Denominacion</th>
                            <th>Precio_Venta</th>
                            <th>Imagen</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>IdRubro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((articulo, i)=> (
                        
                        <tr id={articulo.idArticulo} key={i}>

                            <td>{articulo.idArticulo}</td>
                            <td>{articulo.tiempoEstimado}</td>
                            <td>{articulo.denominacion}</td>
                            <td>{articulo.precioVenta}</td>
                            <td>{articulo.imagen}</td>
                            <td>{moment(articulo.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(articulo.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{articulo.estado}</td>
                            <td>{articulo.idRubro}</td>
                            <td>

                            <Button href={`actualizarArtManufacturado/${articulo.idArticulo}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicArtManufacturado/${articulo.idArticulo}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarArtManufacturado`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <VerificarRolUsuario />
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormArtManufacturado;