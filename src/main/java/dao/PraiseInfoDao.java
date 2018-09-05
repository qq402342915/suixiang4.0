package dao;

import entity.Praise;

import java.util.List;

public interface PraiseInfoDao {
    //点赞
    int insertPraise(Praise praise);
    //取消点赞
    int deletePraise(int praId);
    //查看点赞信息
    List<Praise> getPraiseById(int blogId);
    //查看点赞数
    int getPraiseCount(int blogId);
    public List<Praise> getPraisetwoById(int blogId,int user_id);
    public int deletetwoPraise(int userId,int blogId);
    public int insertPraise(int userId,int blogId);
}
