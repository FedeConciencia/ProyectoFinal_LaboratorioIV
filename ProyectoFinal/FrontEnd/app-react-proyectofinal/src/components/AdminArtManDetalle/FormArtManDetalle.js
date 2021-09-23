import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import { ContextoUsuario } from "../ContextoUsuario";

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Se pasan los props (parametros):
const FormArtManDetalle = (props) => {


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
      getArtManDetalle()
    
      

  }, [])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getArtManDetalle = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=listar");
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
                            <th>Cantidad</th>
                            <th>Unidad_Medida</th>
                            <th>IdArtManufacturado</th>
                            <th>IdArtInsumo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((articulo, i)=> (
                        
                        <tr id={articulo.idArticuloDetalle} key={i}>

                            <td>{articulo.idArticuloDetalle}</td>
                            <td>{articulo.cantidad}</td>
                            <td>{articulo.unidadMedida}</td>
                            <td>{articulo.idArticuloManufacturado}</td>
                            <td>{articulo.idArticuloInsumo}</td>
                            <td>

                            <Button href={`actualizarArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarArtManDetalle`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <VerificarRolUsuario />

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormArtManDetalle;