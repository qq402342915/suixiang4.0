package entity;

public class BlogNum {
    private int comNum;
    private int praNum;

    public BlogNum() {
    }

    public BlogNum(int comNum, int praNum) {
        this.comNum = comNum;
        this.praNum = praNum;
    }

    public int getComNum() {
        return comNum;
    }

    public void setComNum(int comNum) {
        this.comNum = comNum;
    }

    public int getPraNum() {
        return praNum;
    }

    public void setPraNum(int praNum) {
        this.praNum = praNum;
    }
}
