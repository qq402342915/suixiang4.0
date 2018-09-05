package servlet;

import dao.PraiseInfoDao;
import dao.PraiseInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/CountPraiseServlet")
public class CountPraiseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int blogId=Integer.parseInt(request.getParameter("blogId"));

        //调dao
        PraiseInfoDao praiseInfoDao=new PraiseInfoDaoImpl();
        int ret=praiseInfoDao.getPraiseCount(blogId);

        PrintWriter out=response.getWriter();
        out.print(ret);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
