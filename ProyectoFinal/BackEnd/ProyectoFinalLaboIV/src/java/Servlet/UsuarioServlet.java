
package Servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.Usuario;
import Controlador.ControladorUsuario;
import Ecooder.Encooder;
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


//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/UsuarioServlet"})
public class UsuarioServlet extends HttpServlet {

    
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
        
        //Modificando el response.setContentType y agregando charset=UTF-8 soluciona problema de caracteres como ñ en react:
        //https://blog.continuum.cl/generar-una-respuesta-json-desde-java-en-utf-8-e68392ae4587
        
        response.setContentType("application/json;charset=UTF-8");
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
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();
                    List<Usuario> listaUsuario = controladorUsuario.buscarAllUsuario();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(listaUsuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();    
                    List<Usuario> listaUsuario = new ArrayList<Usuario>();
                    Usuario usuario = controladorUsuario.buscarOneUsuario(Long.parseLong(request.getParameter("idUsuario"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(usuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String user = (request.getParameter("usuario"));
                    String contraseña = (request.getParameter("contrasena"));
                    String rol = (request.getParameter("rol"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    //Encriptar la contraseña con la clase Encooder:
                    Encooder encooder = new Encooder();
                    String contraseñaEncriptada = encooder.ecnode(contraseña);
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();  
                    Usuario usuario = new Usuario(user, contraseñaEncriptada, rol, idCliente, fechaAlta, fechaBaja, estado);
                    controladorUsuario.insertarUsuario(usuario);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(usuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idUsuario = Long.parseLong(request.getParameter("idUsuario"));
                    String user = (request.getParameter("usuario"));
                    String contraseña = (request.getParameter("contrasena"));
                    String rol = (request.getParameter("rol"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    //Encriptar la contraseña con la clase Encooder:
                    Encooder encooder = new Encooder();
                    String contraseñaEncriptada = encooder.ecnode(contraseña);
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();  
                    Usuario usuario = new Usuario(idUsuario,user, contraseñaEncriptada, rol, idCliente, fechaAlta, fechaBaja, estado);
                    controladorUsuario.actualizarUsuario(usuario);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(usuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();
                    controladorUsuario.eliminarUsuario(Long.parseLong(request.getParameter("idUsuario")));
                    List<Usuario> listaUsuario = controladorUsuario.buscarAllUsuario();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(listaUsuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    Long idUsuario = Long.parseLong(request.getParameter("idUsuario"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorUsuario controladorUsuario = new ControladorUsuario();
                    controladorUsuario.eliminarLogicoUsuario(idUsuario, fechaBaja);
                    List<Usuario> listaUsuario = controladorUsuario.buscarAllUsuario();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String usuarioJson = gsonBuilder.toJson(listaUsuario);
                    respuestaServer = usuarioJson;
                    
                }else if(request.getParameter("action").equals("encriptar")){
                    
                    //Se crea Opcion Servlet que encripta la contraseña ingresada para verificar coincidencia Loguin:
                    
                    String contraseña = (request.getParameter("contrasena"));
                    
                    //Encriptar la contraseña con la clase Encooder:
                    Encooder encooder = new Encooder();
                    String contraseñaEncriptada = encooder.ecnode(contraseña);
                    
                    //Se envia la respuesta al cliente:
                    Gson gsonBuilder = new GsonBuilder().create();
                    String contraseñaJson = gsonBuilder.toJson(contraseñaEncriptada);
                    respuestaServer = contraseñaJson;
                    
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