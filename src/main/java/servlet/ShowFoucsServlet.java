package servlet;

import dao.FansInfoDao;
import dao.FansInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Fansuser;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/FoucsServlet")
public class ShowFoucsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name=request.getParameter("userName");
        FansInfoDao fansInfoDao=new FansInfoDaoImpl();//实例化一个fansDao
        UserInfoDao userInfoDao=new UserInfoDaoImpl();//实例化一个UserDao
        List<Fansuser> fansList=fansInfoDao.getAllFans(3);//得到用户id=3的粉丝

        List<User> userList= new ArrayList<User>();//定义一个空集合
        for(int i=0;i<fansList.size();i++){//用户粉丝列表
            int fansId= fansList.get(i).getFansId();//得到粉丝id
            userList.add((User) userInfoDao.getUser(fansId).get(0));//把fansList的每个用户的所有信息当做一项，
                                                        // 放在定义的userList集合中
            }
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();//转化日期格式
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        PrintWriter out=response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(userList,jsonConfig)));
            out.flush();
            out.close();

        }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
