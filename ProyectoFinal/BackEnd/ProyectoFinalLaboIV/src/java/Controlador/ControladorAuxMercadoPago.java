
package Controlador;


import com.mercadopago.MercadoPago;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.Item;




public class ControladorAuxMercadoPago {
    
    
    public Preference mercadoPago(String codigo, double precio){
        
        System.out.println("INGRESO AL METODO ");
        
        // Crea un objeto de preferencia
         Preference preference = new Preference();
        
        try{
        
            MercadoPago.SDK.setAccessToken("TEST-7929132971542579-100511-9b79bd5c36497a3f12404bcdaabbc4ac-84845023");
       

            // Crea un ítem en la preferencia
            Item item = new Item();
            item.setTitle(codigo)
                .setQuantity(1)
                .setUnitPrice((float) precio);
            preference.appendItem(item);
            System.out.println("PREFERENCE => " + preference);
            preference.save();
            
        }catch(Exception error){
            
            System.out.println(error.getMessage());
            
        }
        
        return preference;
        
    }
    
    
    
    
}
