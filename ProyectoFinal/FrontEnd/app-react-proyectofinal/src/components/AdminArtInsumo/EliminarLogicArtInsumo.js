import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const EliminarLogicArtInsumo = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


 
    //Se obtiene los datos del parametro y posteriormente se pasa al metodo.
    //const {id} = useParams();
    

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        //Se ejecuta el metodo eliminar al cargar la pagina
        eliminarLogicArtInsumo()
      
        

    }, [])

    


    //Metodo para actualizar datos:
    const eliminarLogicArtInsumo = (datos) => {

        const id = props.match.params.id

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
            params: {
    
                action:'eliminarLogico',
                idArticulo: id,
                //Se pasa la fecha actual:
                fechaBaja: moment().format('YYYY-MM-DD'),  

                   
                
            }
          })
        .then(response => {
    
            console.log(JSON.stringify(response))

             //Redireccionar a la pagina form cliente:
             history.push('/adminArtInsumo');
        

        })
        .catch(error =>{
            console.log("Error");
            console.log(error);
        })
    
    
      }



    return (  

        <>
            <Container />
        </>


    );

}
 
export default EliminarLogicArtInsumo;