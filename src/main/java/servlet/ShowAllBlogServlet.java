package servlet;

import service.ShowAllBlogService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(name = "ShowAllBlogServlet",urlPatterns = "/ShowAllBlogServlet")
public class ShowAllBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pageNoStr=request.getParameter("pageNo");
        String pageSizeStr=request.getParameter("pageSize");
        //访问service
        ShowAllBlogService showAllBlogService = new ShowAllBlogService();
        //得到返回值
        String res= showAllBlogService.selectLimit(pageNoStr,pageSizeStr);

        response.getWriter().write(res);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
