package servlet;

import dao.*;
import entity.UserBlog;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/ShowHotBlog")
public class ShowHotBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        NewUserBlogDao userBlogDao = new NewUserBlogDaoImpl();
        List<UserBlog> userblogList= userBlogDao.searchDayBlog();
        JSONArray userblog = JSONArray.fromObject(userblogList);
        PrintWriter out = response.getWriter();
        out.print(userblog);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
