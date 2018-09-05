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
        String telNum=request.getParameter("telNum");

        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> userList = userInfoDao.getUser(telNum);
        //如果用户处于被锁定状态
        if(userList.get(0).getLockDate()!=null){
            Date lockdate= userList.get(0).getLockDate();
            Date currentDate = new Date();
            long diff = currentDate.getTime() - lockdate.getTime();
            //超过3小时解锁
            if(diff>=10800000){
                userInfoDao.unLockDate(telNum);
                response.getWriter().write("1");
            }
            else{//未解锁
                response.getWriter().write("0");
            }
        }else{//没有被锁定
            response.getWriter().write("1");
        }



    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);

    }
}
