package servlet;

import dao.InformDao;
import dao.InformDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Inform;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/InformServlet")
public class ShowInformServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name=request.getParameter("userName");
        InformDao informDao=new InformDaoImpl();
        UserInfoDao userInfoDao=new UserInfoDaoImpl();
        List<Inform> informList=informDao.getInformById(10);//通过通知id得到举报信息

        List<User> userList=new ArrayList<User>();
        for(int i=0;i<informList.size();i++){
            int userId=informList.get(i).getUserId();
            userList.add((User) userInfoDao.getUser(userId).get(0));
        }
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();//转化日期格式
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        PrintWriter out=response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(userList,jsonConfig)));
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
