
package Servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.Cliente;
import Controlador.ControladorCliente;
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




//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?
@WebServlet(name = "ClienteServlet", urlPatterns = {"/ClienteServlet"})
public class ClienteServlet extends HttpServlet {

    
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
                    
                    ControladorCliente controladorCliente = new ControladorCliente();
                    List<Cliente> listaCliente = controladorCliente.buscarAllCliente();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(listaCliente);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorCliente controladorCliente = new ControladorCliente();    
                    List<Cliente> listaCliente = new ArrayList<Cliente>();
                    Cliente cliente = controladorCliente.buscarOneCliente(Long.parseLong(request.getParameter("idCliente"))); 
                    listaCliente.add(cliente);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(listaCliente);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String nombre = (request.getParameter("nombre"));
                    String apellido = (request.getParameter("apellido"));
                    String dni = (request.getParameter("dni"));
                    LocalDate fechaNacimiento = LocalDate.parse(request.getParameter("fechaNacimiento"));
                    String telefono = (request.getParameter("telefono"));
                    String email = (request.getParameter("email"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    
                    ControladorCliente controladorCliente = new ControladorCliente(); 
                    Cliente cliente = new Cliente(nombre, apellido, dni, fechaNacimiento, telefono, email, fechaAlta, fechaBaja, estado);
                    controladorCliente.insertarCliente(cliente);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(cliente);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idCliente = Long.parseLong(request.getParameter("idCliente"));
                    String nombre = (request.getParameter("nombre"));
                    String apellido = (request.getParameter("apellido"));
                    String dni = (request.getParameter("dni"));
                    LocalDate fechaNacimiento = LocalDate.parse(request.getParameter("fechaNacimiento"));
                    String telefono = (request.getParameter("telefono"));
                    String email = (request.getParameter("email"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorCliente controladorCliente = new ControladorCliente(); 
                    Cliente cliente = new Cliente(idCliente, nombre, apellido, dni, fechaNacimiento, telefono, email, fechaAlta, fechaBaja, estado);
                    controladorCliente.actualizarCliente(cliente);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(cliente);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorCliente controladorCliente = new ControladorCliente(); 
                    controladorCliente.eliminarCliente(Long.parseLong(request.getParameter("idCliente")));
                    List<Cliente> listaCliente = controladorCliente.buscarAllCliente();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(listaCliente);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    Long idCliente = Long.parseLong(request.getParameter("idCliente"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorCliente controladorCliente = new ControladorCliente(); 
                    controladorCliente.eliminarLogicoCliente(idCliente, fechaBaja);
                    List<Cliente> listaCliente = controladorCliente.buscarAllCliente();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(listaCliente);
                    respuestaServer = clienteJson;
                    
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


