package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//展示所有的用户数量
@WebServlet(name = "ShowUserCountServlet",urlPatterns = "/ShowUserCountServlet")
public class ShowUserCountServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        response.getWriter().write(String.valueOf(userInfoDao.getCountUser()));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            doPost(request,response);
    }
}
