import React, { useState, useEffect, Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../assets/css/form.css';
import moment from 'moment';
import axios from "axios";
import { useHistory } from 'react-router-dom';


//Se descarga libreria moment: npm install moment --save, para el manejo de Date y LocalDate: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:
//Se aplica libreria moment a campo LocalTime y funciona correctamente:


//Se pasan los props (parametros):
const TablaIngreso = (props) => {


 const [datos, setDatos] = useState([])

 //Redireccion de la Pagina:
 let history = useHistory();

 
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

  const cambiarEstado = (id, e) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'actualizarEstado',
            estado: "1",
            idPedido: id,
        

        }
      })
    .then(response => {

        console.log(response)

         //Redireccionar a la pagina form cliente:
         history.push('/returnTablaIngreso');


    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })

    

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
                            <th>Codigo</th>
                            <th>Hora Estimada</th>
                            <th>Estado Pedido</th>
                            <th>Tipo Envio</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((pedido, i)=> ( 
                            
                        pedido.estadoPedido === 0 ?

                        
                        <tr id={pedido.idPedido} key={i}>

                            <td>{pedido.idPedido}</td>
                            <td>{pedido.codigo}</td>
                            <td>{moment(pedido.horaEstimadaFin).add(5,'M').format('HH:MM:SS')}</td>
                            <td>
                              
                              {pedido.estadoPedido === 0 ?
                              <span>POR CONFIRMAR</span>
                              :
                              <span></span>
                            
                            }</td>
                            <td>
                              {pedido.tipoEnvio === 1 ?
                            
                              <span>DOMICILIO</span>
                              :
                              <span>RETIRO LOCAL</span>
                            
                            }</td>
                            <td>{pedido.total}</td>
                            <td>

                            <Button onClick={ (e) => cambiarEstado(pedido.idPedido, e) }  className="boton" variant="primary" size="sm">CONFIRMAR</Button>
                            

                            </td>
                           

                        </tr>

                        :

                        <></>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                
                <Button type="button" href={`/cajeroPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default TablaIngreso;