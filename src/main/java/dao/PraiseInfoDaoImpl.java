package dao;

import entity.Praise;

public class PraiseInfoDaoImpl extends BaseDao<Praise> implements PraiseInfoDao{
    @Override
    public int insertPraise(Praise praise) {
        return 0;
    }

    @Override
    public int deletePraise(int praId) {
        return 0;
    }

    @Override
    public Praise getPraiseById(int praId) {
        return null;
    }
    //查看点赞数
    @Override
    public int getPraiseCount(int blogId) {
        return getRecordCount("select count(*) from t_praise where blogId = ?",new Object[]{blogId});
    }
}
