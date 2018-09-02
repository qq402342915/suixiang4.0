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

@WebServlet("/UpdateInformation")
public class UpdateInformationServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        //获取当前属性
        String userName = request.getParameter("userName");
        String telNumber = request.getParameter("telNumber");
        String email = request.getParameter("email");
        String sex = request.getParameter("sex");
        String school = request.getParameter("school");
        String sign = request.getParameter("sign");


        String birthday =request.getParameter("birthday");
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd ");
//        Date birth=new Date();
//        try {
//             birth=sdf.parse(birthday);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        System.out.println(birth);
        String address = request.getParameter("address");
        String telNum = "13777777777";
        User user = new User();

        user.setUserName("111");
        user.setTelNum(telNumber);
        user.setEmail(email);
        user.setSex(sex);
        user.setSchool(school);
        user.setSign(sign);

        // user.setBirthday(birthday);
        user.setAddress(address);
        userInfoDao.updateUser(user,telNum);


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
