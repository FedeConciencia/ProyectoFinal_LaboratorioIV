package Servlet;

import Controlador.ControladorPedido;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.Pedido;
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
import java.time.LocalTime;


//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?
@WebServlet(name = "PedidoServlet", urlPatterns = {"/PedidoServlet"})
public class PedidoServlet extends HttpServlet {

    
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
                    
                    ControladorPedido controladorPedido = new ControladorPedido();
                    List<Pedido> listaPedido = controladorPedido.buscarAllPedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(listaPedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorPedido controladorPedido = new ControladorPedido();
                    Pedido pedido = controladorPedido.buscarOnePedido(Long.parseLong(request.getParameter("idPedido"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(pedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String codigo = (request.getParameter("codigo"));
                    LocalTime horaEstimadaFin = LocalTime.parse(request.getParameter("horaEstimadaFin"));
                    int estadoPedido = Integer.parseInt(request.getParameter("estadoPedido"));
                    int tipoEnvio = Integer.parseInt(request.getParameter("tipoEnvio"));
                    double total = Double.parseDouble(request.getParameter("total"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    Long idDomicilio = Long.valueOf(request.getParameter("idDomicilio"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorPedido controladorPedido = new ControladorPedido();   
                    Pedido pedido = new Pedido(codigo, horaEstimadaFin, estadoPedido, tipoEnvio, total, idCliente, idDomicilio, fechaAlta, fechaBaja, estado);
                    controladorPedido.insertarPedido(pedido);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(pedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idPedido = Long.parseLong(request.getParameter("idPedido"));
                    String codigo = (request.getParameter("codigo"));
                    LocalTime horaEstimadaFin = LocalTime.parse(request.getParameter("horaEstimadaFin"));
                    int estadoPedido = Integer.parseInt(request.getParameter("estadoPedido"));
                    int tipoEnvio = Integer.parseInt(request.getParameter("tipoEnvio"));
                    double total = Double.parseDouble(request.getParameter("total"));
                    Long idCliente = Long.valueOf(request.getParameter("idCliente"));
                    Long idDomicilio = Long.valueOf(request.getParameter("idDomicilio"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorPedido controladorPedido = new ControladorPedido();   
                    Pedido pedido = new Pedido(idPedido, codigo, horaEstimadaFin, estadoPedido, tipoEnvio, total, idCliente, idDomicilio, fechaAlta, fechaBaja, estado);
                    controladorPedido.actualizarPedido(pedido);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(pedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorPedido controladorPedido = new ControladorPedido(); 
                    controladorPedido.eliminarPedido(Long.parseLong(request.getParameter("idPedido")));
                    List<Pedido> listaPedido = controladorPedido.buscarAllPedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(listaPedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    Long idPedido = Long.parseLong(request.getParameter("idPedido"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorPedido controladorPedido = new ControladorPedido(); 
                    controladorPedido.eliminarLogicoPedido(idPedido, fechaBaja);
                    List<Pedido> listaPedido = controladorPedido.buscarAllPedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(listaPedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("buscarUltimoId")){
                    
                    ControladorPedido controladorPedido = new ControladorPedido();
                    long idPedido = controladorPedido.buscarUltimoId();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(idPedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("actualizarEstado")){
                    
                    Long idPedido = Long.parseLong(request.getParameter("idPedido"));
                    int estado = Integer.parseInt(request.getParameter("estado"));
                    
                    
                    ControladorPedido controlador = new ControladorPedido();   
                    controlador.actualizarEstadoPedido(estado, idPedido);
                    List<Pedido> listaPedido = controlador.buscarAllPedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(listaPedido);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("rechazar")){
                    
                    String codigo = request.getParameter("codigo");
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    ControladorPedido controladorPedido = new ControladorPedido();
                    long idPedido = controladorPedido.buscarPedidoXCodigo(codigo);
                    controladorPedido.rechazoPedido(idPedido, fechaBaja);
                    String baja = "Baja Gestionada" + idPedido;
                    Gson gsonBuilder = new GsonBuilder().create();
                    String pedidoJson = gsonBuilder.toJson(baja);
                    respuestaServer = pedidoJson;
                    
                }else if(request.getParameter("action").equals("buscarIdXCodigo")){
                	
                	 ControladorPedido controladorPedido = new ControladorPedido();
                	 String codigo = request.getParameter("codigo");
                     long idPedido = controladorPedido.buscarPedidoXCodigo(codigo);
                     Gson gsonBuilder = new GsonBuilder().create();
                     String pedidoJson = gsonBuilder.toJson(idPedido);
                     respuestaServer = pedidoJson;
                	
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
