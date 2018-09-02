package dao;

import entity.Praise;

import java.util.List;

public class PraiseInfoDaoImpl extends BaseDao<Praise> implements PraiseInfoDao{
    @Override
    public int insertPraise(Praise praise) {
        return executeUpdate("insert into t_praise(blogId,userId,praDate)values(?,?,?)",new Object[]{praise.getBlogId(),praise.getUserId(),praise.getPraDate()});
    }

    @Override
    public int deletePraise(int praId) {
        return executeUpdate("delete from t_praise where praId=?",new Object[]{praId});
    }

    @Override
    public List<Praise> getPraiseById(int blogId) {
        return executeQuery("select * from t_praise where blogId = ?",new Object[]{blogId});
    }
    //查看点赞数
    @Override
    public int getPraiseCount(int blogId) {
        return getRecordCount("select count(*) from t_praise where blogId = ?",new Object[]{blogId});
    }
}
