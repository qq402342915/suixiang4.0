package servlet;

import dao.*;
import entity.Inform;
import entity.SysInform;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/InformServlet")
public class ShowInformServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession();//
        User user = (User) session.getAttribute("user");
        int userid = user.getUserId();//通过session的到userID

        SysInformInfoDao sysInformInfoDao = new SysInformDaoImpl();
        List<SysInform> sysInformList = sysInformInfoDao.showWarn(userid);

        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();//转化日期格式
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        PrintWriter out=response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(sysInformList,jsonConfig)));
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
