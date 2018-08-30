package dao;

import entity.Adminstrator;

public interface AdminInfoDao {
    //根据管理员名称查看信息
    Adminstrator getAdminByNamw(String amName);

}
