import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Se pasan los props (parametros):
const FormArtInsumo = (props) => {


 const [datos, setDatos] = useState([])
    
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getArtInsumo()
    
      

  }, [])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getArtInsumo = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=listar");
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
                            <Button href={`eliminarLogicArtInsumo/${articulo.idArticulo}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarArtInsumo/${articulo.idArticulo}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarArtInsumo`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button>            
                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormArtInsumo;