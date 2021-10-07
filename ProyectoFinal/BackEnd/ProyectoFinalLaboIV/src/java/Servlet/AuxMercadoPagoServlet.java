
package Servlet;

import Controlador.ControladorAuxMercadoPago;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.AuxMercadoPago;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mercadopago.resources.Preference;
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
                   
                    
           
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
                    System.out.println(request.getContentType());
        
                    System.out.println("INGRESO METODO POST");
                    
                   
                    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
                    response.setHeader("Access-Control-Allow-Credentials", "true");
                    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                    response.setHeader("Access-Control-Max-Age", "3600");
                    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers");
                    response.setContentType("multipart/form-data");
                    
                    
                    
                    PrintWriter out = response.getWriter();
                    String respuestaServer = "";
                    StringBuffer jb = new StringBuffer(); 
                    String line = null;


                    try {
            
                        
                        
                        BufferedReader reader = request.getReader(); 
                        
                        while ((line = reader.readLine()) != null){
                            jb.append(line);
                        }
                        
                        JsonObject jsonObject = new Gson().fromJson(jb.toString(), JsonObject.class);

                        JsonElement codeJson = jsonObject.get("codigo");
                        JsonElement priceJson = jsonObject.get("precio");
                        
                        System.out.println("JSON codeJson =>" + codeJson);
                        System.out.println("JSON priceJson =>" + priceJson);
                        
                        String codigo = codeJson.getAsString();
                        String precioString = priceJson.getAsString();
                        double precio = Double.parseDouble(precioString);
                        
                        System.out.println("Codigo =>" + codigo);
                        System.out.println("Precio =>" + precio);
                        

                        ControladorAuxMercadoPago controlador = new ControladorAuxMercadoPago();
                        Preference preference = controlador.mercadoPago(codigo, precio);
                        Gson gsonBuilder = new GsonBuilder().create();
                        String mercadoJson = gsonBuilder.toJson(preference);
                        System.out.println(mercadoJson);
                        respuestaServer = mercadoJson;
                    

                
                    
                        out.write(respuestaServer);
                    }catch(Exception ex){
                        ex.printStackTrace();
                    } finally {
                        out.close();
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

