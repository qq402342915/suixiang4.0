package entity;

public class BlogNum {
    private Long comNum;
    private Long praNum;

    public BlogNum() {
    }

    public BlogNum(Long comNum, Long praNum) {
        this.comNum = comNum;
        this.praNum = praNum;
    }

    public Long getComNum() {
        return comNum;
    }

    public void setComNum(Long comNum) {
        this.comNum = comNum;
    }

    public Long getPraNum() {
        return praNum;
    }

    public void setPraNum(Long praNum) {
        this.praNum = praNum;
    }
}
