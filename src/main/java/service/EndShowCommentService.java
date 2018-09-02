package service;

import dao.CommentInfoDao;
import dao.CommentInfoDaoImpl;
import entity.Comment;
import net.sf.json.JSONArray;
import java.util.List;

public class EndShowCommentService {
    public String showComment(String blogIdStr){
        //转化成int
        int blogId=Integer.parseInt(blogIdStr);
        //实例化
        CommentInfoDao commentInfoDao = new CommentInfoDaoImpl();
        List<Comment> commentList= commentInfoDao.getAllComment(blogId);

        //返回结果
        return String.valueOf(JSONArray.fromObject(commentList));
    }
}
