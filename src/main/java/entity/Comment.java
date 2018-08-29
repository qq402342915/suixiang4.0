package entity;

import java.util.Date;

public class Comment {
    private int commentId;
    private int blogId;
    private int userId;
    private Date comDate;
    private String comContent;
    private int num;

    public Comment() {
    }

    public Comment(int commentId, int blogId, int userId, Date comDate, String comContent, int num) {
        this.commentId = commentId;
        this.blogId = blogId;
        this.userId = userId;
        this.comDate = comDate;
        this.comContent = comContent;
        this.num = num;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getBlogId() {
        return blogId;
    }

    public void setBlogId(int blogId) {
        this.blogId = blogId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getComDate() {
        return comDate;
    }

    public void setComDate(Date comDate) {
        this.comDate = comDate;
    }

    public String getComContent() {
        return comContent;
    }

    public void setComContent(String comContent) {
        this.comContent = comContent;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
