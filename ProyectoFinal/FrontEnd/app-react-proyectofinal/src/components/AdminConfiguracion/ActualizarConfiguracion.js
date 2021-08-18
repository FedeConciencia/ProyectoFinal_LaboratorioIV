import React, {Component, useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Navigation from "../Navigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import moment from 'moment';

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const ActualizarConfiguracion = (props) => {

    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

   

   //Creamos nuestro Hook inicializando como objeto del Form:  
 
   const [datos, setDatos] = useState({

        
        cantidadCocineros:'',
        emailEmpresa:'',
        tokenMercadoPago:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:''

        
   })


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        
        //Se ejecuta el metodo obtener One al cargar la pagina
        getConfiguracion();
       


    }, [])


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

        const id = props.match.params.id

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet", {
            params: {
    
                action:'actualizar',
                idConfiguracion: id,
                cantidadCocineros: datos.cantidadCocineros,
                emailEmpresa: datos.emailEmpresa,
                tokenMercadoPago: datos.tokenMercadoPago,
                fechaAlta: datos.fechaAlta,
                fechaBaja: datos.fechaBaja,
                estado: datos.estado
    
                
            }
          })
        .then(response => {
    
            console.log(JSON.stringify(response))
        

        })
        .catch(error =>{
            console.log("Error");
            console.log(error);
        })
    
    
      }


      //Metodo Obtener los datos al Cargar la Pagina:
      const getConfiguracion = async () => {
        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet?action=buscar&idConfiguracion="+id);
          const resJson = await response.json();
          
          //Verificamos la obtencion de datos correcto:
          alert(JSON.stringify(resJson));
          

          //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.json

          setDatos(resJson);

          //Modificamos con setValue los input que recibimos:
          //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

          setValue('cantidadCocineros', resJson.cantidadCocineros);
          setValue('emailEmpresa', resJson.emailEmpresa);
          setValue('tokenMercadoPago', resJson.tokenMercadoPago);
          setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
      }

    //Validar activo-inactivo en actualizacion datos input estado:

    const validarEstado = (estado) => {

        let validar = false;

        if(estado === "activo"){

            return validar = true;
        


        }else if(estado === "inactivo"){

            return validar = true;

        }

        return validar;

    }

     
    return (  

        

        <Fragment>

        <Navigation></Navigation>
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION CONFIGURACION</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Cantidad Cocineros: </label>


                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="cantidadCocineros"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Cantidad de Cocineros"
                        className="form-control my-2"
                        min="1"
                        {...register("cantidadCocineros", { 

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
                        {errors.cantidadCocineros && errors.cantidadCocineros.message}
                        </span>

                </Col>



                </Row>

                <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Email Empresa: </label>


                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="email"
                        name="emailEmpresa"
                        onChange={handleInputChange}
                        placeholder="Ingrese el email"
                        className="form-control"
                        {...register("emailEmpresa", { 

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
                        {errors.emailEmpresa && errors.emailEmpresa.message}
                        </span>

                </Col>



                </Row>


                <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Token MercadoPago: </label>


                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="tokenMercadoPago"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Token"
                        className="form-control"
                        {...register("tokenMercadoPago", { 

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
                        {errors.tokenMercadoPago && errors.tokenMercadoPago.message}
                        </span>



                </Col>



            </Row>


            
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Fecha de Alta: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="date"
                        name="fechaAlta"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Fecha de Alta 2020-11-05"
                        className="form-control"
                        {...register("fechaAlta", { 

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
                        {errors.fechaAlta && errors.fechaAlta.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Fecha de Baja: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="date"
                        name="fechaBaja"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Fecha de Baja 2020-11-05"
                        className="form-control"
                        {...register("fechaBaja", { 

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
                        {errors.fechaBaja && errors.fechaBaja.message}
                        </span>

                </Col>



            </Row>



            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Estado: </label>

                
                </Col>

                <Col>
                    <br></br>
                
                    <input 
                        type="text"
                        name="estado"
                        onChange={handleInputChange}
                        placeholder="Ingrese el estado (activo o inactivo)"
                        className="form-control"
                        {...register("estado", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:{

                                validate1:validarEstado,
                                

                            }    

                        })}      
                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.estado && errors.estado.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                        {
                        errors.estado && errors.estado.type === "validate1" && (
                        <div className="error">El estado debe ser activo o inactivo</div>
                        )
                        }
                        </span>

                </Col>



        </Row>

        <Row>

            <Col ClassName='boton'>
                <br></br>
                <br></br>
                <Button type="submit" className="btn btn-primary">UPDATE</Button>&nbsp;&nbsp;
                <Button type="button" href={`/adminConfiguracion`} className="btn btn-danger">RETURN</Button>
            
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

}

export default ActualizarConfiguracion;