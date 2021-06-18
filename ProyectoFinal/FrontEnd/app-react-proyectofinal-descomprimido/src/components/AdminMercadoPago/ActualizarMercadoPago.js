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
import '../../assets/css/actualizarMercadoPago.css';
import moment from 'moment';

//Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).subtract(1,'M').format('YYYY-MM-DD')}
//Se coloca el substract(1, 'M') ya que devuelve la fecha de la BD con 1 mes adicional:


//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const ActualizarMercadoPago = (props) => {

    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

   

   //Creamos nuestro Hook inicializando como objeto del Form:  
 
   const [datos, setDatos] = useState({

        
        codigo:'',
        fechaApro:'',
        metodoPago:'',
        numeroTarjeta:'',
        idPedido:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

        
   })


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        
        //Se ejecuta el metodo obtener One al cargar la pagina
        getMercadoPago();
       


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

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet", {
            params: {
    
                action:'actualizar',
                idMercadoPago: id,
                codigo: datos.codigo,
                fechaAprobacion: datos.fechaAprobacion,
                metodoPago: datos.metodoPago,
                numeroTarjeta: datos.numeroTarjeta,
                idPedido: datos.idPedido,
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
      const getMercadoPago = async () => {
        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet?action=buscar&idMercadoPago="+id);
          const resJson = await response.json();
          
          //Verificamos la obtencion de datos correcto:
          alert(JSON.stringify(resJson));
          

          //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.json

          setDatos(resJson);

          //Modificamos con setValue los input que recibimos:
          //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

          setValue('codigo', resJson.codigo);
          setValue('fechaAprobacion', moment(resJson.fechaAprobacion).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('metodoPago', resJson.metodoPago);
          setValue('numeroTarjeta', resJson.numeroTarjeta);
          setValue('idPedido', (resJson.idPedido).toString()); //parseo a String
          setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
      }

  //Validacion personalizada que valida que el idPedido Ingresado exista en la BD:

  const validarPedido = async (idPedido) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      
      const listaPedido =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaPedido.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if((listaPedido[i].idPedido).toString() === (idPedido).toString()){

                return validar = true;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


     
    return (  

        

        <Fragment>

        <Navigation></Navigation>
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION MERCADOPAGO</Alert.Heading>
            
           
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
        {...register("codigo", { 

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
        {errors.codigo && errors.codigo.message}
        </span>

</Col>



</Row>

<Row>


<Col className="col-md-3">
    <br></br>
    <label>Fecha Aprobacion: </label>


</Col>

<Col>
    <br></br>
    <input 
        type="date"
        name="fechaAprobacion"
        onChange={handleInputChange}
        placeholder="Ingrese la fecha Aprobacion"
        className="form-control"
        {...register("fechaAprobacion", { 

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
        {errors.fechaAprobacion && errors.fechaAprobacion.message}
        </span>

</Col>



</Row>


<Row>


<Col className="col-md-3">
    <br></br>
    <label>Metodo Pago: </label>


</Col>

<Col>
    <br></br>
     <input 
        type="text"
        name="metodoPago"
        onChange={handleInputChange}
        placeholder="Ingrese el metodo de Pago"
        className="form-control"
        {...register("metodoPago", { 

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
        {errors.metodoPago && errors.metodoPago.message}
        </span>

</Col>

</Row>  

<Row>


<Col className="col-md-3">
    <br></br>
    <label>Numero Tarjeta: </label>


</Col>

<Col>
    <br></br>
     <input 
        type="number"
        name="numeroTarjeta"
        onChange={handleInputChange}
        placeholder="Ingrese el Numero de Tarjeta"
        className="form-control"
        {...register("numeroTarjeta", { 

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
        {errors.numeroTarjeta && errors.numeroTarjeta.message}
        </span>

</Col>

</Row>  


<Row>


    <Col className="col-md-3">
        <br></br>
        <label>Id_Pedido: </label>


    </Col>

    <Col>
        <br></br>
        <input 
            type="number"
            name="idPedido"
            onChange={handleInputChange}
            placeholder="Ingrese el idPedido"
            className="form-control"
            {...register("idPedido", { 

                required:{
                    value: true,
                    message: 'Campo Obligatorio' 
                },


                validate:validarPedido

            })}      
        >
        </input>


    </Col>

    <Col className="col-md-3">

            <br></br>
            <span className="text-danger text-small d-block mb-2">
            {errors.idPedido && errors.idPedido.message}
            </span>

            <span className="text-danger text-small d-block mb-2">
            {
                errors.idPedido && errors.idPedido.type === "validate" && (
                    <div className="error">El idPedido no existe</div>
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

                                        })}      
                                    >
                                    </input>
                                
                                
                                </Col>

                                <Col className="col-md-3">

                                        <br></br>
                                        <span className="text-danger text-small d-block mb-2">
                                        {errors.estado && errors.estado.message}
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

      

    );

}

export default ActualizarMercadoPago;