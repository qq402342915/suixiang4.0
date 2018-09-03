//package servlet;
//
//import dao.UserInfoDao;
//import dao.UserInfoDaoImpl;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.PrintWriter;
//
//import static util.UpdateHeadP.*;
//
//@WebServlet( "/UpdateHeadp")
//public class UpdateHeadpServlet extends HttpServlet {
//    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//        String headP=new UpdateHeadP().getUrl();
//        UserInfoDao userInfoDao=new UserInfoDaoImpl();
//        System.out.println(headP);
//        int ret =userInfoDao.UpdateHeadP("../upload/"+headP,"13777777777");
//        PrintWriter out=response.getWriter();
//        out.println(ret);
//        out.flush();
//        out.close();
//    }
//
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        doPost(request, response);
//    }
//}
