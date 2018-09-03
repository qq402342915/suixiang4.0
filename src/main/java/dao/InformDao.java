package dao;

import entity.Inform;

import java.util.List;

public interface InformDao {
    //增加通知
    int insertInform(Inform inform);
    //查看通知
    List<Inform> getInformById(int informId);
    //查看所有通知
    List<Inform> getAllInform();
    //分页查询所有通知
    List<Inform> getAllInform(int pageNo,int pageSize);
    //查看通知总数
    int countAllInform();
}
