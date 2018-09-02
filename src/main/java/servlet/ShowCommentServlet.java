package servlet;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Comment;
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

@WebServlet("/CommentServlet")
public class ShowCommentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name=request.getParameter("userName");

        CommentInfoDao commentInfoDao=new CommentInfoDaoImpl();//实例化commentInfoDao
        UserInfoDao userInfoDao=new UserInfoDaoImpl();//实例化userDao

        List<Comment> commentList=commentInfoDao.getAllComment(21);//通过微博id得到评论信息

        List<User> userList=new ArrayList<User>();
        for(int i=0;i<commentList.size();i++){
            int userid=commentList.get(i).getUserId();//通过微博id得到评论用户的id，
            userList.add((User) userInfoDao.getUser(userid).get(0));//把得到的每一个用户的所有信息作为一项存入userlist
        }
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
