package servlet;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import entity.Comment;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/SInsertComment")
public class SInsertCommentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Comment comment = new Comment();
        comment.setBlogId(Integer.parseInt(request.getParameter("blogId")));
        comment.setUserId(Integer.parseInt(request.getParameter("userId")));
        comment.setComContent(request.getParameter("comContent"));
        CommentInfoDao commentInfoDao = new CommentInfoDaoImpl();
        int ret = commentInfoDao.insertComment(comment);
        PrintWriter out = response.getWriter();
        out.print(ret);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
