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
const ActualizarDetalleFactura = (props) => {

    //Usamos el useForm para la validacion del formulario y pasamos los defaultValue para pintar los input:
    //SetValue sumamente importante para actualizar los valores obtenidos en el metodo obtenerOne y pintar los input

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

   

   //Creamos nuestro Hook inicializando como objeto del Form:  
 
   const [datos, setDatos] = useState({

        
        cantidad:'',
        subTotal:'',
        idFactura:'',
        idArticulo:'',

        
   })


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        
        //Se ejecuta el metodo obtener One al cargar la pagina
        getDetalleFactura();
       


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

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet", {
            params: {
    
                action:'actualizar',
                idDetalleFactura: id,
                cantidad: datos.cantidad,
                subTotal: datos.subTotal,
                idFactura: datos.idFactura,
                idArticuloManufacturado: datos.idArticulo,
                
               
    
                
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
      const getDetalleFactura = async () => {
        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet?action=buscar&idDetalleFactura="+id);
          const resJson = await response.json();
          
          //Verificamos la obtencion de datos correcto:
          alert(JSON.stringify(resJson));
          

          //por medio del setDatos paso los datos recuperados a useState datos, modifico del servlet para solo pasar un objeto.json

          setDatos(resJson);

          //Modificamos con setValue los input que recibimos:
          //Se descarga libreria moment: npm install moment --save, para el manejo de Date: {moment(cliente.fechaNacimiento).format('YYYY-MM-DD')}

          setValue('cantidad', resJson.cantidad);
          setValue('subTotal', resJson.subTotal);
          setValue('idFactura', (resJson.idFactura).toString()); //parseo a String
          setValue('idArticulo', (resJson.idArticuloManufacturado).toString()); //parseo a String
        
          //setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          //setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          //setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
      }

  //Validacion personalizada que valida que el idFactura Ingresado exista en la BD y si esta Activa:

  const validarFactura = async (idFactura) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=listar");
      const resJson = await response.json();
      
      const listaFactura =   resJson;
      let validar = false;
      

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaFactura.length; i++){

            //Se verifica que el idFactura exita en el BD y este activo (valida True), caso contrario false:

            if((listaFactura[i].idFactura).toString() === (idFactura).toString() && (listaFactura[i].estado).toString() === "activo"){

                return validar = true;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


   //Validacion personalizada que valida que el idArticuloManufacturado Ingresado exista en la BD:

   const validarArticulo = async (idArticulo) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManServlet?action=listar");
      const resJson = await response.json();
      
      const listaArticulo =  resJson;
      let validar = false;

      //alert(JSON.stringify(listaArticulo))

      
      for(let i = 0; i < listaArticulo.length; i++){

            //Se verifica que el idFactura exita en el BD y este activo (valida True), caso contrario false:

            if((listaArticulo[i].idArticulo).toString() === (idArticulo).toString() && (listaArticulo[i].estado).toString() === "activo"){

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

        
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION DETALLE_FACTURA</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Cantidad: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="cantidad"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Cantidad"
                        className="form-control my-2"
                        min="1"
                        {...register("cantidad", { 

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
                        {errors.cantidad && errors.cantidad.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>subTotal: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="number"
                        name="subTotal"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Subtotal"
                        className="form-control"
                        min="1"
                        step="0.01"
                        {...register("subTotal", { 

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
                        {errors.subTotal && errors.subTotal.message}
                        </span>

                </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Factura: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idFactura"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idFactura"
                            className="form-control"
                            min="1"
                            {...register("idFactura", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarFactura

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idFactura && errors.idFactura.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idFactura && errors.idFactura.type === "validate" && (
                                    <div className="error">El idFactura no existe</div>
                                )
                            }
                            </span>

                    </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Articulo: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idArticulo"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idArticulo"
                            className="form-control"
                            min="1"
                            {...register("idArticulo", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarArticulo

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idArticulo && errors.idArticulo.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idArticulo && errors.idArticulo.type === "validate" && (
                                    <div className="error">El idArticulo no existe</div>
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
                                    <Button type="button" href={`/adminDetalleFactura`} className="btn btn-danger">RETURN</Button>
                                
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

export default ActualizarDetalleFactura;