package entity;

import java.util.Date;

public class Fansuser {
    private int userId;
    private int fansId;
    private Date followDate;

    public Fansuser() {
    }

    public Fansuser(int userId, int fansId) {
        this.userId = userId;
        this.fansId = fansId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFansId() {
        return fansId;
    }

    public void setFansId(int fansId) {
        this.fansId = fansId;
    }

    public Date getFollowDate() {
        return followDate;
    }

    public void setFollowDate(Date followDate) {
        this.followDate = followDate;
    }
}
