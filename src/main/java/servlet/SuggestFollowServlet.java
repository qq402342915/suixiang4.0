package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@WebServlet("/SuggestFollow")
public class SuggestFollowServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        User user = new User();
        HttpSession Session = request.getSession();
        user = (User) Session.getAttribute("user");

//        List<User> userList=userInfoDao.getNotFansId(8);
        List<User> userList = userInfoDao.getNotFansId(user.getUserId());
        JsonConfig jsonConfig = new JsonConfig();
        JsonDate jd = new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class, jd);
        List<User> userList2 = new ArrayList<>();
        Random random = new Random();
        if (userList.size() < 4) {
            for (int i = 0; i < userList.size(); i++) {
                userList2.set(i,userList.get(i));
            }
        } else {
            for (int i = 0; i < 4; i++) {
                int flag = 0;
                int num = random.nextInt(userList.size());
                userList2.add(userList.get(num));
                for (int j = 0; j < i; j++) {

                    if (userList2.get(i) == userList2.get(j))
                        flag--;
                }
                if (flag < 0) i--;
            }
        }

        PrintWriter out = response.getWriter();
        out.print(String.valueOf(JSONArray.fromObject(userList2, jsonConfig)));
        out.flush();
        out.close();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
