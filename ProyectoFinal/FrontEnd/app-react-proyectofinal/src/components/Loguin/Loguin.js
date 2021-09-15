import React, { useState, Fragment, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/loguin.css';
import moment from 'moment';
import GoogleLogin from 'react-google-login';
import { ContextoUsuario } from "../ContextoUsuario";

var crypto = require("crypto");

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const Loguin = (props) => {


    const history = useHistory();
    //Usamos el useForm (npm install react-hook-form) para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   
    })


     //Creamos nuestro Hook inicializando como objeto del Form:  

    const [datos, setDatos] = useState({

        usuario: null,
        contrasena: null,
        
    })

    const {usuario, setUsuario} = useContext(ContextoUsuario);


    //Metodo que se ejecuta en los input onChange, permite detectar el ingreso de datos:
    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

    //Metodo que se ejecuta en el evento onSubmit desde el formulario:
 
   const enviarDatos = (datos, event) => {
 
         
    alert(JSON.stringify(datos));

    //Ejecuto el metodo que valida ingreso de datos para loguin:

    validarRegistro(datos.usuario, datos.contrasena);

    
    //Limpio todos los input
    event.target.reset();

    
    }

    //Creamos la funcion de respuesta del loguin de google:
    const responseGoogle = async (response) => {
        console.log("Respuesta google: ",response);
        //Tener en cuenta que estas variables pueden ser modificadas por google:
        const nombre = response["Ws"]["Qe"]; 
        const tokenId = response["tokenId"];
        const email = response["profileObj"]["email"];
        console.log(email)
        const usuarioActual = { nombre, tokenId, email }
        validarRegistroGmail(usuarioActual)

        //Constante para ejecutar espera de milisegundos;

        const timer = setTimeout(() => {

            actualizarEstado(usuarioActual)
        
        }, 10000);

        

    }

    


    //Metodo que verifica que el mail de logueo de google no este registrado como cliente:

    const validarRegistroGmail = async(usuarioActual) => {

        //Verificamos con el idCliente asociado al usuario ingresado, si este esta "ACTIVO":

        const responseCliente = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
        const resJsonCliente = await responseCliente.json();

        let validarMail = false;

        for(let i = 0; i < resJsonCliente.length; i++){

            
            if(resJsonCliente[i].email === usuarioActual.email){

                validarMail = true;
                break;

            }


        }

        if(validarMail === false){

            console.log("INGRESO VALIDAR")
            getCliente(usuarioActual)
            //Constante para ejecutar espera de milisegundos;
            const timer = setTimeout(() => {

                //La espera permite que guarde el idCliente ya insertado:
                getUsuario(usuarioActual)
            
            }, 5000);
            
            
        
        }


    }


    //Metodo para crear un cliente con cuenta de Google:

    const getCliente = async (usuarioActual) => {


        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
            params: {
    
                action:'insertar',
                nombre: usuarioActual.nombre,
                apellido: "null",
                dni: "null",
                fechaNacimiento: moment("1900-01-01").format('YYYY-MM-DD'),
                telefono: "null",
                email: usuarioActual.email,
                fechaAlta: moment().format('YYYY-MM-DD'), 
                fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                estado: "activo"
    
                //fechaAlta, fechaBaja, estado se crean x defecto:
    
    
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


    //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
    const passwordGmail = () => {

        
        var id = crypto.randomBytes(7).toString('hex');

        console.log("PASSWORD GMAIL => ", id)

        return id

    }

    //Metodo para crear un usuario con cuenta de Google:

    const getUsuario = async (usuarioActual) => {

        //contraseña hexadecimal encriptada para usuarios Google.
        let password = passwordGmail()
        console.log("PASSWORD GMAIL => ", password)

        //Obtengo el ultimo idCliente, con una consulta al metodo del backEnd:
        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=ultimoId");
        let idCliente = await response.json();
        console.log("ID CLIENTE => ", idCliente);


        axios.get("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet", {
        params: {

        action:'insertar',
        usuario: usuarioActual.email,
        contrasena: password,  
        rol: "cliente",
        idCliente: idCliente,
        fechaAlta: moment().format('YYYY-MM-DD'), 
        fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
        estado: "activo"

        //fechaAlta, fechaBaja, estado, rol se crean x defecto:
        //idCliente se obtiene ejecutando el metodo desde el backend.


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


    //Metodo async-await que verifica en la BD que el usuario y contraseña ingresado existan esten activo y este asociado a un cliente activo.

    const validarRegistro = async (usuario, contrasena) => {

        try{

            const responseUsuario = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
            const resJsonUsuario = await responseUsuario.json();

            const listaUsuario = resJsonUsuario;

            alert(JSON.stringify(listaUsuario));

            let validarUsuario = false;
            let validarCliente = false;
            let id = "";
            let rol = "";

            //Encriptar la contraseña ingresada para verificar si coincide con la contraseña encriptada de la BD:

            const responseContraseña = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=encriptar&contrasena="+contrasena);
            const resJsonContraseña = await responseContraseña.json();

            //Verificamos que el usuario y contraseña ingresado exista en el USUARIO, y este "ACTIVO":

            for(let i = 0; i < listaUsuario.length; i++){


                if(listaUsuario[i].usuario === usuario && listaUsuario[i].contraseña === (resJsonContraseña).toString() && listaUsuario[i].estado === "activo"){

                    validarUsuario = true;
                    id = listaUsuario[i].idCliente;
                    rol = listaUsuario[i].rol;
                    break;

                }

            }

            alert(id);
            alert(rol);

            //Verificamos con el idCliente asociado al usuario ingresado, si este esta "ACTIVO":

            const responseCliente = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
            const resJsonCliente = await responseCliente.json();

            const listaCliente = resJsonCliente;

            alert(JSON.stringify(listaCliente));

            for(let i = 0; i < listaCliente.length; i++){

                if((listaCliente[i].idCliente).toString() === (id).toString() && listaCliente[i].estado === "activo"){

                    validarCliente = true;
                    break;

                }
            }


            if((validarCliente === true) && (validarUsuario === true) && ((rol).toLowerCase() === "administrador")){
               
                //Direccionamos a la pagina admin principal:
                const usuarioActual = {usuario, contrasena, rol};
                setUsuario(usuarioActual);
                actualizarEstado(usuarioActual);
                

            }else if((validarCliente === true) && (validarUsuario === true)){

                document.getElementById("mensaje").innerHTML  = "LOGUIN CORRECTO.";
                document.getElementById("mensaje").style.color = "green";
                //Despues implementar la accion de loguin valido
                const usuarioActual = {usuario, contrasena, rol};
                setUsuario(usuarioActual);
                actualizarEstado(usuarioActual);
            }else{

                //En caso de loguin invalido se muestra mensaje de ERROR personalizado:
                document.getElementById("mensaje").innerHTML = "USUARIO O CONTRASEÑA INCORRECTO.";
                document.getElementById("mensaje").style.color = "red";
            }
        

        }catch(error){

            console.log("Error: " + error);
        }

    }

    function actualizarEstado(usuarioActual) {
        localStorage.setItem('usuario', JSON.stringify(usuarioActual));
        if(usuarioActual["rol"] === "administrador"){
            history.push("/adminPrincipal");
        }
        else{
            history.push("/");
        }
        window.location.reload();
    }


    return (

        <Fragment>

            <br></br>
            <br></br>

            <Container>

            <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">LOGUIN</Alert.Heading>

            <br></br>
            <br></br>  

            <GoogleLogin
                clientId="190721094702-ifpj8nj34rqig6799jeqjrjolpanmssa.apps.googleusercontent.com"
                render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="primary"  size="lg">LOGUIN GOOGLE ACCOUNT</Button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            
            <br></br>
            <br></br>    

            <h5>----- O -----</h5>

            
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


                            })}   

                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            
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

                <Row>

                    <Col>

                        
                        <br></br>
                        <h5 id="mensaje"></h5>
                    
                    
                    </Col>

                </Row>    

                <Row>   

                    <Col ClassName='boton'>
                        <br></br>
                        <br></br>
                        <Button type="submit" variant="success"  size="lg">LOGUIN</Button>&nbsp;&nbsp;
                        <Button type="button" href={`/registroCliente`} variant="primary"  size="lg">USER REGISTER</Button>&nbsp;&nbsp;
                        <Button type="button" href={`/home`} variant="danger"  size="lg">RETURN</Button>
                    
                    </Col>


                </Row>



            </Form>
            </Alert>
            </Container>

        </Fragment>


    );


};

export default Loguin;