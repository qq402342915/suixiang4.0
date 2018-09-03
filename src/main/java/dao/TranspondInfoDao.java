package dao;

import entity.Comment;
import entity.Transpond;

import java.util.List;

public interface TranspondInfoDao {
    //增加转发记录
    int insertTranspond(Transpond transpond);
    //删除转发微博
    int deleteTranspond(int tsId);
    //查看该微博的转发记录
    List<Transpond> getAllTranpond(int blogId);
}
