package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Background;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/BackServlet")
public class userBgServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path=request.getParameter("");//获取表单数据
        Background background=new Background();
        UserInfoDao userInfoDao=new UserInfoDaoImpl();//实例化
        User user=new User();
//        int  updateUser=userInfoDao.updateUser(user);
        PrintWriter out=response.getWriter();
//        out.print(updateUser);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
