package servlet;

import dao.FansInfoDao;
import dao.FansInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Fansuser;
import entity.User;
import org.apache.poi.ss.formula.functions.Now;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@WebServlet("/InsertFollow")
public class InsertFollowServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        FansInfoDao fansInfoDao=new FansInfoDaoImpl();
        UserInfoDao userInfoDao=new UserInfoDaoImpl();

        HttpSession session=request.getSession();
        User user= (User) session.getAttribute("user");
//        String s=request.getParameter("userName");
        List<User> userList=userInfoDao.getUserId(request.getParameter("userName"));

//        int showId=8;
        int showId=userList.get(0).getUserId();
         Fansuser fansuser=new Fansuser();
         fansuser.setFansId(user.getUserId());
         fansuser.setUserId(showId);
         fansuser.setFollowDate(new Date());
        fansInfoDao.addFollow(fansuser);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
doPost(request,response);
    }
}
