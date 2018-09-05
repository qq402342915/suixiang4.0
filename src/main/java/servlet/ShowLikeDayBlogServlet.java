package servlet;

import dao.NewUserBlogDao;
import dao.NewUserBlogDaoImpl;
import entity.User;
import entity.UserBlog;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/ShowLikeDayBlog")
public class ShowLikeDayBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        NewUserBlogDao userBlogDao = new NewUserBlogDaoImpl();
        List<UserBlog> userblogList= userBlogDao.searchLikeDayBlog(((User)session.getAttribute("user")).getUserId());
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
