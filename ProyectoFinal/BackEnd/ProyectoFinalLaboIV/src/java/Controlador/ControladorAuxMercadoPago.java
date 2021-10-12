
package Controlador;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;

import com.mercadopago.resources.datastructures.preference.Item;


public class ControladorAuxMercadoPago {
    
    
    public Preference mercadoPago(String codigo, double precio){
        
        System.out.println("INGRESO AL METODO PREFERENCE");
        
        System.out.println("Codigo Metodo MercadoPago =>" + codigo);
        System.out.println("Precio Metodo MercadoPago =>" + precio);
        
        // Crea un objeto de preferencia
         Preference preference = null;
          
        
        try{
            
            System.out.println("INGRESO");
        
            MercadoPago.SDK.setAccessToken("TEST-7929132971542579-100511-9b79bd5c36497a3f12404bcdaabbc4ac-84845023");
       
            preference = new Preference();
            
            // Crea un ítem en la preferencia
            Item item = new Item();
            item.setTitle(codigo)
                .setQuantity(1)
                .setUnitPrice((float) precio);
            preference.appendItem(item);
            preference.setAutoReturn(Preference.AutoReturn.approved);
            preference.save();
            
            System.out.println("PREFERENCE => " + preference);
            
            
            
        }catch(MPException ex){
            
            ex.printStackTrace();  
            
            System.out.println(ex.getMessage());
            
        }catch(Exception error){
            
            System.out.println(error.getMessage());
            
        }
        
        return preference;
        
    }
    
    
    
    
}
