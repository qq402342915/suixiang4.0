package entity;

import java.util.Date;

public class Inform {
    private int informId;
    private int userId;
    private String informContent;
    private Date warnDate;
    private int informStatus;
    private int  reporterId;

    public Inform(){}
    public Inform(int informId, int userId, String informContent, Date warnDate, int informStatus, int reporterId) {
        this.informId = informId;
        this.userId = userId;
        this.informContent = informContent;
        this.warnDate = warnDate;
        this.informStatus = informStatus;
        this.reporterId = reporterId;
    }
    public Inform(int userId,int reporterId,String informContent){
        this.userId = userId;
        this.reporterId = reporterId;
        this.informContent = informContent;
    }

    public int getInformId() {
        return informId;
    }

    public void setInformId(int informId) {
        this.informId = informId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getInformContent() {
        return informContent;
    }

    public void setInformContent(String informContent) {
        this.informContent = informContent;
    }

    public Date getWarnDate() {
        return warnDate;
    }

    public void setWarnDate(Date warnDate) {
        this.warnDate = warnDate;
    }

    public int getInformStatus() {
        return informStatus;
    }

    public void setInformStatus(int informStatus) {
        this.informStatus = informStatus;
    }

    public int getReporterId() {
        return reporterId;
    }

    public void setReporterId(int reporterId) {
        this.reporterId = reporterId;
    }
}
