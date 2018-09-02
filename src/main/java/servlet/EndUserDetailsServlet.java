package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import service.EndShowAllUserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//显示用户详情信息
@WebServlet(name = "EndUserDetailsServlet",urlPatterns = "/EndUserDetailsServlet")
public class EndUserDetailsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userIdStr=request.getParameter("userId");
        EndShowAllUserService endShowAllUserService = new EndShowAllUserService();
        response.getWriter().write(endShowAllUserService.detailsUser(userIdStr));

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
