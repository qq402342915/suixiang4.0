package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "EndBlogCountServlet",urlPatterns = "/EndBlogCountServlet")
//获取指定查询用户的微博数量
public class EndBlogCountServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取用户id
        String userIdStr=request.getParameter("userId");
        //类型转换
        int userId=Integer.parseInt(userIdStr);
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        //调用方法获得数量
        response.getWriter().write(String.valueOf( blogInfoDao.getCountBlog("userId",userId)));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
