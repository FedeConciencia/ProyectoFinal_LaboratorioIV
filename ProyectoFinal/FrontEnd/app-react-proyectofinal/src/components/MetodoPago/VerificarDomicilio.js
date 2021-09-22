import React, { useState, useEffect, Fragment } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import Button from "react-bootstrap/Button";
import moment from 'moment';
import { useHistory } from 'react-router-dom';


const VerificarDomicilio = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

    })



    //Creamos nuestro Hook inicializando como objeto del Form:  

    const [datos, setDatos] = useState({

        
        calle:'',
        numero:'',
        localidad:'',

        
    })

    const [idCliente, setIdCliente] = useState("");

    const [idDomicilio, setIdDomicilio] = useState("");


    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        getIdCliente();
    
        const timerDom = setTimeout(() => {

            //Se ejecuta el metodo obtener One al cargar la pagina
            getDomicilio();

        }, 3000);    
    
    }, [idCliente, idDomicilio]) 
    //IMPORTANTE PASO ESTADOS ENTRE PARENTESIS Y FRENA LA REPETICION EN LA ESCUCHA, DATOS NO DEBE ESTAR EN ESCUCHA

    
    
    //METODOS:

    //Metodo que se ejecuta en los input onChange, permite detectar el ingreso de datos:
    const handleInputChange = (event) => {

    setDatos({

        ...datos,
        [event.target.name] : event.target.value

    })

    }

    //Metodo que se ejecuta en el evento onSubmit desde el formulario:

    const enviarDatos = (datos, event) => {

    
        getDatos(datos)

        //Limpia todos los input, pero no refresca la pagina:    
        event.target.reset()

    }

    //Metodo para actualizar datos:
    const getDatos = (datos) => {


        axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
            params: {

                action:'actualizar',
                idDomicilio: idDomicilio, //Paso los Hooks
                calle: datos.calle,
                numero: datos.numero,
                localidad: datos.localidad,
                idCliente: idCliente, //Paso los Hooks
                fechaAlta: moment().format('YYYY-MM-DD'), 
                fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                estado: "activo",

                
            }
            })
        .then(response => {

            console.log(JSON.stringify(response))

            //Redireccionar a la pagina:
            history.push('/metodoPago');
            

        })
        .catch(error =>{
            console.log("Error");
            console.log(error);
        })


    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getDomicilio = async () => {
        try{
        
            const id = idCliente;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=buscarDomicilioXidCliente&idCliente="+id);
            const resJson = await response.json();
            
            //Verificamos la obtencion de datos correcto:
            console.log(JSON.stringify(resJson));

            //Modificamos con setValue los input que recibimos:
            //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

            setValue('calle', resJson.calle);
            setValue('numero', resJson.numero);
            setValue('localidad', resJson.localidad);
            
            //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.jso
    
            setIdDomicilio(resJson.idDomicilio); //Seteo el Hook con el valor obtenido
            setIdCliente(resJson.idCliente);

            
    
        }catch(error){

            console.log("Error: " + error);

        }
        
    }

     //Metodo que obtiene el idCliente a traves del mail buscando en la entidad cliente:
     const getIdCliente = () => {

        //Obtenemos el email desde el usuario en localStorage, tener en cuenta el valor en localStorage:
        let email = JSON.parse(localStorage.getItem("usuario")).usuario;

        console.log(email);
        

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
            params: {
    
                action:'idxEmail',
                email: email,
               
    
            }
          })
        .then(response => {
    

            console.log(response.data)

            //Guardo la respuesta en el hooks:
            setIdCliente(response.data);

            console.log("DATO IDCLIENTE =>", idCliente)
            
    
        })
        .catch(error =>{
            console.log("Error");
            console.log(error);
        })


    }

    return(

        <Fragment>

            <Container>

            <br></br>
            <br></br>

            <Alert variant="success" className="body">

                <br></br>
                <br></br>

                <Alert.Heading className="titulo">ACTUALIZAR DOMICILIO ENVIO</Alert.Heading>
                
            
                <br></br>
                <br></br>  

                <Form onSubmit={handleSubmit(enviarDatos)}>

                    <Row>


                        <Col className="col-md-3">
                            
                            <label className="my-2">Calle: </label>


                        </Col>

                        <Col>
                            
                            <input 
                                type="text"
                                name="calle"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Calle"
                                className="form-control my-2"
                                {...register("calle", { 

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
                                {errors.calle && errors.calle.message}
                                </span>

                        </Col>



                    </Row>

                    <Row>


                        <Col className="col-md-3">
                            <br></br>
                            <label>Numero: </label>


                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="number"
                                name="numero"
                                onChange={handleInputChange}
                                placeholder="Ingrese el Numero"
                                className="form-control"
                                min="1"
                                {...register("numero", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },

                                })}      
                            >
                            </input>


                        </Col>

                        <Col className="col-md-3">

                                <br></br>
                                <span className="text-danger text-small d-block mb-2">
                                {errors.numero && errors.numero.message}
                                </span>

                        </Col>



                    </Row>


                    <Row>


                        <Col className="col-md-3">
                            <br></br>
                            <label>Localidad: </label>


                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="text"
                                name="localidad"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Localidad"
                                className="form-control"
                                {...register("localidad", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },

                                })}      
                            >
                            </input>


                        </Col>

                        <Col className="col-md-3">

                                <br></br>
                                <span className="text-danger text-small d-block mb-2">
                                {errors.localidad && errors.localidad.message}
                                </span>

                        </Col>

                    </Row>    

                    <Row>

                        <Col ClassName='boton'>
                            <br></br>
                            <br></br>
                            <Button type="submit" className="btn btn-primary">UPDATE</Button>
                        
                        </Col>


                    </Row>

        </Form>

        <br></br>
        <br></br>
     

        </Alert>

        <br></br>


        </Container>


        </Fragment>


    )




}

export default VerificarDomicilio;