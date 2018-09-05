package entity;

import java.util.Date;

public class Praise {
    private int praId;
    private int blogId;
    private int userId;
    private Date praDate;

    public Praise(){}

    public Praise(int praId, int blogId, int userId, Date praDate) {
        this.praId = praId;
        this.blogId = blogId;
        this.userId = userId;
        this.praDate = praDate;
    }
    public Praise(int praId, int blogId, int userId) {
        this.praId = praId;
        this.blogId = blogId;
        this.userId = userId;
    }

    public int getPraId() {
        return praId;
    }

    public void setPraId(int praId) {
        this.praId = praId;
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

    public Date getPraDate() {
        return praDate;
    }

    public void setPraDate(Date praDate) {
        this.praDate = praDate;
    }
}
