package servlet;

import dao.InformDao;
import dao.InformDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//更改通知状态，由未处理到已处理
@WebServlet(name = "EndUpdateStateServlet",urlPatterns = "/EndUpdateStateServlet")
public class EndUpdateStateServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String informIdStr = request.getParameter("informId");
        int informId = Integer.parseInt(informIdStr);
        InformDao informDao = new InformDaoImpl();
        int res= informDao.changeInformState(informId);
        response.getWriter().write(String.valueOf(res));


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
