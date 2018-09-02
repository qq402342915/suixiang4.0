package servlet;

import service.EndShowAllUserService;
import service.EndShowCommentService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//展示所有用户列表
@WebServlet(name = "EndShowAllUserServlet",urlPatterns = "/EndShowAllUserServlet")
public class EndShowAllUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pageNo=request.getParameter("pageNo");
        String pageSize=request.getParameter("pageSize");

        EndShowAllUserService endShowAllUserService = new EndShowAllUserService();
        response.getWriter().write(endShowAllUserService.showAllUser(pageNo,pageSize));


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
