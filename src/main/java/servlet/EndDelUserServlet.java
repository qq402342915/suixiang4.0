package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//删除单个用户信息，级联删除
@WebServlet(name = "EndDelUserServlet",urlPatterns = "/EndDelUserServlet")
public class EndDelUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userIdStr=request.getParameter("id");
        int userId=Integer.parseInt(userIdStr);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        int res= userInfoDao.delOneUser(userId);
        response.getWriter().write(String.valueOf(res));


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
