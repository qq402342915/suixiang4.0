package dao;

import entity.Praise;

public interface PraiseInfoDao {
    //点赞
    int insertPraise(Praise praise);
    //取消点赞
    int deletePraise(int praId);
    //查看点赞信息
    Praise getPraiseById(int praId);
    //查看点赞数
    int getPraiseCount(int blogId);
}
