package servlet;

import dao.PraiseInfoDao;
import dao.PraiseInfoDaoImpl;
import entity.Praise;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/SPraiseShow")
public class SPraiseShowServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int blogId=Integer.parseInt(request.getParameter("praise").trim());
//        int praId=Integer.parseInt(request.getParameter("praId"));
        User p =  (User) request.getSession().getAttribute("user");

        int user_id = p.getUserId();

        PraiseInfoDao praiseInfoDao=new PraiseInfoDaoImpl();
        List<Praise> praise = praiseInfoDao.getPraisetwoById(blogId,user_id);
        int ret = 0;
        if(praise.size()!=0){
            ret = 0;
        }else{
            ret = 1;
        }
        PrintWriter out=response.getWriter();
        out.print(ret);
        out.flush();out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
