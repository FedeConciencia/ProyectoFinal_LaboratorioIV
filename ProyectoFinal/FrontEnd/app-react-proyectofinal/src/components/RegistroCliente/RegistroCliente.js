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
import {useHistory} from "react-router-dom";


const RegistroCliente = (props) => {

    const history = useHistory();

    
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   
    })

 
    const [datos, setDatos] = useState({
 
         nombre:'',
         apellido:'',
         dni:'',
         fechaNacimiento:'',
         telefono:'',
         email:'',
         usuario:'',
         contrasena:'',
         calle:'',
         numero:'',
         localidad:'',
 
    })
 
   
    const handleInputChange = (event) => {
    
        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })
    
    }
 
 
 
    const enviarDatos = async (datos, event) => {
    
        await getCliente(datos);

        await getUsuario(datos);

        await getDomicilio(datos);

        alert("CLIENTE REGISTRADO CON EXITO.");

        event.target.reset();

            
    }


    //Metodo que obtiene los datos e inserta el Cliente: 
    const getCliente = async (datos) => {

        try{
    
            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'insertar',
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    dni: datos.dni,
                    fechaNacimiento: datos.fechaNacimiento,
                    telefono: datos.telefono,
                    email: datos.email,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo"
        
        
                }
            })

            const resJson = await response.data

            console.log(resJson)

        
        }catch(error){

            console.log(error)
        }
    
    
    }


    //Metodo que obtiene los datos e inserta el Usuario:
    const getUsuario = async (datos) => {


        try{

            //Obtengo el ultimo idCliente, con una consulta al metodo del backEnd:
            const responseCliente = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=ultimoId");
            let idCliente = await responseCliente.json();


            const responseUsuario = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet", {
                params: {

                    action:'insertar',
                    usuario: datos.usuario,
                    contrasena: datos.contrasena,
                    rol: "cliente",
                    idCliente: idCliente,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo"

                    //fechaAlta, fechaBaja, estado, rol se crean x defecto:
                    //idCliente se obtiene ejecutando el metodo desde el backend.


                }
            })

            const resJson = await responseUsuario.data
            
            console.log(resJson)
        
        }catch(error){

            console.log(error)
        }


    }

    //Metodo que obtiene los datos e inserta el Domicilio:
    const getDomicilio = async (datos) => {


        try{

            //Obtengo el ultimo idCliente, con una consulta al metodo del backEnd:
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=ultimoId");
            let idCliente = await response.json();
            
            const responseDomicilio = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
                params: {

                    action:'insertar',
                    calle: datos.calle,
                    numero: datos.numero,
                    localidad: datos.localidad,
                    idCliente: idCliente,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo"


                }
            })

            const resJson = await responseDomicilio.data
            
            console.log(resJson)

        }catch(error){

            console.log(error)
        }
    }    
 
    //Validacion personalizada que valida que el DNI Ingresado no exista en la BD:
    const validarDni = async (dni) => {
    
        try{
    
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
            const resJson = await response.json();
            
            const listaCliente =   resJson;
            let validar = true;
        
            for(let i = 0; i < listaCliente.length; i++){
        
                if((listaCliente[i].dni).toString() === (dni).toString()){ 

                    return validar = false;

                    break;

                }
        
        
            }

            return validar
    
    
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

            
            for(let i = 0; i < listaUsuario.length; i++){

                    

                    if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "inactivo")){

                        return validar = true;
                        break;


                    }else if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                        return validar = false;
                        break;

                    }
                

            }

            return validar;

        }catch(error){

            console.log("Error: " + error);

        }
        
    }

  

    //Metodo que permite recopiar el email ingresado en email al usuario que no permite modificar el input:
    const confirmEmail = (email) => {

        let validar = false;

        console.log("DATOS =>", (email).toString())

        if((email).toString() !== ""){

            setValue('usuario', email)
            validar = true;
            
            
        }

        console.log("INGRESO =>", validar)
        return validar;
        
    }

  
 
 
   return (
   
     <Fragment>
 
         

         <br></br>
        
 
         <Container>
 
         <Alert variant="success" className="body">
 
             <br></br>
             <br></br>
 
             <Alert.Heading className="titulo">FORMULARIO REGISTRO CLIENTE</Alert.Heading>
             
            
             <br></br>
             <br></br>

             <Alert.Heading className="titulo">DATOS PERSONALES</Alert.Heading>  

             <br></br>
           
             <Form onSubmit={handleSubmit(enviarDatos)}>
 
             <Row>
 
 
                 <Col className="col-md-3">
                    <br></br>
                     <label className="my-2">Nombre: </label>
 
                 
                 </Col>
 
                 <Col>
                    <br></br>
                     <input 
                         type="text"
                         name="nombre"
                         onChange={handleInputChange}
                         placeholder="Ingrese el Nombre"
                         className="form-control my-2"
                         {...register("nombre", { 
 
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
                         {errors.nombre && errors.nombre.message}
                         </span>
 
                 </Col>
 
 
 
             </Row>
 
             <Row>
 
 
                 <Col className="col-md-3">
                     <br></br>
                     <label>Apellido: </label>
 
                 
                 </Col>
 
                 <Col>
                     <br></br>
                     <input 
                         type="text"
                         name="apellido"
                         onChange={handleInputChange}
                         placeholder="Ingrese el Apellido"
                         className="form-control"
                         {...register("apellido", { 
 
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
                         {errors.apellido && errors.apellido.message}
                         </span>
 
                 </Col>
 
 
 
             </Row>
 
 
             <Row>
 
 
                 <Col className="col-md-3">
                     <br></br>
                     <label>Dni: </label>
 
                 
                 </Col>
 
                 <Col>
                     <br></br>
                     <input 
                         type="number"
                         name="dni"
                         onChange={handleInputChange}
                         placeholder="Ingrese el Dni"
                         className="form-control"
                         min="1"
                         {...register("dni", { 
 
                             required:{
                                 value: true,
                                 message: 'Campo Obligatorio' 
                             },
 
                             pattern: {
                                 value: /^\d{8}(?:[-\s]\d{4})?$/,
                                 message: "Invalid format Dni 8 digits"
                             },
 
                             validate:validarDni
 
                         })}      
                     >
                     </input>
                 
                 
                 </Col>
 
                 <Col className="col-md-3">
 
                         <br></br>
                         <span className="text-danger text-small d-block mb-2">
                         {errors.dni && errors.dni.message}
                         </span>
 
                         <span className="text-danger text-small d-block mb-2">
                         {
                             errors.dni && errors.dni.type === "validate" && (
                                 <div className="error">El DNI ingresado ya existe</div>
                             )
                         }
                         </span>
 
                 </Col>
 
 
 
             </Row>
 
             <Row>
 
 
                 <Col className="col-md-3">
                     <br></br>
                     <label>Fecha Nacimiento: </label>
 
                 
                 </Col>
 
                 <Col>
                     <br></br>
                      <input 
                         type="date"
                         name="fechaNacimiento"
                         onChange={handleInputChange}
                         placeholder="Ingrese la Fecha Nacimiento 2020-11-05"
                         className="form-control"
                         {...register("fechaNacimiento", { 
 
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
                         {errors.fechaNacimiento && errors.fechaNacimiento.message}
                         </span>
 
                 </Col>
 
 
 
             </Row>
 
             <Row>
 
 
                 <Col className="col-md-3">
                     <br></br>
                     <label>Telefono: </label>
 
                 
                 </Col>
 
                 <Col>
                     <br></br>
                     <input 
                         type="number"
                         name="telefono"
                         onChange={handleInputChange}
                         placeholder="Ingrese el telefono"
                         className="form-control"
                         {...register("telefono", { 
 
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
                         {errors.telefono && errors.telefono.message}
                         </span>
 
                 </Col>
 
 
 
             </Row>
 
             <Row>
 
 
                 <Col className="col-md-3">
                     <br></br>
                     <label>Usuario / Email: </label>
 
                 
                 </Col>
 
                 <Col>
                     <br></br>
                     <input 
                         type="email"
                         name="email"
                         onChange={handleInputChange}
                         placeholder="Ingrese el usuario/email"
                         className="form-control"
                         {...register("email", { 
 
                             required:{
                                 value: true,
                                 message: 'Campo Obligatorio' 
                             },

                             validate:{

                                validacion1:validarUsuario,
                                validacion2: confirmEmail, //Permite agregar el setvalue a usuario
                                

                            }

                             
 
                         })}      
                     >
                     </input>
                 
                 
                 </Col>
 
 
                 <Col className="col-md-3">
 
                         <br></br>
                         <span className="text-danger text-small d-block mb-2">
                         {errors.email && errors.email.message}
                         </span>

                         <span className="text-danger text-small d-block mb-2">
                            {
                                errors.email && errors.email.type === "validacion1" && (
                                    <div className="error">El usuario ya existe</div>
                                )
                            }
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                            {
                                errors.email && errors.email.type === "validacion2" && (
                                    <div className="error"></div>
                                )
                            }
                        </span>
 
                 </Col>
 
 
 
             </Row>

             <br></br>
             <br></br>

             <Alert.Heading className="titulo">DATOS DE CUENTA</Alert.Heading>  

             <br></br>
             

             <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label className="my-2">Confirm Usuario / Email: </label>


                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="email"
                        name="usuario"
                        onChange={handleInputChange}
                        placeholder= "Confirmacion de email ingresado"
                        readOnly={true}
                        className="form-control my-2"
                        {...register("usuario", { 

                           
                        })}   

                    >
                    </input>


                </Col>

                <Col className="col-md-3">

                        <br></br>   
                        <span className="text-danger text-small d-block mb-2">
                        {errors.usuario && errors.usuario.message}
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

            <br></br>
             <br></br>

             <Alert.Heading className="titulo">DATOS DE DOMICILIO</Alert.Heading>  

             <br></br>
            

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label className="my-2">Calle: </label>

                
                </Col>

                <Col>
                    <br></br>
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

                        <br></br>   
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
                     <Button type="submit" className="btn btn-primary">REGISTER</Button>&nbsp;&nbsp;
                     <Button type="button" href={`/loguin`} className="btn btn-danger">RETURN</Button>
                 
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

export default RegistroCliente;