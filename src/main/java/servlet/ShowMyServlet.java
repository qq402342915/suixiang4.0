package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
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
import java.util.List;

@WebServlet("/ShowMy")
public class ShowMyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String telNum = request.getParameter("w_tel");
        HttpSession session = request.getSession();
//        System.out.println("test"+telNum);
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);

//        JSONArray user = JSONArray.fromObject();
//        UserInfoDao userInfoDao = new UserInfoDaoImpl();
//        List<User> userList = userInfoDao.getUser(telNum);
        PrintWriter out = response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject((User)session.getAttribute("user"),jsonConfig)));
        out.flush();
        out.close();
//        System.out.println(user.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
