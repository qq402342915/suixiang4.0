package servlet;

import dao.UserBlogDao;
import dao.UserBlogDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.BlogContext;
import entity.User;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//根据点赞数显示最热门的前五条微博并返回该微博作者的昵称
@WebServlet(name = "EndHotServlet",urlPatterns = "/EndHotServlet")
public class EndHotServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserBlogDao userBlogDao = new UserBlogDaoImpl();
        List<BlogContext> userList = userBlogDao.hotBlogUserNameByP();
        response.getWriter().write(String.valueOf(JSONArray.fromObject(userList)));


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
