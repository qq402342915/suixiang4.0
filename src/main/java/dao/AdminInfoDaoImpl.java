package dao;

import entity.Adminstrator;

import java.util.List;

public class AdminInfoDaoImpl extends BaseDao<Adminstrator> implements AdminInfoDao {
    @Override
    public List<Adminstrator> getAdminByName(String amName) {
        return executeQuery("select * from t_admin where amName = ?",new Object[]{amName});
    }
    @Override
    public List<Adminstrator> getAdminByName(String amName,String amPass){
        return executeQuery("select * from t_admin where amName = ? and amPass = ?",new Object[]{amName,amPass});
    }
}
