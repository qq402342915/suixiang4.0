package servlet;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import entity.Blog;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/ShowBlogInfo")
public class ShowBlogInfoServlet extends HttpServlet {

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        String method = request.getParameter("method");//得到传入的值下面根据传入的值执行不同的方法！！
        System.out.println("method="+method);
        if(method.equals("showMyBlogCount"))
        {
            showMyBlogCount(request, response);//执行blogCount代码
        } else if(method.equals("showBlogInfo")){
            showMyBlogInfo(request, response);//执行allBlogInfo代码
        }

    }

    private void showMyBlogCount(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        int userId = user.getUserId();
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        int myBlogCount = blogInfoDao.getCountBlog(userId);
        PrintWriter out = response.getWriter();
        out.print(myBlogCount);
        out.flush();
        out.close();
    }

    private void showMyBlogInfo(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException
    {
        //这里写有关登录的代码

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        List<Blog> blogList = blogInfoDao.getBlogByKey(8,"hello");
        JSONArray array = JSONArray.fromObject(blogList);
        PrintWriter out = response.getWriter();
        out.print(array);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
