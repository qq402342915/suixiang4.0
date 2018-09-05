package servlet;



import dao.UserInfoDao;
import dao.UserInfoDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//根据时间查询用户的注册量
@WebServlet(name = "EndSelectTimeServlet",urlPatterns = "/selectUserCountByTime")
public class EndSelectTimeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        //查询昨天或前天的记录
        if(request.getParameter("day")!=null){
            String dayStr=request.getParameter("day");
            int day = Integer.parseInt(dayStr);

            response.getWriter().write(String.valueOf(userInfoDao.countPreDay(day)));
        }//查询今天的记录
        else{
            response.getWriter().write(String.valueOf(userInfoDao.countToday()));
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
