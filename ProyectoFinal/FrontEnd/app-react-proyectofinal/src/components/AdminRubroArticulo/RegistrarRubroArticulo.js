import React, { useState, Fragment } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import moment from 'moment';

const RegistrarRubroArticulo = () => {

 

    const {register, formState: { errors }, handleSubmit} = useForm()

 
    const [datos, setDatos] = useState({

            denominacion:'',
        
    })

  
    const handleInputChange = (event) => {

            setDatos({

                ...datos,
                [event.target.name] : event.target.value

            })

    }

 

    const enviarDatos = (datos, event) => {


        getDatos(datos)

        event.target.reset()

            
    }

    const getDatos = async (datos) => {

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet", {
                params: {

                    action:'insertar',
                    denominacion: datos.denominacion,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo",



                }
            })

            const resJson = await response.data
            
            console.log(resJson)

        }catch(error){

            console.log(error)

        }    
        


    }

   

    return (
  
    <Fragment>

        
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO RUBRO_ARTICULO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Denominacion: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="text"
                        name="denominacion"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Denominacion"
                        className="form-control my-2"
                        maxLength="20"
                        minLength="3"
                        {...register("denominacion", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                        })}   

                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        
                        <span className="text-danger text-small d-block mb-2">
                        {errors.denominacion && errors.denominacion.message}
                        </span>


                </Col>



            </Row>

           
             <Row>   

                <Col ClassName='boton'>
                    <br></br>
                    <br></br>
                    <Button type="submit" className="btn btn-primary">REGISTER</Button>&nbsp;&nbsp;
                    <Button type="button" href={`/adminRubroArticulo`} className="btn btn-danger">RETURN</Button>
                
                </Col>


            </Row>

            </Form>

            <br></br>
            <br></br>
             

            </Alert>

            <br></br>


        </Container>

    </Fragment>
  );

};

export default RegistrarRubroArticulo;