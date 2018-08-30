package dao;


import entity.Fansuser;
import entity.User;

import java.util.List;

public interface FansInfoDao {
    //根据用户主键查询粉丝数量
    int getFansCount(int userId);
    //根据用户主键查询粉丝列表
    List<User> getAllFans(int userId);
    //添加关注
    int addFollow(Fansuser fansuser);
    //取消关注
    int cancelFollow(int userId,int fansId);

}
