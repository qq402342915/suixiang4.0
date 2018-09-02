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
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

@WebServlet("/ShowInformation")
public class ShowInformationServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        String telNumber="13777777777"/**/;
        UserInfoDao userInfoDao = new UserInfoDaoImpl();

        //获取当前用户信息
        List<User> userList = userInfoDao.getUser(telNumber);
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);


        PrintWriter out = response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(userList,jsonConfig)));
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
