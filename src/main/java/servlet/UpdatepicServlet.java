package servlet;

import dao.UserInfoDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import util.UpdatePic;
import util.UploadFile;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/Updatepic")
public class UpdatepicServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<String> fileSrcList = UpdatePic.upload(request);
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        String telNumber = user.getTelNum();

        JSONObject obj = new JSONObject();
        obj.put("errno", 0);
        obj.put("data", JSONArray.fromObject(fileSrcList));

        String str = obj.toString();

        int begin = str.indexOf("upload");
        int end = str.indexOf("]") - 1;
        System.out.println(str.substring(begin, end));
        String url = "../" + str.substring(begin, end);
        user.setHeadP(url);
        session.setAttribute("user", user);
        new UserInfoDaoImpl().UpdateHeadP(url, telNumber);
        response.getWriter().print(obj.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
