package entity;

import java.util.Date;

public class UserBlog {
    private int blogId;
    private String context;
    private Date sendDate;
    private String sendAddr;
    private int tsNum;
    private String blogPic;
    private String blogVideo;
    private int userId;
    private String userName;
    private String headP;

    public UserBlog() {
    }

    public UserBlog(int blogId, String context, Date sendDate, String sendAddr, int tsNum, String blogPic, String blogVideo, int userId, String userName, String headP) {
        this.blogId = blogId;
        this.context = context;
        this.sendDate = sendDate;
        this.sendAddr = sendAddr;
        this.tsNum = tsNum;
        this.blogPic = blogPic;
        this.blogVideo = blogVideo;
        this.userId = userId;
        this.userName = userName;
        this.headP = headP;
    }

    public int getBlogId() {
        return blogId;
    }

    public void setBlogId(int blogId) {
        this.blogId = blogId;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Date getSendDate() {
        return sendDate;
    }

    public void setSendDate(Date sendDate) {
        this.sendDate = sendDate;
    }

    public String getSendAddr() {
        return sendAddr;
    }

    public void setSendAddr(String sendAddr) {
        this.sendAddr = sendAddr;
    }

    public int getTsNum() {
        return tsNum;
    }

    public void setTsNum(int tsNum) {
        this.tsNum = tsNum;
    }

    public String getBlogPic() {
        return blogPic;
    }

    public void setBlogPic(String blogPic) {
        this.blogPic = blogPic;
    }

    public String getBlogVideo() {
        return blogVideo;
    }

    public void setBlogVideo(String blogVideo) {
        this.blogVideo = blogVideo;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getHeadP() {
        return headP;
    }

    public void setHeadP(String headP) {
        this.headP = headP;
    }
}
