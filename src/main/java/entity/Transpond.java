package entity;

public class Transpond {
    private int tsId;
    private int blogId;
    private int userId;

    public Transpond(){}
    public Transpond(int blogId, int userId) {
        this.blogId = blogId;
        this.userId = userId;
    }

    public int getTsId() {
        return tsId;
    }

    public void setTsId(int tsId) {
        this.tsId = tsId;
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
}
