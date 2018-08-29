package entity;

public class Transpord {
    private int tsId;
    private int blogId;
    private int userId;

    public Transpord(){}
    public Transpord(int tsId, int blogId, int userId) {
        this.tsId = tsId;
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
