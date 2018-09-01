package service;

import dao.BlogInfoDao;
import dao.BlogInfoDaoImpl;
import entity.Blog;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import java.util.Date;
import java.util.List;


public class EndUserBlogService {
    public String selectUserBlog(String userIdStr){
        //获取数据
        int userId=Integer.parseInt(userIdStr);
        //处理数据
        BlogInfoDao blogInfoDao = new BlogInfoDaoImpl();
        List<Blog> blogList= blogInfoDao.getAllBlog(userId);
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        //返回结果
        return String.valueOf(JSONArray.fromObject(blogList,jsonConfig));
    }
}
