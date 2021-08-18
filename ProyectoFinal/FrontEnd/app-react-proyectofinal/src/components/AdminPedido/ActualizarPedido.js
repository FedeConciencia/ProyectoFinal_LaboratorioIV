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
const ActualizarPedido = (props) => {

    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

   

   //Creamos nuestro Hook inicializando como objeto del Form:  
 
   const [datos, setDatos] = useState({

        
        codigo:'',
        horaEstimadaFin:'',
        tipoEnvio:'',
        total:'',
        idCliente:'',
        idDomicilio:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

        
   })


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        
        //Se ejecuta el metodo obtener One al cargar la pagina
        getPedido();
       


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

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
            params: {
    
                action:'actualizar',
                idPedido: id,
                codigo: datos.codigo,
                horaEstimadaFin: datos.horaEstimadaFin,
                tipoEnvio: datos.tipoEnvio,
                total: datos.total,
                idCliente: datos.idCliente,
                idDomicilio: datos.idDomicilio,
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
      const getPedido = async () => {
        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=buscar&idPedido="+id);
          const resJson = await response.json();
          
          //Verificamos la obtencion de datos correcto:
          alert(JSON.stringify(resJson));
          

          //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.json

          setDatos(resJson);

          //Modificamos con setValue los input que recibimos:
          //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

          setValue('codigo', resJson.codigo);
          setValue('horaEstimadaFin', moment(resJson.horaEstimadaFin).add(5,'M').format('HH:MM:SS'));
          setValue('tipoEnvio', resJson.tipoEnvio);
          setValue('total', resJson.total);
          setValue('idCliente', (resJson.idCliente).toString()); //parseo a String
          setValue('idDomicilio', (resJson.idDomicilio).toString()); //parseo a String
          setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
      }

  //Validacion personalizada que valida que el idCliente Ingresado exista en la BD:

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

  //Validacion personalizada que valida que el idDomicilio Ingresado exista en la BD:

  const validarDomicilio = async (idDomicilio) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=listar");
      const resJson = await response.json();
      
      const listaDomicilio =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaDomicilio.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if((listaDomicilio[i].idDomicilio).toString() === (idDomicilio).toString() && ((listaDomicilio[i].estado).toString() === "activo")){

                return validar = true;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }

  //Validacion personalizada que valida que el codigo Ingresado no exista en la BD y este Inactivo (baja Logica):

  const validarCodigo = async (codigo) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      
      const listaPedido =   resJson;
      let validar = true;

      //Obtenemos el id pasado por parametro (Importante en Actualizacion):
      const id = props.match.params.id;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaPedido.length; i++){

        //Si el idPedido es distinto al id pasado por parametro (Importante en Actualizacion):
        if((listaPedido[i].idPedido).toString() !== (id).toString()){

            //Si el codigo existe y esta activo (retorna false) y no valida ya que debe ser unico:

            if((listaPedido[i].codigo).toString() === (codigo).toString() && ((listaPedido[i].estado).toString() === "activo")){

                
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

        <Navigation></Navigation>
       

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
                        
                        <label className="my-2">Codigo: </label>


                    </Col>

                    <Col>
                        
                        <input 
                            type="number"
                            name="codigo"
                            onChange={handleInputChange}
                            placeholder="Ingrese el Codigo"
                            className="form-control my-2"
                            min="1000"
                            {...register("codigo", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validacion1:validarCodigo,

                                }

                            })}   

                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            
                            <span className="text-danger text-small d-block mb-2">
                            {errors.codigo && errors.codigo.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                                {
                                    errors.codigo && errors.codigo.type === "validacion1" && (
                                        <div className="error">El codigo ingresado ya existe</div>
                                    )
                                }
                            </span>

                    </Col>



                    </Row>

                    <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Hora Estimada Fin: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="text"
                            name="horaEstimadaFin"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Hora 10:10:10"
                            className="form-control"
                            {...register("horaEstimadaFin", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                pattern: {
                                    value: /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/,
                                    message: "Invalid format time"
                                }

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.horaEstimadaFin && errors.horaEstimadaFin.message}
                            </span>

                    </Col>



                    </Row>


                    <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Tipo Envio: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="tipoEnvio"
                            onChange={handleInputChange}
                            placeholder="Ingrese el Tipo de Envio"
                            className="form-control"
                            min="1"
                            {...register("tipoEnvio", { 

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
                            {errors.tipoEnvio && errors.tipoEnvio.message}
                            </span>

                    </Col>

                    </Row>  

                    <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Total: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="total"
                            onChange={handleInputChange}
                            placeholder="Ingrese el Total"
                            className="form-control"
                            min="1"
                            step="0.01"
                            {...register("total", { 

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
                            {errors.total && errors.total.message}
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


                                    validate:validarCliente

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
                                    errors.idCliente && errors.idCliente.type === "validate" && (
                                        <div className="error">El idCliente no existe</div>
                                    )
                                }
                                </span>

                        </Col>



                    </Row>

                    <Row>


                        <Col className="col-md-3">
                            <br></br>
                            <label>Id_Domicilio: </label>


                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="number"
                                name="idDomicilio"
                                onChange={handleInputChange}
                                placeholder="Ingrese el idDomicilio"
                                className="form-control"
                                min="1"
                                {...register("idDomicilio", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },


                                    validate:validarDomicilio

                                })}      
                            >
                            </input>


                        </Col>

                        <Col className="col-md-3">

                                <br></br>
                                <span className="text-danger text-small d-block mb-2">
                                {errors.idDomicilio && errors.idDomicilio.message}
                                </span>

                                <span className="text-danger text-small d-block mb-2">
                                {
                                    errors.idDomicilio && errors.idDomicilio.type === "validate" && (
                                        <div className="error">El idDomicilio no existe</div>
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
                                placeholder="Ingrese el estado"
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
                            <Button type="button" href={`/adminPedido`} className="btn btn-danger">RETURN</Button>
                                
                        
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

export default ActualizarPedido;