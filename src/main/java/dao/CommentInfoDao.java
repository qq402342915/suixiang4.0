package dao;

import entity.Comment;

import java.util.List;

public interface CommentInfoDao {
    //发布评论
    int insertComment(Comment comment);
    //删除评论
    int deleteComment(int commentId);
    //查看该微博的所有评论
    List<Comment> getAllComment(int blogId);
    //查看评论数
    int getOneBlogCommentNum(int blogId);

}
