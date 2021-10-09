import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const EliminarLogicArtInsumo = (props) => {


    let history = useHistory();


    useEffect(() => {

        eliminarLogicArtInsumo()
      

    },[])

    
    const eliminarLogicArtInsumo = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
                params: {
        
                    action:'eliminarLogico',
                    idArticulo: id,
                    fechaBaja: moment().format('YYYY-MM-DD'),  

                    
                    
                }
            })

            const resJson = await response.data
        
            console.log(resJson)

            history.push('/adminArtInsumo');

        }catch(error){

            console.log(error)

        }    
            
    }


    return (  

        <>
            <Container />
        </>


    );

}
 
export default EliminarLogicArtInsumo;