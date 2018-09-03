package dao;

import entity.Comment;

import java.util.List;

public class CommentInfoDaoImpl extends BaseDao<Comment> implements CommentInfoDao {

    @Override
    public int insertComment(Comment comment) {

        return executeUpdate("insert into t_comment (blogId,userId,comDate,comContent,num) values(?,?,?,?,?)",new Object[]{comment.getBlogId(),comment.getUserId(),comment.getComDate(),comment.getComContent(),comment.getNum()});
    }

    @Override
    public int deleteComment(int commentId) {
        return executeUpdate("delete from t_comment where commentId=?",new Object[]{commentId});
    }

    @Override
    public List<Comment> getAllComment(int blogId) {
        return executeQuery("select * from t_comment where blogId=? order by comDate desc",new Object[]{blogId});
    }
}
