import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const EliminarArtInsumo = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


 
    //Se obtiene los datos del parametro y posteriormente se pasa al metodo.
    //const {id} = useParams();
    

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        //Se ejecuta el metodo eliminar al cargar la pagina
        eliminarArtInsumo()
      
        

    }, [])

    


    const eliminarArtInsumo =  async () => {

        try{

            const id = props.match.params.id
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=eliminar&idArticulo="+id);
            console.log(response.json());
            //Redireccionar a la pagina form cliente:
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
 
export default EliminarArtInsumo;