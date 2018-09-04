package servlet;

import dao.AdminInfoDao;
import dao.AdminInfoDaoImpl;
import entity.Adminstrator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "EndLoginServlet",urlPatterns = "/EndLoginServlet")
public class EndLoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userName = request.getParameter("userName");
        String userPass = request.getParameter("userPass");
        AdminInfoDao adminInfoDao = new AdminInfoDaoImpl();
        List<Adminstrator> adminstratorList = adminInfoDao.getAdminByName(userName,userPass);
        if(adminstratorList.isEmpty()){//用户名或密码错误
            response.getWriter().write("0");

        }else{//登录成功
            //信息存到session中
            request.getSession().setAttribute("admin",adminstratorList);
            response.getWriter().write("1");
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
