package dao;

import entity.Adminstrator;

import java.util.List;

public interface AdminInfoDao {
    //根据管理员名称查看信息
    List<Adminstrator> getAdminByName(String amName);
    //检查管理员能否登录
    List<Adminstrator> getAdminByName(String amName,String amPass);

}
