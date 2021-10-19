package Servlet;

import Controlador.ControladorAuxMercadoPago;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.AuxMercadoPago;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.*;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import static java.net.Proxy.Type.HTTP;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.output.*;
import java.time.LocalDate;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;
import jdk.internal.org.objectweb.asm.TypeReference;
import org.apache.commons.io.IOUtils;



//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/AuxMercadoPagoServlet?
@WebServlet(name = "AuxMercadoPagoServlet", urlPatterns = {"/AuxMercadoPagoServlet"})
public class AuxMercadoPagoServlet extends HttpServlet{
    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    
    private void mostrarElementos(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException{
        try { 
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            response.setContentType("text/html");
            
            if(!isMultipart ) {
                System.out.println("NO ES MULTIPART");
                return;
            }

            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);

        
           // Parse the request to get file items.
           List fileItems = upload.parseRequest(request);

           // Process the uploaded file items
           Iterator i = fileItems.iterator();

           while ( i.hasNext () ) {
                FileItem fi = (FileItem)i.next();
                // Get the uploaded file parameters
                String fieldName = fi.getFieldName();
                String value = fi.getString();
                System.out.println("FieldName: " + fieldName);
                System.out.println("VALOR: " + value);
           }
           
           } catch(Exception ex) {
              System.out.println(ex);
           }
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
            response.setContentType("application/json;charset=UTF-8");
            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        
            PrintWriter out = response.getWriter();
            String respuestaServer = "";
            
            try {
            
                System.out.println("INGRESO METODO GET");   
                System.out.println(request.getParameter("codigo"));
                System.out.println(request.getParameter("precio"));

                String respuesta = "Ingresado al GET";
                Gson gsonBuilder = new GsonBuilder().create();
                String cadenaJson = gsonBuilder.toJson(respuesta);
                respuestaServer = cadenaJson;

                out.write(respuestaServer);
            
            }catch(Exception ex){
                ex.printStackTrace();
            } finally {
                out.close();
            }
                    
           
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
                    
                    response.addHeader("Access-Control-Allow-Origin", "*");
                    response.addHeader("Access-Control-Allow-Credentials", "true");
                    response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                    response.addHeader("Access-Control-Max-Age", "3600");
                    response.addHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
                   
                    try {
                        MercadoPago.SDK.setAccessToken("TEST-7929132971542579-100511-9b79bd5c36497a3f12404bcdaabbc4ac-84845023");
                    } catch (MPConfException ex) {
                        Logger.getLogger(AuxMercadoPagoServlet.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    PrintWriter out = response.getWriter();
                    String respuestaServer = "";
                   
                    System.out.println("INGRESO METODO POST"); 
                    System.out.println(request.getParameter("codigo"));
                    System.out.println(request.getParameter("precio"));
                    System.out.println(request.getParameter("succes"));
                    System.out.println(request.getParameter("failure"));
                    System.out.println(request.getParameter("pending"));

                    String codigo = request.getParameter("codigo");
                    double precio = Double.parseDouble(request.getParameter("precio"));
                    String succes = request.getParameter("succes");
                    String failure = request.getParameter("failure");
                    String pending = request.getParameter("pending");
                    float price = (float) precio;
                    
                    BackUrls urls = new BackUrls(succes, pending, failure);
                    
                  
           
                    try {
                        
                        
                        Preference preference = new Preference();
                  
        
                        // Crea un ítem en la preferencia
                        Item item = new Item();
                        item.setTitle(codigo);
                        item.setQuantity(1);
                        item.setUnitPrice(price);
                        preference.appendItem(item);
                        
                        preference.setBackUrls(urls);
                       

                        preference.save();
                   

                        System.out.println("PREFERENCE => " + preference);
                    
                    
                        Gson gsonBuilder = new GsonBuilder().create();
                        String mercadoJson = gsonBuilder.toJson(preference);         
                        System.out.println("PREFERENCIA => " + mercadoJson);
                        respuestaServer = mercadoJson;

                        out.write(respuestaServer);
                    
                    }catch (MPConfException ex) {
                            Logger.getLogger(AuxMercadoPagoServlet.class.getName()).log(Level.SEVERE, null, ex);
                    }catch (MPException ex) {
                            Logger.getLogger(AuxMercadoPagoServlet.class.getName()).log(Level.SEVERE, null, ex);
                    }catch (Exception ex) {
                            Logger.getLogger(AuxMercadoPagoServlet.class.getName()).log(Level.SEVERE, null, ex);
                    }    

   
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
    
    
    
}


