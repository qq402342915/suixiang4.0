package servlet;

import dao.BackInfoDao;
import dao.BackInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Background;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/bgffServlet")
public class bgServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String  addr=request.getParameter("bgPath");//获取表单数据
        BackInfoDao backInfoDao=new BackInfoDaoImpl();//实例化backInfoDao
        UserInfoDao userInfoDao=new UserInfoDaoImpl();//userInfoDao
        //调用DAO操作
        List<Background> backgroundList=backInfoDao.getBackByPath(addr);//得到图片路径
        int bId=backgroundList.get(0).getBgId();//通过路径的到id

//        HttpSession session = request.getSession();//获取session对象
////      String telNum=(String) session.getAttribute("telNum");//获取手机号
//        String telNum = "13222222111";//
//        List<User> userList=userInfoDao.getUser("");//通过手机号码的到用户的信息
        int ret =userInfoDao.UpdateBg(bId,"13888888888");


        PrintWriter out=response.getWriter();
        out.print(ret);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
