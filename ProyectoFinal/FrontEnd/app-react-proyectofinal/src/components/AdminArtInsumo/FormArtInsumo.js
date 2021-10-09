import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';
import { ContextoUsuario } from "../ContextoUsuario";

const FormArtInsumo = (props) => {


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

          
        getArtInsumo()
      
        
    }, [])



    const getArtInsumo = async () => {

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=listar");
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
                            <th>Denominacion</th>
                            <th>Precio_Compra</th>
                            <th>Precio_Venta</th>
                            <th>Stock_Actual</th>
                            <th>Stock_Minimo</th>
                            <th>Unidad_Medida</th>
                            <th>Es_Insumo</th>
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
                            <td>{articulo.denominacion}</td>
                            <td>{articulo.precioCompra}</td>
                            <td>{articulo.precioVenta}</td>
                            <td>{articulo.stockActual}</td>
                            <td>{articulo.stockMinimo}</td>
                            <td>{articulo.unidadMedida}</td>
                            <td>{articulo.esInsumo}</td>
                            <td>{moment(articulo.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(articulo.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{articulo.estado}</td>
                            <td>{articulo.idRubro}</td>
                            <td>

                            <Button href={`actualizarArtInsumo/${articulo.idArticulo}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicArtInsumo/${articulo.idArticulo}`} className="boton" variant="danger" size="sm">DELETE</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarArtInsumo`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <VerificarRolUsuario />
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormArtInsumo;