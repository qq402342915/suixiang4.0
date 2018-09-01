package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import entity.Blog;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/ShowHotBlog")
public class ShowHotBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BlogInfoDao blogDao = new BlogInfoDaoImpl();
        List<Blog> blogList = blogDao.searchDayBlog();
        JSONArray blog = JSONArray.fromObject(blogList);
        response.getWriter().print(blog);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
