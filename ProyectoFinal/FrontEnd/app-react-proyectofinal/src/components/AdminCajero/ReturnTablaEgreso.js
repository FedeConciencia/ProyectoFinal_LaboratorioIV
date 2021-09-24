import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const ReturnTablaEgreso = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


 
    //Se obtiene los datos del parametro y posteriormente se pasa al metodo.
    //const {id} = useParams();
    

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
       history.push("/tablaEgreso");
        

    }, [])

    



    return (  

        <>
            <Container />
        </>


    );

}
 
export default ReturnTablaEgreso;