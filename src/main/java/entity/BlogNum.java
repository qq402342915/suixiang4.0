package entity;

public class BlogNum {
    private int comNum;
    private int praNum;
    private int transNum;
    public BlogNum() {
    }

    public BlogNum(int comNum, int praNum, int transNum) {
        this.comNum = comNum;
        this.praNum = praNum;
        this.transNum = transNum;
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

    public int getTransNum() {
        return transNum;
    }

    public void setTransNum(int transNum) {
        this.transNum = transNum;
    }
}
