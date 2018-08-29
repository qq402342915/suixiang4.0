package entity;

public class Adminster {
    private int amId;
    private String amName;
    private String amPass;

    public Adminster() {
    }

    public Adminster(int amId, String amName, String amPass) {
        this.amId = amId;
        this.amName = amName;
        this.amPass = amPass;
    }

    public int getAmId() {
        return amId;
    }

    public void setAmId(int amId) {
        this.amId = amId;
    }

    public String getAmName() {
        return amName;
    }

    public void setAmName(String amName) {
        this.amName = amName;
    }

    public String getAmPass() {
        return amPass;
    }

    public void setAmPass(String amPass) {
        this.amPass = amPass;
    }
}
