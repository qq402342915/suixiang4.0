package servlet;

import dao.BackInfoDao;
import dao.BackInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Background;
import entity.User;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/bgffServlet")
public class bgServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String  backgPath=request.getParameter("bgPath");//获取表单数据
        BackInfoDao backInfoDao=new BackInfoDaoImpl();//实例化
        UserInfoDao userInfoDao=new UserInfoDaoImpl();
        User user=new User();
        //调用DAO操作
        List<Background> backgroundList=backInfoDao.getBackByPath(backgPath);
        int bId=backgroundList.get(0).getBgId();
        List<User> userList=userInfoDao.getUser(2);
        //设置userList的背景id
        userList.get(0).setBgId(bId);
        //把userList的背景id付给user
        user.setBgId(userList.get(0).getBgId());
        user.setUserId(userList.get(0).getUserId());
        user.setUserName(userList.get(0).getUserName());
        user.setPassword(userList.get(0).getPassword());
        user.setTelNum(userList.get(0).getTelNum());
        user.setSex(userList.get(0).getSex());
        user.setRegDate(userList.get(0).getRegDate());
        user.setEmail(userList.get(0).getEmail());
        user.setAddress(userList.get(0).getAddress());
        /*userInfoDao.updateUser(user);*/
        //输出
        PrintWriter out=response.getWriter();
        out.print(String.valueOf(bId));
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
