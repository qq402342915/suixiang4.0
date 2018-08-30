package dao;

import entity.Transpond;

public interface TranspondInfoDao {
    //增加转发记录
    int insertTranspond(Transpond transpond);
    //删除转发微博
    int deleteTranspond(int tsId);
}
