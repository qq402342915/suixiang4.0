package dao;


import entity.Fansuser;
import entity.User;

import java.util.List;

public interface FansInfoDao {
    //根据用户主键查询粉丝数量
    int getFansCount(int userId);
    //根据用户主键查询粉丝列表Id
    List<Fansuser> getAllFansId(int userId);
    //查关注数量
    int getFollowCount(int userId);
    //查关注列表Id
    List<Fansuser> getAllFollowId(int userId);
    //判断是否关注
    boolean getIfFollow(int userId,int fansId);
    //添加关注
    int addFollow(Fansuser fansuser);
    //取消关注
    int cancelFollow(int userId,int fansId);

}
