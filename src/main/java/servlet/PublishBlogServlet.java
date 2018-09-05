package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
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
        String s_video = request.getParameter("s_video");
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        Blog blog = new Blog();
        blog.setUserId(user.getUserId());
        if(s_photo != null){
            blog.setBlogPic(s_photo);
        }else {blog.setBlogPic(null);}
        if(s_text != null){
            blog.setContext(s_text);
        }else{blog.setContext(null);}
        if(s_video != null){
            blog.setBlogVideo(s_photo);
        }else{blog.setBlogVideo(null);}
        System.out.println(s_photo+""+s_text+""+s_video);
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        int ret = blogInfoDao.insertBlog(blog);
        PrintWriter out = response.getWriter();
        out.print(ret);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
