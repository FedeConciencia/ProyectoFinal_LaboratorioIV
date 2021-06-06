
package Servlet;


import Controlador.ControladorDomicilio;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.Usuario;
import Controlador.ControladorUsuario;
import Modelo.Domicilio;
import java.io.IOException;
import java.io.PrintWriter;
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


//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?
@WebServlet(name = "DomicilioServlet", urlPatterns = {"/DomicilioServlet"})
public class DomicilioServlet extends HttpServlet {

    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        
        PrintWriter out = response.getWriter();
        String respuestaServer = "";
        try {
            
            mostrarElementos(request, response);
            if(request.getParameter("action") != null){
                System.out.println("ACTION " + request.getParameter("action"));
                if(request.getParameter("action").equals("listar")){
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();
                    List<Domicilio> listaDomicilio = controladorDomicilio.buscarAllDomicilio();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(listaDomicilio);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();    
                    List<Domicilio> listaDomicilio = new ArrayList<Domicilio>();
                    Domicilio domicilio = controladorDomicilio.buscarOneDomicilio(Long.parseLong(request.getParameter("idDomicilio"))); 
                    listaDomicilio.add(domicilio);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String domicilioJson = gsonBuilder.toJson(listaDomicilio);
                    respuestaServer = domicilioJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String calle = (request.getParameter("calle"));
                    String numero = (request.getParameter("numero"));
                    String localidad = (request.getParameter("localidad"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();
                    Domicilio domicilio = new Domicilio(calle, numero, localidad, idCliente, fechaAlta, fechaBaja, estado);
                    controladorDomicilio.insertarDomicilio(domicilio);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String domicilioJson = gsonBuilder.toJson(domicilio);
                    respuestaServer = domicilioJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idDomicilio = Long.parseLong(request.getParameter("idDomicilio"));
                    String calle = (request.getParameter("calle"));
                    String numero = (request.getParameter("numero"));
                    String localidad = (request.getParameter("localidad"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();
                    Domicilio domicilio = new Domicilio(idDomicilio, calle, numero, localidad, idCliente, fechaAlta, fechaBaja, estado);
                    controladorDomicilio.actualizarDomicilio(domicilio);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String domicilioJson = gsonBuilder.toJson(domicilio);
                    respuestaServer = domicilioJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();
                    controladorDomicilio.eliminarDomicilio(Long.parseLong(request.getParameter("idDomicilio")));
                    List<Domicilio> listaDomicilio = controladorDomicilio.buscarAllDomicilio();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String domicilioJson = gsonBuilder.toJson(listaDomicilio);
                    respuestaServer = domicilioJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    Long idDomicilio = Long.parseLong(request.getParameter("idDomicilio"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorDomicilio controladorDomicilio = new ControladorDomicilio();
                    controladorDomicilio.eliminarLogicoDomicilio(idDomicilio, fechaBaja);
                    List<Domicilio> listaDomicilio = controladorDomicilio.buscarAllDomicilio();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String domicilioJson = gsonBuilder.toJson(listaDomicilio);
                    respuestaServer = domicilioJson;
                    
                }
            
            }
            out.write(respuestaServer);
        }catch(Exception ex){
            ex.printStackTrace();
        } finally {
            out.close();
        }
    }
    
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
        processRequest(request, response);
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
        processRequest(request, response);
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
