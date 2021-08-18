import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';

//Se descarga libreria moment: npm install moment --save, para el manejo de Date y LocalDate: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:
//Se aplica libreria moment a campo LocalTime y funciona correctamente:


//Se pasan los props (parametros):
const FormPedido = (props) => {


 const [datos, setDatos] = useState([])
    
  //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
  //los corchetes permite que nuestro userEffect se ejecute una sola vez
  useEffect(() => {

        
      //Se ejecuta el metodo getOne al cargar la pagina
      getPedido()
    
      

  }, [])


  //Si se usa JavaWebAplications Tomcast ver de colocar localhost:8080

  const getPedido = async () => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
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
                            <th>Codigo</th>
                            <th>Hora_Estimada</th>
                            <th>Tipo_Envio</th>
                            <th>Total</th>
                            <th>fecha_Alta</th>
                            <th>fecha_Baja</th>
                            <th>Estado</th>
                            <th>IdCliente</th>
                            <th>IdDomicilio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((pedido, i)=> (
                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).add(5,'M').format('HH:MM:SS')}</td>
                            <td>{pedido.tipoEnvio}</td>
                            <td>{pedido.total}</td>
                            <td>{moment(pedido.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(pedido.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{pedido.estado}</td>
                            <td>{pedido.idCliente}</td>
                            <td>{pedido.idDomicilio}</td>
                            <td>

                            <Button href={`actualizarPedido/${pedido.idPedido}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicPedido/${pedido.idPedido}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarPedido/${pedido.idPedido}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarPedido`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormPedido;