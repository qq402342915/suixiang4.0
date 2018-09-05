package servlet;

import dao.PraiseInfoDao;
import dao.PraiseInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Praise;
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

@WebServlet("/PraiseServlet")
public class ShowPraiseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name=request.getParameter("userName");
        PraiseInfoDao praiseInfoDao=new PraiseInfoDaoImpl();//实例化praiseInfoDao
        UserInfoDao userInfoDao=new UserInfoDaoImpl();//实例化userInfoDao

        List<Praise> praiseList=praiseInfoDao.getPraiseById(20);//通过点赞id获取点赞信息

        List<User> userList=new ArrayList<User>();
        for(int i=0;i<praiseList.size();i++){
            int userid=praiseList.get(i).getUserId();//通过微博id得到点赞的userid
            userList.add((User) userInfoDao.getUser(userid).get(0));//把得到的每个用户信息的信息当做一项存入userList中
        }
        //转化日期格式
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
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
