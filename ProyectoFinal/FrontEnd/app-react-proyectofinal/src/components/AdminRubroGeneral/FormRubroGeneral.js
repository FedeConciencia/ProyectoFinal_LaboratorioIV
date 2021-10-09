import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/form.css';
import moment from 'moment';


const FormRubroGeneral = (props) => {


    const [datos, setDatos] = useState([])
      
  
    useEffect(() => {


        getRubro()
    

    },[])


    const getRubro = async () => {

      try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroGeneralServlet?action=listar");
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
                            <th>Fecha Alta</th>
                            <th>Fecha Baja</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

       
                        {datos.map((rubro, i)=> (
                        
                        <tr id={rubro.idRubro} key={i}>

                            <td>{rubro.idRubro}</td>
                            <td>{rubro.denominacion}</td>
                            <td>{moment(rubro.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{moment(rubro.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                            <td>{rubro.estado}</td>
                            <td>

                            <Button href={`actualizarRubroGeneral/${rubro.idRubro}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button href={`eliminarLogicRubroGeneral/${rubro.idRubro}`} className="boton" variant="danger" size="sm">DELETE</Button>
                            

                            </td>
                           

                        </tr>

                        )) }

                            
                    </tbody>
                    
                </Table>

                <br></br>

                <Button href={`registrarRubroGeneral`} className="boton" variant="success" size="lg">INSERT</Button>&nbsp;&nbsp;&nbsp;
                <Button type="button" href={`/adminPrincipal`}  className="boton" variant="danger" size="lg">RETURN</Button> 

                <br></br>
                <br></br>

                </Form>
            </div>

         
      </Fragment>
      );                        

}


export default FormRubroGeneral;