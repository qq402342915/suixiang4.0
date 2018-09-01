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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/UpdateInformation")
public class UpdateInformationServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        //获取当前属性
        String nickName = request.getParameter("nickName");
        String telNumber = request.getParameter("telNumber");
        String email = request.getParameter("email");
        String sex = request.getParameter("sex");
        String school = request.getParameter("school");

        String sign = request.getParameter("sign");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date birthday = null;
        try {
            birthday = formatter.parse(request.getParameter("birthday"));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String address = request.getParameter("address");
        User user = new User();

        user.setUserName(nickName);
        user.setTelNum(telNumber);
        user.setEmail(email);
        user.setSex(sex);
        user.setSchool(school);
        user.setSign(sign);
        user.setBirthday(birthday);
        user.setAddress(address);
        userInfoDao.updateUser(user);


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
