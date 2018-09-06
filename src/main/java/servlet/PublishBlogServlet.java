package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import dao.TranspondInfoDao;
import dao.TranspondInfoDaoImpl;
import entity.Blog;
import entity.Transpond;
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
        if(request.getParameter("blogId") != null && request.getParameter("blogId") != ""){
            int blogId = Integer.parseInt(request.getParameter("blogId"));
            TranspondInfoDao transpondInfoDao = new TranspondInfoDaoImpl();
            Transpond transpond = new Transpond(blogId,user.getUserId());
            transpondInfoDao.insertTranspond(transpond);
        }
        Blog blog = new Blog();
        blog.setUserId(user.getUserId());
        System.out.println(s_text+""+s_video);
        if(s_photo != "null" && s_photo != ""){
            blog.setBlogPic(s_photo);
        }else {blog.setBlogPic(null);}
        if(s_text != null && s_text != ""){
            blog.setContext(s_text);
        }else{blog.setContext(null);}
        if(!("null".equals(s_video)) && s_video != ""){
            blog.setBlogVideo(s_video);
        }else{blog.setBlogVideo(null);}
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
