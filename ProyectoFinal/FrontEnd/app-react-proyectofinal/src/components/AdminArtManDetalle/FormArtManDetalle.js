import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import { ContextoUsuario } from "../ContextoUsuario";


const FormArtManDetalle = (props) => {


    const [datos, setDatos] = useState([])


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
  
    
    useEffect(() => {

        
        getArtManDetalle()
      
      
    }, [])




    const getArtManDetalle = async () => {

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=listar");
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
                            <Button href={`eliminarArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="danger" size="sm">DELETE</Button>


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