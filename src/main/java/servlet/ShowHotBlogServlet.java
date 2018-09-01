package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Blog;
import entity.User;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/ShowHotBlog")
public class ShowHotBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BlogInfoDao blogDao = new BlogInfoDaoImpl();
        UserInfoDao userDao = new UserInfoDaoImpl();
        List<Blog> blogList = blogDao.searchDayBlog();
        List<User> userList = new ArrayList<User>();
        for(int i = 0; i < blogList.size();i++){
            userList.add(userDao.getUser(blogList.get(i).getUserId()).get(0));
        }
        JSONArray blog = JSONArray.fromObject(blogList);
        JSONArray user= JSONArray.fromObject(userList);
        response.getWriter().print(blog.toString()+""+user.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
