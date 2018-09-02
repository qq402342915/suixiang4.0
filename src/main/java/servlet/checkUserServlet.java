package servlet;

import com.google.gson.JsonArray;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
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

@WebServlet("/checkUserServlet")
public class checkUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao=new UserInfoDaoImpl();
        List<User> list=userInfoDao.getAllUser();
        JSONArray array = JSONArray.fromObject(list);
        PrintWriter ret=response.getWriter();
        ret.print(array);
        ret.flush();
        ret.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
