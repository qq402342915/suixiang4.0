package dao;

import entity.Inform;

import java.util.List;

public interface InformDao {
    //增加通知
    int insertInform(Inform inform);
    //查看通知
    List<Inform> getInformById(int userId);
    //查看所有通知
    List<Inform> getAllInform();
}
