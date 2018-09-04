package servlet;

import dao.FansInfoDao;
import dao.FansInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Fansuser;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/ShowFans")
public class ShowFansServlet extends HttpServlet {
    int userId;
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String method = request.getParameter("method");//得到传入的值下面根据传入的值执行不同的方法！！
        System.out.println("method="+method);
        if(method.equals("showMyFollowCount"))
        {
            showMyFollowCount(request, response);
        } else if(method.equals("showMyFansCount")){
            showMyFansCount(request, response);
        } else if(method.equals("showMyFollowInfo")) {
            showMyFollowInfo(request, response);
        } else if(method.equals("showMyFansInfo")) {
            showMyFansInfo(request, response);
        }else if (method.equals("showIfFollow")) {
            showIfFollow(request,response);
        }else if (method.equals("addFollow")){
            addFollow(request,response);
        }else if (method.equals("cancelFollow")){
            cancelFollow(request,response);
        }
    }

    private void showMyFollowCount(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        userId = user.getUserId();
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        int myFollowCount = fansInfoDao.getFollowCount(userId);
        PrintWriter out = response.getWriter();
        out.print(myFollowCount);
        out.flush();
        out.close();
    }

    private void showMyFansCount(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        int myFansCount = fansInfoDao.getFansCount(userId);
        PrintWriter out = response.getWriter();
        out.print(myFansCount);
        out.flush();
        out.close();
    }

    private void showMyFollowInfo(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        List<Fansuser> myAllFollowId = fansInfoDao.getAllFollowId(userId);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> myAllFollow = new ArrayList<User>();
        for (int i = 0; i < myAllFollowId.size(); i++){
            User user = userInfoDao.getUser(myAllFollowId.get(i).getUserId()).get(0);
            myAllFollow.add(user);
        }
        JSONArray array = JSONArray.fromObject(myAllFollow);
        PrintWriter out = response.getWriter();
        out.print(array);
        out.flush();
        out.close();
    }

    private void showMyFansInfo(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        List<Fansuser> myAllFansId = fansInfoDao.getAllFansId(userId);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> myAllFans = new ArrayList<User>();
        for (int i = 0; i < myAllFansId.size(); i++){
            User user = userInfoDao.getUser(myAllFansId.get(i).getFansId()).get(0);
            myAllFans.add(user);
        }
        JSONArray array = JSONArray.fromObject(myAllFans);
        PrintWriter out = response.getWriter();
        out.print(array);
        out.flush();
        out.close();
       /* UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> myAllFans = userInfoDao.getAllFans(userId);
        JSONArray array = JSONArray.fromObject(myAllFans);
        PrintWriter out = response.getWriter();
        out.print(array);
        out.flush();
        out.close();*/
    }

    private void showIfFollow(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        String fansId = request.getParameter("fansId");
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        boolean result = fansInfoDao.getIfFollow(userId,Integer.parseInt(fansId));
        PrintWriter out = response.getWriter();
        out.print(result);
        System.out.println(result);
        out.flush();
        out.close();
    }

    private void addFollow(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        String fansId = request.getParameter("fansId");
        Fansuser fansuser = new Fansuser(userId,Integer.parseInt(fansId));
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        int result = fansInfoDao.addFollow(fansuser);
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
        out.close();
    }

    private void cancelFollow(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        String fansId = request.getParameter("fansId");
        FansInfoDao fansInfoDao = new FansInfoDaoImpl();
        int result = fansInfoDao.cancelFollow(userId,Integer.parseInt(fansId));
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
        out.close();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
