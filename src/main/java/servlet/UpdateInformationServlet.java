package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/UpdateInformation")
public class UpdateInformationServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");

        UserInfoDao userInfoDao = new UserInfoDaoImpl();
//        HttpSession session=request.getSession();
//        User user2= (User) session.getAttribute("user");
//        String telNum=user2.getTelNum();

        String telNum="13122222214";


        //获取当前属性
        String userName = request.getParameter("userName");
        if(userName.equals(""))userName=null;
        String telNumber = request.getParameter("telNumber");
        if(telNumber.equals(""))telNumber=null;
        String email = request.getParameter("email");
        if(email.equals(""))email=null;
        String sex = request.getParameter("sex");
        if(sex.equals(""))sex=null;
        String school = request.getParameter("school");
        if(school.equals(""))school=null;
        String sign = request.getParameter("sign");
        if(sign.equals(""))sign=null;
        String address = request.getParameter("address");
        if(address.equals(""))address=null;
        String birthday =request.getParameter("birthday");


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date birth=sdf.parse(birthday);

            User user = new User();
            user.setUserName(userName);
            user.setTelNum(telNumber);
            user.setEmail(email);
            user.setSex(sex);
            user.setSchool(school);
            user.setSign(sign);
            user.setBirthday(birth);
            user.setAddress(address);
            userInfoDao.updateUser(user,telNum);
//            user.setRegDate(user2.getRegDate());
//            user.setBgId(user2.getBgId());
//            user.setHeadP(user2.getHeadP());
//            user.setLockDate(user2.getLockDate());
//            user.setPassword(user2.getPassword());
//            user.setUserId(user2.getUserId());
//
//
//            session.setAttribute("user",user);

        } catch (ParseException e) {
            e.printStackTrace();
        }
//        System.out.println(birth);



    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
