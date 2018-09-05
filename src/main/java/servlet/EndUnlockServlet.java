package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
import org.apache.poi.hssf.util.HSSFColor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@WebServlet(name = "EndUnlockServlet",urlPatterns = "/EndUnlockServlet")
public class EndUnlockServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userIdStr=request.getParameter("userId");
        int userId=Integer.parseInt(userIdStr);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> userList = userInfoDao.getUser(userId);
        System.out.println(userList.get(0).getLockDate());
        Date lockdate= userList.get(0).getLockDate();
        Date currentDate = new Date();
        long diff = currentDate.getTime() - lockdate.getTime();
        //超过3小时解锁
        if(diff>=10800000){
            userInfoDao.unLockDate(userId);
        }


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
