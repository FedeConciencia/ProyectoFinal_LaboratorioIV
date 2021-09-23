import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const EliminarArtManDetalle = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        const eliminarArtManDetalle = async () => {

            try{
    
                const id = props.match.params.id;
                const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=eliminar&idArticuloDetalle="+id);
                console.log(response.json());
    
                //Redireccionar a la pagina form cliente:
                history.push('/adminArtManDetalle');
                
                
    
            }catch(error){
    
                console.log(error);
    
            }    
    
        }
        //Se ejecuta el metodo eliminar al cargar la pagina
        eliminarArtManDetalle();
    
    }, [])


    return (  

        <>
            <Container />
        </>

    );

}
 
export default EliminarArtManDetalle;