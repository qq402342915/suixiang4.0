package entity;

import java.util.Date;

public class User {
    private int userId;
    private String userName;
    private int telNum;
    private String password;
    private String email;
    private String sex;
    private String school;
    private Data regDate;
    private String sign;
    private Data birthday;
    private String address;
    private String headP;
    private String picPath;
    private Data lockDate;
    public User(){}
    public User(int userId, String userName, int telNum, String password, String email, String sex, String school, Data regDate, String sign, Data birthday, String address, String headP, String picPath, Data lockDate) {
        this.userId = userId;
        this.userName = userName;
        this.telNum = telNum;
        this.password = password;
        this.email = email;
        this.sex = sex;
        this.school = school;
        this.regDate = regDate;
        this.sign = sign;
        this.birthday = birthday;
        this.address = address;
        this.headP = headP;
        this.picPath = picPath;
        this.lockDate = lockDate;
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

    public int getTelNum() {
        return telNum;
    }

    public void setTelNum(int telNum) {
        this.telNum = telNum;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public Data getRegDate() {
        return regDate;
    }

    public void setRegDate(Data regDate) {
        this.regDate = regDate;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public Data getBirthday() {
        return birthday;
    }

    public void setBirthday(Data birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHeadP() {
        return headP;
    }

    public void setHeadP(String headP) {
        this.headP = headP;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public Data getLockDate() {
        return lockDate;
    }

    public void setLockDate(Data lockDate) {
        this.lockDate = lockDate;
    }
}
