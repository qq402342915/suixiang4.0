package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "GetBlogCountServlet",urlPatterns = "/GetBlogCountServlet")
public class GetBlogCountServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        response.getWriter().write(String.valueOf(blogInfoDao.getCountBlog()));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
