package servlet;

import dao.BlogInfoDaoImpl;
import entity.Blog;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ShowAllBlogInfoServlet",urlPatterns = "/ShowAllBlogInfoServlet")
public class ShowAllBlogInfoServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("hahhah");
        //创建对象调用查询所有微博方法
        BlogInfoDaoImpl blogInfoDao=new BlogInfoDaoImpl();
        //创建存放所有微博的集合
        List<Blog> allBlogList=blogInfoDao.getAllBlog();
        //转化为json
        JSONArray blog=JSONArray.fromObject(allBlogList);
        resp.getWriter().write(String.valueOf(blog));

    }
}
