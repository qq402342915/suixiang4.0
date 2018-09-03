package servlet;

import service.EndShowCommentService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "EndShowCommentServlet",urlPatterns = "/EndShowCommentServlet")
//根据指定微博显示微博评论数
public class EndShowCommentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取微博id
        String blogIdStr=request.getParameter("blogId");
        EndShowCommentService endShowCommentService = new EndShowCommentService();
        //返回结果
        response.getWriter().write(endShowCommentService.showComment(blogIdStr));


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
