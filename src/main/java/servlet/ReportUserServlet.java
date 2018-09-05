package servlet;

import dao.InformDao;
import dao.InformDaoImpl;
import entity.Inform;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/ReportUserServlet")
public class ReportUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession httpSession = request.getSession();
        User user = (User)httpSession.getAttribute("user");
        int reporterId = user.getUserId();
        String userId = request.getParameter("userId");
        String content = request.getParameter("content");
        InformDao informDao = new InformDaoImpl();
        Inform inform = new Inform(Integer.parseInt(userId),reporterId,content);
        int result = informDao.insertInform(inform);
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            doPost(request,response);
    }
}
