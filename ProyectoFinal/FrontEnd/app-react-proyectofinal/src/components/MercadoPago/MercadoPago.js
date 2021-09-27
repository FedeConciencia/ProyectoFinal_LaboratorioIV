import axios from "axios";
const mercadopago = require ("mercadopago");

const mercadoPago = async () => {

    try{


        const response = await axios.post("/metodoPago", {

            
             
        })
    
        //Axios no hace falta pasar a JSON el response =>
        const resJson = await response.data;
          
        console.log(resJson)
    
      }catch(error){
    
        console.log("ERROR =>", error)
    
      }


    mercadopago.configure({access_token:"TEST-6194813114872578-092712-fb72159e499dfd2b4da61033bf1c5130-84845023"})

    // Crea un objeto de preferencia
    let preference = {

        items: [
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        },
        ],

        back_urls: {
            success: "http://localhost:3000/mercadopago/success",
            failure: "http://localhost:3000/mercadopago/failure",
            pending: "http://localhost:3000/mercadopago/pending",
        },
        auto_return: "approved",

        
    };
    
    mercadopago.preferences.create(preference)
    .then(function(response){
    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
    }).catch(function(error){
    console.log(error);
    });

}

export default mercadoPago;