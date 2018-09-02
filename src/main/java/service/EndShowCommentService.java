package service;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import entity.Comment;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import java.util.Date;
import java.util.List;

public class EndShowCommentService {
    public String showComment(String blogIdStr){
        //转化成int
        int blogId=Integer.parseInt(blogIdStr);
        //实例化
        CommentInfoDao commentInfoDao = new CommentInfoDaoImpl();
        List<Comment> commentList= commentInfoDao.getAllComment(blogId);

        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        //返回结果
        return String.valueOf(JSONArray.fromObject(commentList,jsonConfig));
    }
}
