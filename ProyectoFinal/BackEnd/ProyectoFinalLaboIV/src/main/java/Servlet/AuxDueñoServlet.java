package Servlet;

import Controlador.ControladorAuxDueño;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.AuxDueño;
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

//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/AuxDuenoServlet?
@WebServlet(name = "AuxDuenoServlet", urlPatterns = {"/AuxDuenoServlet"})
public class AuxDueñoServlet extends HttpServlet {
    
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
                if(request.getParameter("action").equals("rankingComidas")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    List<AuxDueño> lista = controlador.buscarRankingComidas(dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String auxDuenoJson = gsonBuilder.toJson(lista);
                    respuestaServer = auxDuenoJson;
                    
                }else if(request.getParameter("action").equals("rankingComidasMail")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String email = request.getParameter("email");
                    String dateInicio = request.getParameter("fechaInicio");
                    String dateFin = request.getParameter("fechaFin");
                    List<AuxDueño> lista = controlador.buscarRankingComidas(dateInicio, dateFin);
                    String respuesta = controlador.sendMailandExcelRankingComidas(lista, email, dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(respuesta);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("recaudacion")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    double recaudacionTotal = controlador.obtenerRecaudacion(dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String auxDuenoJson = gsonBuilder.toJson(recaudacionTotal);
                    respuestaServer = auxDuenoJson;
                    
                }else if(request.getParameter("action").equals("recaudacionMail")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String email = request.getParameter("email");
                    String dateInicio = request.getParameter("fechaInicio");
                    String dateFin = request.getParameter("fechaFin");
                    String recaudacion = request.getParameter("recaudacion");
                    System.out.println("RECAUDACION => " + recaudacion);
                    String respuesta = controlador.sendMailandExcelRecaudacion(recaudacion, email, dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(respuesta);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("pedidosCliente")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    List<AuxDueño> lista = controlador.obtenerPedidosXCliente(dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String auxDuenoJson = gsonBuilder.toJson(lista);
                    respuestaServer = auxDuenoJson;
                    
                }else if(request.getParameter("action").equals("pedidosMail")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String email = request.getParameter("email");
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    System.out.println("FECHA INICIO =>" + dateInicio);
                    System.out.println("FECHA FIN =>" + dateFin);
                    List<AuxDueño> listaPedidos = controlador.obtenerPedidosXCliente(dateInicio, dateFin);
                    if(listaPedidos.size() > 0){
                        
                        for(AuxDueño item: listaPedidos){
            
                            System.out.println("CANTIDAD DE PEDIDOS => " + item.getCantidadPedidos() + "\nID_CLIENTE => " + item.getIdCliente()+
                                                "\nNOMBRE => " + item.getNombreCliente() + "\nAPELLIDO => " + item.getApellidoCliente());
                            System.out.println("");
                        }
        
                        
                    }else{
                        
                        System.out.println("NO TIENE ELEMENTOS");
                        
                    }
                    String respuesta = controlador.sendMailandExcelPedidosXCliente(listaPedidos, email, dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(respuesta);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("ganancias")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    double ganancias = controlador.obtenerGanancia(dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String auxDuenoJson = gsonBuilder.toJson(ganancias);
                    respuestaServer = auxDuenoJson;
                    
                }else if(request.getParameter("action").equals("gananciasMail")){
                    
                    ControladorAuxDueño controlador = new ControladorAuxDueño();
                    String email = request.getParameter("email");
                    String dateInicio = request.getParameter("dateInicio");
                    String dateFin = request.getParameter("dateFin");
                    String ganancias = request.getParameter("ganancias");
                    System.out.println("GANANCIAS => " + ganancias);
                    String respuesta = controlador.sendMailandExcelGanancia(ganancias, email, dateInicio, dateFin);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(respuesta);
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

