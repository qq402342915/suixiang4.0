package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import entity.Blog;
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

@WebServlet(name = "ShowAllBlogServlet",urlPatterns = "/ShowAllBlogServlet")
public class ShowAllBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        List<Blog> blogList = blogInfoDao.getAllBlog();
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        response.getWriter().write(String.valueOf(JSONArray.fromObject(blogList,jsonConfig)));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
