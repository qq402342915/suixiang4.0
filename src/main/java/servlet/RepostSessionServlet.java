package servlet;

import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/RepostSession")
public class RepostSessionServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
//        System.out.println(session.getAttribute("user"));
//        User userObj = (User) session.getAttribute("user");
//        JSONObject user = JSONObject.fromObject(session.getAttribute("user"));
        JSONArray user = JSONArray.fromObject(session.getAttribute("user"));
        System.out.println(user.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}