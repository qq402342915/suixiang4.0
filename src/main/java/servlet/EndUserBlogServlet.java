package servlet;

import service.EndUserBlogService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "EndUserBlogServlet",urlPatterns = "/EndUserBlogServlet")
//返回指定用户的所有微博
public class EndUserBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userId=request.getParameter("userId");
        String pageNoStr=request.getParameter("pageNo");
        String pageSizeStr=request.getParameter("pageSize");

        EndUserBlogService endUserBlogService=new EndUserBlogService();
        response.getWriter().write(endUserBlogService.selectUserBlog(userId,pageNoStr,pageSizeStr));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
