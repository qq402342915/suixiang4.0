package servlet;

import entity.Blog;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/PublishBlogServlet")
public class PublishBlogServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String s_photo = request.getParameter("s_photo");
        String s_text = request.getParameter("s_text");
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        Blog blog = new Blog();
        System.out.println("6660"+s_photo);
//        PrintWriter out = response.getWriter();
//        out.print(userblog);
//        out.flush();
//        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
