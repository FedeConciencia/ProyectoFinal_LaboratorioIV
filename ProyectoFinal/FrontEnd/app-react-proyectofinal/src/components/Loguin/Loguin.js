import React, { useState, Fragment, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import GoogleLogin from 'react-google-login';
import { ContextoUsuario } from "../ContextoUsuario";


const Loguin = (props) => {


    const history = useHistory();
    
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   
    })


    const [datos, setDatos] = useState({

        usuario: null,
        contrasena: null,
        
    })

    const {usuario, setUsuario} = useContext(ContextoUsuario);


    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

 
 
    const enviarDatos = (datos, event) => {
 
         
        validarRegistro(datos.usuario, datos.contrasena);

    
        event.target.reset();

    
    }

    //Creamos la funcion de respuesta del loguin de google:
    const responseGoogle = async (response) => {

        console.log("Respuesta google: ",response);
      
        if(response["profileObj"] !== undefined){

            const nombre = response["profileObj"]["givenName"]; 
            const apellido = response["profileObj"]["familyName"];
            const tokenId = response["tokenId"];
            const usuario = response["profileObj"]["email"];
            const rol = "cliente"
    
            const usuarioActual = { nombre, apellido, tokenId, usuario, rol }
    
            localStorage.setItem('usuario', JSON.stringify(usuarioActual));    
            
            validarRegistroGmail(usuarioActual)

        }
    }


    //Metodo que verifica que el mail de logueo de google no este registrado como cliente:
    const validarRegistroGmail = async(usuarioActual) => {

        //Verificamos con el idCliente asociado al usuario ingresado, si este esta "ACTIVO":
        const responseCliente = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
        const resJsonCliente = await responseCliente.json();

        let validarMail = false;

        for(let i = 0; i < resJsonCliente.length; i++){

            
            if(resJsonCliente[i].email === usuarioActual.usuario){

                validarMail = true;
                break;

            }


        }

        if(validarMail === false){

            console.log("INGRESO VALIDAR")

            history.push("/registroClienteGoogle")
            
        
        }else {


            actualizarEstado(usuarioActual)
            

        }


    }


    //Metodo async-await que verifica en la BD que el usuario y contraseña ingresado existan esten activo y este asociado a un cliente activo.
    const validarRegistro = async (usuario, contrasena) => {

        try{

            const responseUsuario = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
            const resJsonUsuario = await responseUsuario.json();

            const listaUsuario = resJsonUsuario;

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


            //Verificamos con el idCliente asociado al usuario ingresado, si este esta "ACTIVO":

            const responseCliente = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
            const resJsonCliente = await responseCliente.json();

            const listaCliente = resJsonCliente;


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

            }else if((validarCliente === true) && (validarUsuario === true) && ((rol).toLowerCase() === "cajero")){    
                
                  //Direccionamos a la pagina admin principal cajero:
                  const usuarioActual = {usuario, contrasena, rol};
                  setUsuario(usuarioActual);
                  actualizarEstado(usuarioActual);

            }else if((validarCliente === true) && (validarUsuario === true) && ((rol).toLowerCase() === "cocinero")){    
                
                //Direccionamos a la pagina admin principal cocinero:
                const usuarioActual = {usuario, contrasena, rol};
                setUsuario(usuarioActual);
                actualizarEstado(usuarioActual);
                
            }else if((validarCliente === true) && (validarUsuario === true) && ((rol).toLowerCase() === "dueno")){    
                
                //Direccionamos a la pagina admin principal dueño:
                const usuarioActual = {usuario, contrasena, rol};
                setUsuario(usuarioActual);
                actualizarEstado(usuarioActual);    

            }else if((validarCliente === true) && (validarUsuario === true) && ((rol).toLowerCase() === "cliente")){

                //Direccionamos a la pagina cliente:
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
        else if (usuarioActual["rol"] === "cocinero"){

            history.push("/cocineroPrincipal");

        }else if (usuarioActual["rol"] === "cliente"){

            history.push("/productos");

        }else if (usuarioActual["rol"] === "cajero"){

            history.push("/cajeroPrincipal");

        }else if (usuarioActual["rol"] === "dueno"){

            history.push("/adminDueño");

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
                clientId="190721094702-63klckib64q045jnncsicra1m0t498ui.apps.googleusercontent.com"
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

                    <Col className="botonera">
                        <Button type="submit" variant="success"  size="lg">LOGUIN</Button>
                        <Button type="button" href={`/registroCliente`} variant="primary"  size="lg">USER REGISTER</Button>
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