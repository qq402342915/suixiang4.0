package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/addUserServlet")
public class addUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        //1.获得表单数据
        String userName=request.getParameter("userName");
        String password=request.getParameter("password");
        String telNum=request.getParameter("telNum");
        //2. 封装对象
        User user=new User(userName,password,telNum);
        //3.dao
        int ret =new UserInfoDaoImpl().insertUser(user);
        //4.out
        PrintWriter out=response.getWriter();
        out.print(ret);
        out.flush();
        out.close();


//        UserServiceImpl service=new UserServiceImpl();
//        boolean isExist=service.addUserName(userName);
//        String json="{\"isExist\":"+isExist+"}";
//        response.getWriter().write(json);

//        isExist=service.addUserName(userName);
//        response.getWriter().write("{\"isExist\":"+isExist+"}");

//        User userBean=new User();
//        userBean.setUserName(userName);
//        userBean.setTelNum(telNum);
//        userBean.setPassword(password);
////        //3.调dao操作
//        UserInfoDaoImpl userInfoDao=new UserInfoDaoImpl();
//        List<User> list=userInfoDao.getUserName(userBean);
//        PrintWriter out=response.getWriter();
//        if(list.size()>0){
//            System.out.println(list.size());
//            out.print(0);
//        }else {
//            int ret=userInfoDao.insertUser(userBean);
//            System.out.println(ret);
//            out.print(ret);
//        }
//        out.flush();
//        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
