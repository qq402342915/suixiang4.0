package servlet;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import dao.PraiseInfoDao;
import dao.PraiseInfoDaoImpl;
import entity.BlogNum;
import entity.UserBlog;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/SShowNumServlet")
public class SShowNumServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        CommentInfoDao commentInfoDao = new CommentInfoDaoImpl();
        PraiseInfoDao praiseInfoDao = new PraiseInfoDaoImpl();
        BlogNum blogNum = new BlogNum();
        blogNum.setComNum(commentInfoDao.getOneBlogCommentNum(blogId));
        blogNum.setPraNum(praiseInfoDao.getPraiseCount(blogId));
        JSONArray userblog = JSONArray.fromObject(blogNum);
//        System.out.println(userblog);
        PrintWriter out = response.getWriter();
        out.print(userblog);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
