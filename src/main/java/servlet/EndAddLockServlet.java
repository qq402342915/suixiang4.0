package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

//设置锁定时间为系统默认时间
@WebServlet(name = "EndAddLockServlet",urlPatterns = "/EndAddLockServlet")
public class EndAddLockServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userIdStr = request.getParameter("userId");
        int userId = Integer.parseInt(userIdStr);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        int res= userInfoDao.updateLockDate(userId);
        response.getWriter().write(String.valueOf(res));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
