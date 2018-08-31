package entity;

import java.util.Date;

public class Blog {
    private int blogId;
    private String context;
    private Date sendDate;
    private String sendAddr;
    private int userId;
    private String ip;
    private int tsNum;
    private String blogPic;
    private String blogVideo;

    public Blog() {
    }

    public Blog(int blogId, String context, Date sendDate, String sendAddr, int userId,  String ip, int tsNum,String blogPic,String blogVideo) {
        this.blogId = blogId;
        this.context = context;
        this.sendDate = sendDate;
        this.sendAddr = sendAddr;
        this.userId = userId;

        this.ip = ip;
        this.tsNum = tsNum;
        this.blogPic=blogPic;
        this.blogVideo=blogVideo;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        ip = ip;
    }

    public int getTsNum() {
        return tsNum;
    }

    public void setTsNum(int tsNum) {
        this.tsNum = tsNum;
    }

    public String getBlogVideo() {
        return blogVideo;
    }

    public void setBlogVideo(String blogVideo) {
        this.blogVideo = blogVideo;
    }

    public String getBlogPic() {

        return blogPic;
    }

    public void setBlogPic(String blogPic) {
        this.blogPic = blogPic;
    }
}
