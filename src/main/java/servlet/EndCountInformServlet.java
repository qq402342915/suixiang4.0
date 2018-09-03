package servlet;

import dao.InformDao;
import dao.InformDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//获取通知总数量
@WebServlet(name = "EndCountInformServlet",urlPatterns = "/EndCountInformServlet")
public class EndCountInformServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        InformDao informDao = new InformDaoImpl();
        int res= informDao.countAllInform();
        response.getWriter().write(String.valueOf(res));



    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
