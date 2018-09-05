package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet("/ShowMy")
public class ShowMyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        /*JSONArray user = JSONArray.fromObject(session.getAttribute("user"));*/
        PrintWriter out = response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(session.getAttribute("user"),jsonConfig)));
        out.flush();
        out.close();
//        System.out.println(user.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
