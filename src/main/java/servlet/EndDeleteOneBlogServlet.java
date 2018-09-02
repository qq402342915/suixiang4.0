package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "EndDeleteOneBlogServlet",urlPatterns = "/EndDeleteOneBlogServlet")
//删除某一行微博记录
public class EndDeleteOneBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String blogIdStr=request.getParameter("id");
        int blogId=Integer.parseInt(blogIdStr);

        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        int res= blogInfoDao.deleteBlog(blogId);
        response.getWriter().write(String.valueOf(res));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
