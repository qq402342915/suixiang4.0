package entity;

import java.util.Date;

public class Blog {
    private int blodId;
    private String context;
    private Date sendDate;
    private String sendAddr;
    private int userId;
    private String trId;
    private String Ip;
    private int tsNum;

    public Blog() {
    }

    public Blog(int blodId, String context, Date sendDate, String sendAddr, int userId, String trId, String ip, int tsNum) {
        this.blodId = blodId;
        this.context = context;
        this.sendDate = sendDate;
        this.sendAddr = sendAddr;
        this.userId = userId;
        this.trId = trId;
        Ip = ip;
        this.tsNum = tsNum;
    }

    public int getBlodId() {
        return blodId;
    }

    public void setBlodId(int blodId) {
        this.blodId = blodId;
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

    public String getTrId() {
        return trId;
    }

    public void setTrId(String trId) {
        this.trId = trId;
    }

    public String getIp() {
        return Ip;
    }

    public void setIp(String ip) {
        Ip = ip;
    }

    public int getTsNum() {
        return tsNum;
    }

    public void setTsNum(int tsNum) {
        this.tsNum = tsNum;
    }
}
