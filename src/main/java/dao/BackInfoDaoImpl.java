package dao;

import entity.Background;

import java.util.List;

public class BackInfoDaoImpl extends BaseDao<Background> implements BackInfoDao{
    @Override
    public List<Background> getBackById(int id) {
        return executeQuery("select * from t_background where bgId = ?",new Object[]{id});
    }
    public List<Background> getBackByPath(String bgPath){
        return executeQuery("select *from t_background where bgPath=?",new Object[]{bgPath});
    }
}
