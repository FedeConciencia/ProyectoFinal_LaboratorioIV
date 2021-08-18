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
const FormDetalleFactura = (props) => {


 const [datos, setDatos] = useState([])
    
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getDetalleFactura()
    
      

  }, [])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getDetalleFactura = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet?action=listar");
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
          <Navigation></Navigation>
          
            <div className="center">

                <Form>

                <br></br>    

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cantidad</th>
                            <th>SubTotal</th>
                            <th>IdFactura</th>
                            <th>IdArticulo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((detalleFactura, i)=> (
                        
                        <tr id={detalleFactura.idDetalleFactura} key={i}>

                            <td>{detalleFactura.idDetalleFactura}</td>
                            <td>{detalleFactura.cantidad}</td>
                            <td>{detalleFactura.subTotal}</td>
                            <td>{detalleFactura.idFactura}</td>
                            <td>{detalleFactura.idArticuloManufacturado}</td>
                            <td>

                            <Button href={`actualizarDetalleFactura/${detalleFactura.idDetalleFactura}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicDetalleFactura/${detalleFactura.idDetalleFactura}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarDetalleFactura/${detalleFactura.idDetalleFactura}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarDetalleFactura`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormDetalleFactura;