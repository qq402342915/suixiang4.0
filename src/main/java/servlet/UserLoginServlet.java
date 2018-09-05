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
import java.util.List;

@WebServlet(name = "UserLoginServlet",urlPatterns = "/UserLoginServlet")
public class UserLoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //前端获取值
        String telNum=request.getParameter("w_tel");
        String password=request.getParameter("w_pass");
        String code=request.getParameter("w_code");
        //取出一开始存放 的word
        String word = (String)request.getSession().getAttribute("checkcode_session");

        //实例化
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        //调用方法
        List<User> oneUser = userInfoDao.getUser(telNum,password);

        if(oneUser.isEmpty()){
            //用户名或密码错误或验证码不正确
            response.getWriter().write("false");

        }else if(!code.equalsIgnoreCase(word)){
            //验证码不正确
            response.getWriter().write("codeFalse");
        }
//        else if(userInfoDao.getUserIsLock(telNum)){
//            //用户被锁定
//            response.getWriter().write("isLock");
//        }
        else{
            //登陆成功
            //将用户信息保存在session里
            HttpSession session = request.getSession();
            UserInfoDao userDao = new UserInfoDaoImpl();
            session.setAttribute("user",oneUser.get(0));
            response.getWriter().write("true");
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
