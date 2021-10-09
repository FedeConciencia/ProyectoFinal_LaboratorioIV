import React, { useState, useEffect, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";

const ActualizarArtManDetalle = (props) => {

    
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    

    })


 
    const [datos, setDatos] = useState({

            
            cantidad:'',
            unidadMedida:'',
            idArtManufacturado:'',
            idArtInsumo:'',

            
    })


   
    useEffect(() => {


        getArtManDetalle();
       

    },[])


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

    //Metodo para actualizar datos:
    const getDatos = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet", {
                params: {
        
                    action:'actualizar',
                    idArticuloDetalle: id,
                    cantidad: datos.cantidad,
                    unidadMedida: datos.unidadMedida,
                    idArticuloManufacturado: datos.idArtManufacturado,
                    idArticuloInsumo: datos.idArtInsumo,
                    
                
                }
            })

            const resJson = await response.data

            console.log(resJson)
        
        }catch(error){

            console.log(error)

        }
    
    
    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getArtManDetalle = async () => {

        try{
            
            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=buscar&idArticuloDetalle="+id);
            const resJson = await response.json();
            
            
            setDatos(resJson);

            
            setValue('cantidad', resJson.cantidad);
            setValue('unidadMedida', resJson.unidadMedida);
            setValue('idArtManufacturado', (resJson.idArticuloManufacturado).toString()); 
            setValue('idArtInsumo', (resJson.idArticuloInsumo).toString()); 
        
            
            
        }catch(error){

            console.log("Error: " + error);

        }
        
    }


    //Validacion personalizada que valida que el idPedido Ingresado exista en la BD y este Activo:
    const validarArtInsumo = async (idArtInsumo) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=listar");
            const resJson = await response.json();
            
            const listaInsumo =   resJson;
            let validar = false;

       
            for(let i = 0; i < listaInsumo.length; i++){


                if((listaInsumo[i].idArticulo).toString() === (idArtInsumo).toString() && ((listaInsumo[i].estado).toString() === "activo")){

                    return validar = true;
                }
            
            }

            return validar;

        }catch(error){

        console.log("Error: " + error);

        }
        
    }


   //Validacion personalizada que valida que el idArticuloManufacturado Ingresado exista en la BD y este Activo:
   const validarArtManufacturado = async (idArtManufacturado) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
            const resJson = await response.json();
            
            const listaArticulo =  resJson;
            let validar = false;

            
            for(let i = 0; i < listaArticulo.length; i++){

                
                    if((listaArticulo[i].idArticulo).toString() === (idArtManufacturado).toString() && ((listaArticulo[i].estado).toString() === "activo")){

                        return validar = true;
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION ARTICULO_MANUFACTURADO_DETALLE</Alert.Heading>
            
           
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
                                        step="0.01"
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
                                    <label>Unidad Medida: </label>


                                </Col>

                                <Col>
                                    <br></br>
                                    <input 
                                        type="text"
                                        name="unidadMedida"
                                        onChange={handleInputChange}
                                        placeholder="Ingrese la Unidad de Medida"
                                        className="form-control"
                                        {...register("unidadMedida", { 

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
                                        {errors.unidadMedida && errors.unidadMedida.message}
                                        </span>

                                </Col>



                        </Row>

                        <Row>


                                <Col className="col-md-3">
                                    <br></br>
                                    <label>Id_ArtManufacturado: </label>


                                </Col>

                                <Col>
                                    <br></br>
                                    <input 
                                        type="number"
                                        name="idArtManufacturado"
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el idArtManufacturado"
                                        className="form-control"
                                        min="1"
                                        {...register("idArtManufacturado", { 

                                            required:{
                                                value: true,
                                                message: 'Campo Obligatorio' 
                                            },


                                            validate:validarArtManufacturado

                                        })}      
                                    >
                                    </input>


                                </Col>

                                <Col className="col-md-3">

                                        <br></br>
                                        <span className="text-danger text-small d-block mb-2">
                                        {errors.idArtManufacturado && errors.idArtManufacturado.message}
                                        </span>

                                        <span className="text-danger text-small d-block mb-2">
                                        {
                                            errors.idArtManufacturado && errors.idArtManufacturado.type === "validate" && (
                                                <div className="error">El idArtManufacturado no existe</div>
                                            )
                                        }
                                        </span>

                                </Col>



                        </Row>

                        <Row>


                                <Col className="col-md-3">
                                    <br></br>
                                    <label>Id_ArtInsumo: </label>


                                </Col>

                                <Col>
                                    <br></br>
                                    <input 
                                        type="number"
                                        name="idArtInsumo"
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el idArtInsumo"
                                        className="form-control"
                                        min="1"
                                        {...register("idArtInsumo", { 

                                            required:{
                                                value: true,
                                                message: 'Campo Obligatorio' 
                                            },


                                            validate:validarArtInsumo

                                        })}      
                                    >
                                    </input>


                                </Col>

                                <Col className="col-md-3">

                                        <br></br>
                                        <span className="text-danger text-small d-block mb-2">
                                        {errors.idArtInsumo && errors.idArtInsumo.message}
                                        </span>

                                        <span className="text-danger text-small d-block mb-2">
                                        {
                                            errors.idArtInsumo && errors.idArtInsumo.type === "validate" && (
                                                <div className="error">El idArtInsumo no existe</div>
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
                                    <Button type="button" href={`/adminArtManDetalle`} className="btn btn-danger">RETURN</Button>
                                
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

export default ActualizarArtManDetalle;