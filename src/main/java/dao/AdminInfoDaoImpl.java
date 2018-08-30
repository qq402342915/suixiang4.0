package dao;

import entity.Adminstrator;

import java.util.List;

public class AdminInfoDaoImpl extends BaseDao<Adminstrator> implements AdminInfoDao {
    @Override
    public List<Adminstrator> getAdminByName(String amName) {
        return executeQuery("select * from t_adminstrator where amName = ?",new Object[]{amName});
    }
}
