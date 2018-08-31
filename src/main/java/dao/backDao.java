package dao;

import entity.Background;

import java.util.List;

public class backDao extends BaseDao<Background>{
    public List<Background> showBg(int bgId,String bgPath){
        return executeQuery("select bgId,bgPath from t_background");
    }
}