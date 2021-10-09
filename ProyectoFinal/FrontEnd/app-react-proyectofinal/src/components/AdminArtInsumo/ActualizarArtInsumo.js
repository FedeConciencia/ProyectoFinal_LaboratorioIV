import React, { useState, useEffect, Fragment } from 'react';
import {useForm} from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import moment from 'moment';


const ActualizarArtInsumo = (props) => {


    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    

    })

 
 
    const [datos, setDatos] = useState({

        denominacion:'',
        precioCompra:'',
        precioVenta:'',
        stockActual:'',
        stockMinimo:'',
        unidadMedida:'',
        esInsumo:'',
        idRubro:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',
  
    })


    useEffect(() => {

        getArtInsumo();

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

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
                params: {

                    action:'actualizar',
                    idArticulo: id,
                    denominacion: datos.denominacion,
                    precioCompra: datos.precioCompra,
                    precioVenta: datos.precioVenta,
                    stockActual: datos.stockActual,
                    stockMinimo: datos.stockMinimo,
                    unidadMedida: datos.unidadMedida,
                    esInsumo: datos.esInsumo,
                    idRubro: datos.idRubro,
                    fechaAlta: datos.fechaAlta,
                    fechaBaja: datos.fechaBaja,
                    estado: datos.estado

                    
                }
            })

            const resJson = await response.data

            console.log(resJson)

        }catch(error){

            console.log(error)

        }    
       

    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getArtInsumo = async () => {

        try{
            
            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=buscar&idArticulo="+id);
            const resJson = await response.json();
            
        
            setDatos(resJson);

        
            setValue('denominacion', resJson.denominacion);
            setValue('precioCompra', resJson.precioCompra);
            setValue('precioVenta', resJson.precioVenta);
            setValue('stockActual', resJson.stockActual);
            setValue('stockMinimo', resJson.stockMinimo);
            setValue('unidadMedida', resJson.unidadMedida);
            setValue('esInsumo', resJson.esInsumo);
            setValue('idRubro', (resJson.idRubro).toString()); 
            setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('estado', resJson.estado);
            
        }catch(error){

            console.log("Error: " + error);

        }
          
    }


    //Validacion personalizada que valida que el idRubro Ingresado exista en la BD y si esta inactivo baja logica no existe:
    const validarRubro = async (idRubro) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet?action=listar");
            const resJson = await response.json();
            
            const listaRubro =   resJson;
            let validar = false;

            for(let i = 0; i < listaRubro.length; i++){


                if((listaRubro[i].idRubro).toString() === (idRubro).toString() && ((listaRubro[i].estado).toString() === "activo")){

                    return validar = true;

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

    //Validar esInsumo - noInsumo en registro datos input esInsumo:
    const validarEsInsumo = (esInsumo) => {

            let validar = false;

            if(esInsumo === "esInsumo"){

                return validar = true;
            


            }else if(esInsumo === "noInsumo"){

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

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION ARTICULO_INSUMO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Denominacion: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="text"
                                    name="denominacion"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese la Denominacion"
                                    className="form-control"
                                    {...register("denominacion", { 

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
                                    {errors.denominacion && errors.denominacion.message}
                                    </span>

                            </Col>



                    </Row>

                    <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Precio Compra: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="number"
                                    name="precioCompra"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el Precio de Compra"
                                    className="form-control"
                                    min="0"
                                    step="0.01"
                                    {...register("precioCompra", { 

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
                                    {errors.precioCompra && errors.precioCompra.message}
                                    </span>

                            </Col>

                    </Row>   


                    <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Precio Venta: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="number"
                                    name="precioVenta"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el Precio Venta"
                                    className="form-control"
                                    min="0"
                                    step="0.01"
                                    {...register("precioVenta", { 

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
                                    {errors.precioVenta && errors.precioVenta.message}
                                    </span>

                            </Col>

                    </Row>   

                    <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Stock Actual: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="number"
                                    name="stockActual"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el Stock Actual"
                                    className="form-control"
                                    min="1"
                                    step="0.01"
                                    {...register("stockActual", { 

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
                                    {errors.stockActual && errors.stockActual.message}
                                    </span>

                            </Col>



                    </Row> 

                    <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Stock Minimo: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="number"
                                    name="stockMinimo"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el Stock Minimo"
                                    className="form-control"
                                    min="1"
                                    step="0.01"
                                    {...register("stockMinimo", { 

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
                                    {errors.stockMinimo && errors.stockMinimo.message}
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
                                <label>Es_Insumo: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="text"
                                    name="esInsumo"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Es_Insumo"
                                    className="form-control"
                                    {...register("esInsumo", { 

                                        required:{
                                            value: true,
                                            message: 'Campo Obligatorio' 
                                        },

                                        validate:{

                                            validacion1:validarEsInsumo,
                                            

                                        },    
                                        

                                    })}      
                                >
                                </input>


                            </Col>

                            <Col className="col-md-3">

                                    <br></br>
                                    <span className="text-danger text-small d-block mb-2">
                                    {errors.esInsumo && errors.esInsumo.message}
                                    </span>

                                    <span className="text-danger text-small d-block mb-2">
                                        {
                                            errors.esInsumo && errors.esInsumo.type === "validacion1" && (
                                                <div className="error">Debe ser esInsumo o noInsumo</div>
                                            )
                                        }
                                        </span>

                            </Col>



                    </Row>

                    <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Id_Rubro: </label>


                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="number"
                                    name="idRubro"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el idRubro"
                                    className="form-control"
                                    min="1"
                                    {...register("idRubro", { 

                                        required:{
                                            value: true,
                                            message: 'Campo Obligatorio' 
                                        },

                                        validate:{

                                            validacion1:validarRubro,
                                            
                                    

                                        },    
                                        

                                    })}      
                                >
                                </input>


                            </Col>

                            <Col className="col-md-3">

                                    <br></br>
                                    <span className="text-danger text-small d-block mb-2">
                                    {errors.idRubro && errors.idRubro.message}
                                    </span>

                                    <span className="text-danger text-small d-block mb-2">
                                    {
                                        errors.idRubro && errors.idRubro.type === "validacion1" && (
                                            <div className="error">El idRubro no existe</div>
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

                                <Col>
                                    <br></br>
                                    <br></br>
                                    <Button type="submit" className="btn btn-primary">UPDATE</Button>&nbsp;&nbsp;
                                    <Button type="button" href={`/adminArtInsumo`} className="btn btn-danger">RETURN</Button>
                                
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

export default ActualizarArtInsumo;