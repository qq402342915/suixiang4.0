package entity;

public class Background {
    private int bgId;
    private String bgType;
    private String bgPath;

    public Background() {
    }

    public Background(int bgId, String bgType, String bgPath) {
        this.bgId = bgId;
        this.bgType = bgType;
        this.bgPath = bgPath;
    }
    public int getBgId() {
        return bgId;
    }

    public void setBgId(int bgId) {
        this.bgId = bgId;
    }

    public String getBgType() {
        return bgType;
    }

    public void setBgType(String bgType) {
        this.bgType = bgType;
    }

    public String getBgPath() {
        return bgPath;
    }

    public void setBgPath(String bgPath) {
        this.bgPath = bgPath;
    }
}
