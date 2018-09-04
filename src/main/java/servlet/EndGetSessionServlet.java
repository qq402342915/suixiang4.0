package servlet;

import entity.Adminstrator;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//从session中获取用户名
@WebServlet(name = "EndGetSessionServlet",urlPatterns = "/EndGetSessionServlet")
public class EndGetSessionServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

            List<Adminstrator> adminstratorList = (List<Adminstrator>) request.getSession().getAttribute("admin");
            response.getWriter().write(String.valueOf(JSONArray.fromObject(adminstratorList)));



    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            doPost(request,response);
    }
}
