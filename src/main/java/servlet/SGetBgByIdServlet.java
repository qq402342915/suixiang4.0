package servlet;

import dao.BackInfoDao;
import dao.BackInfoDaoImpl;
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

@WebServlet("/SGetBgByIdServlet")
public class SGetBgByIdServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int bgId = Integer.parseInt(request.getParameter("bgId"));
        BackInfoDao backInfoDao = new BackInfoDaoImpl();
        List<Background> backgroundList = backInfoDao.getBackById(bgId);
        PrintWriter out = response.getWriter();
        out.print(backgroundList.get(0).getBgPath());
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
