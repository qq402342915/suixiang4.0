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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@WebServlet("/SuggestFollow")
public class SuggestFollowServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        User user = new User();
        HttpSession Session = request.getSession();
        user = (User) Session.getAttribute("user");

//        List<User> userList=userInfoDao.getNotFansId(8);
//        Integer.parseInt(request.getParameter("page"));
        List<User> userList2 = userInfoDao.getNotFansId(user.getUserId());
        int i=new Random().nextInt(userList2.size()/4)+1;
        List<User> userList = userInfoDao.getNotFansId(user.getUserId(),i,4);
        JsonConfig jsonConfig = new JsonConfig();
        JsonDate jd = new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class, jd);



        PrintWriter out = response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(userList, jsonConfig)));
        out.flush();
        out.close();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
