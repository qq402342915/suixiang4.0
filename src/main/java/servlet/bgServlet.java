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
        String  backgPath=request.getParameter("bgPath");//获取表单数据
        BackInfoDao backInfoDao=new BackInfoDaoImpl();//实例化
        //调用DAO操作
        List<Background> backgroundList=backInfoDao.getBackByPath(backgPath);//得到图片路径
        int bId=backgroundList.get(0).getBgId();//通过路径的到id
        UserInfoDao userInfoDao=new UserInfoDaoImpl();

//        UserInfoDao userInfoDao=new UserInfoDaoImpl();
        HttpSession session = request.getSession();//获取session对象
        String telNum = "13222222111";
//        int backId= (int) session.getAttribute("bgId");//获取当前属性
        String name=(String) session.getAttribute("userName");
        User user=new User();
//        user.setUserName("23232");
//        user.setEmail("");
//        user.setSex("男");
//        user.setSchool("");
//        user.setSign("");
//        session.setAttribute("bgId",bId);
        session.setAttribute("userName","22222");
        userInfoDao.updateUser(user,telNum);

//        String backId=request.getParameter("bgId");
//        User user=new User();
//        HttpSession session = request.getSession();//获取session对象
//        List list= (List) session.getAttributeNames();
//
//        User u=(User) session.getAttribute("user");//取值
//        System.out.println(u.getUserId());
//        int  uid=session.getAttribute("userId");//得到用户id
//        request.getSession().setAttribute("userId",userList);
//        request.getSession().setAttribute("bgPath",bId);
//        request.getSession().setAttribute("userId",56);
        // User u1=session.setAttribute("bgPath",);//赋值
//        response.getWriter().print(JSONObject.fromObject(u));
        //把userList的背景id付给user
//        user.setBgId(userList.get(0).getBgId());
//        user.setUserId(userList.get(0).getUserId());
//        user.setUserName(userList.get(0).getUserName());
//        user.setPassword(userList.get(0).getPassword());
//        user.setTelNum(userList.get(0).getTelNum());
//        user.setSex(userList.get(0).getSex());
//        user.setRegDate(userList.get(0).getRegDate());
//        user.setEmail(userList.get(0).getEmail());
//        user.setAddress(userList.get(0).getAddress());
        //输出
//        PrintWriter out=response.getWriter();
//        out.print(String.valueOf(bId));
//        out.flush();
//        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
