package entity;

import java.util.Date;

public class SysInform {
    private  String userName;


    private  Date praDate;
    private  Date comDate;
    private  Date warnDate;
    private  String headP;

    public int getInformStatus() {
        return informStatus;
    }

    public void setInformStatus(int informStatus) {
        this.informStatus = informStatus;
    }

    private  int informStatus;

    public  SysInform(){
    }
    public SysInform(String userName,Date praDate,Date comDate,Date warnDate,String headP,int informStatus){
        this.userName=userName;
        this.praDate=praDate;
        this.comDate=comDate;
        this.warnDate=warnDate;
        this.headP=headP;
        this.informStatus=informStatus;
    }
    public String getHeadP() {
        return headP;
    }

    public void setHeadP(String headP) {
        this.headP = headP;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getPraDate() {
        return praDate;
    }

    public void setPraDate(Date praDate) {
        this.praDate = praDate;
    }

    public Date getComDate() {
        return comDate;
    }

    public void setComDate(Date comDate) {
        this.comDate = comDate;
    }

    public Date getWarnDate() {
        return warnDate;
    }

    public void setWarnDate(Date warnDate) {
        this.warnDate = warnDate;
    }
}

