package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsDateJsonValueProcessor;
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

@WebServlet("/checkUserServlet")
public class checkUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao=new UserInfoDaoImpl();
        List<User> list=userInfoDao.getAllUser();

        //转换日期格式
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);

        //输出String.valueOf(JSONArray.fromObject(list,jsonConfig))
        PrintWriter ret=response.getWriter();
        ret.print(String.valueOf(JSONArray.fromObject(list,jsonConfig)));
        ret.flush();
        ret.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
