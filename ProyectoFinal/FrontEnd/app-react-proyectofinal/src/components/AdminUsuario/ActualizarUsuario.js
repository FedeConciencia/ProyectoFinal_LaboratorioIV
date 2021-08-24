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
const ActualizarUsuario = (props) => {

    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

   

   //Creamos nuestro Hook inicializando como objeto del Form:  
 
   const [datos, setDatos] = useState({

        
        usuario:'',
        contrasena:'',
        rol:'',
        idCliente:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

        
   })


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        
        //Se ejecuta el metodo obtener One al cargar la pagina
        getUsuario();
       


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

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet", {
            params: {
    
                action:'actualizar',
                idUsuario: id,
                usuario: datos.usuario,
                contrasena: datos.contrasena,
                rol: datos.rol,
                idCliente: datos.idCliente,
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
      const getUsuario = async () => {
        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=buscar&idUsuario="+id);
          const resJson = await response.json();
          
          //Verificamos la obtencion de datos correcto:
          alert(JSON.stringify(resJson));
          

          //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.json

          setDatos(resJson);

          //Modificamos con setValue los input que recibimos:
          //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

          setValue('usuario', resJson.usuario);
          setValue('contrasena', resJson.contraseña);
          setValue('rol', resJson.rol);
          setValue('idCliente', (resJson.idCliente).toString()); //parseo a String
          setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
      }


  //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y si esta inactivo baja logica no existe:

  const validarCliente = async (idCliente) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
      const resJson = await response.json();
      
      const listaCliente =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaCliente.length; i++){


            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if((listaCliente[i].idCliente).toString() === (idCliente).toString() && ((listaCliente[i].estado).toString() === "activo")){

                return validar = true;
                break;

            }



      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


   //Validacion personalizada que valida que el idCliente Ingresado exista en la entidad Usuario y este Activo:

   const validarClienteDos = async (idCliente) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
      const resJson = await response.json();
      
      const listaUsuario =   resJson;
      let validar = true;

      //Obtenemos el id pasado por parametro (Importante en Actualizacion):
      const id = props.match.params.id;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaUsuario.length; i++){

            //Si el idUsuario es distinto al id pasado por parametro (Importante en Actualizacion):
            if((listaUsuario[i].idUsuario).toString() !== (id).toString()){

                //Si verifica el idCliente esta ya asociado a un Usuario y este esta Activo es false:

                if((listaUsuario[i].idCliente).toString() === (idCliente).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                    return validar = false;
                    break;


                }

            }    
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


  //Validacion personalizada que valida que el usuario ingresado no deba existir o estar activo:

  const validarUsuario = async (usuario) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
      const resJson = await response.json();
      
      const listaUsuario =   resJson;
      let validar = true;

      //Obtenemos el id pasado por parametro:
      const id = props.match.params.id;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaUsuario.length; i++){


        //Si el idUsuario es distinto al id pasado por parametro:
        if((listaUsuario[i].idUsuario).toString() !== (id).toString()){

             //Se verifica si el usuario existe y esta inactivo === true se puede ingresar (Eliminado Logico):
	        //Si el usuario existe y el estado es activo === false, no se puede crear el usuario	

            if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "inactivo")){

                return validar = true;
                break;


            }else if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                return validar = false;
                break;

            }
        }

      }

      return validar;

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

       
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION USUARIO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Usuario: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="email"
                        name="usuario"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Usuario (email@example.com)"
                        className="form-control my-2"
                        {...register("usuario", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:validarUsuario

                        })}   

                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        
                        <span className="text-danger text-small d-block mb-2">
                        {errors.usuario && errors.usuario.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                            {
                                errors.usuario && errors.usuario.type === "validate" && (
                                    <div className="error">El usuario ya existe</div>
                                )
                            }
                            </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Contraseña: </label>


                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="password"
                        name="contrasena"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Contraseña"
                        className="form-control"
                        {...register("contrasena", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            pattern: {
                                    
                                //Se debe agregar /^+expression regular + $/:
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "Invalid format PassWord"
                            },

                        })}      
                    >
                    </input>


                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.contrasena && errors.contrasena.message}
                        </span>

                </Col>



            </Row>


            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Rol: </label>


                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="rol"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Rol"
                        className="form-control"
                        {...register("rol", { 

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
                        {errors.rol && errors.rol.message}
                        </span>

                </Col>

            </Row>    

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Cliente: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idCliente"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idCliente"
                            className="form-control"
                            min="1"
                            {...register("idCliente", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validacion1:validarCliente,
                                    validacion2:validarClienteDos,
                            

                                },    
                                

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idCliente && errors.idCliente.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idCliente && errors.idCliente.type === "validacion1" && (
                                    <div className="error">El idCliente no existe</div>
                                )
                            }
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idCliente && errors.idCliente.type === "validacion2" && (
                                    <div className="error">El idCliente ya esta asociado a un Usuario Activo</div>
                                )
                            }
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
                                    <Button type="button" href={`/adminUsuario`} className="btn btn-danger">RETURN</Button>
                                
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

export default ActualizarUsuario;