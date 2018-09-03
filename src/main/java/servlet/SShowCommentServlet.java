package servlet;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import entity.Comment;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/SShowComment")
public class SShowCommentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        CommentInfoDao commentInfoDao = new CommentInfoDaoImpl();
        List<Comment> comList = commentInfoDao.getAllComment(blogId);
        JSONArray comJSonArr = JSONArray.fromObject(comList);
        PrintWriter out = response.getWriter();
        out.print(comJSonArr);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
