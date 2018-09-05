package dao;

import entity.Praise;

import java.util.List;

public class PraiseInfoDaoImpl extends BaseDao<Praise> implements PraiseInfoDao{
    @Override
    //点赞
    public int insertPraise(Praise praise) {
        return executeUpdate("insert into t_praise(blogId,userId,praDate)values(?,?,?)",new Object[]{praise.getBlogId(),praise.getUserId(),praise.getPraDate()});
    }
    public int insertPraise(int userId,int blogId) {
        return executeUpdate("insert into t_praise (blogId,userId) values (?,?)",new Object[]{blogId,userId});
    }
    @Override
    //取消赞
    public int deletePraise(int praId) {
        return executeUpdate("delete from t_praise where praId=?",new Object[]{praId});
    }

    public int deletetwoPraise(int userId,int blogId) {
        return executeUpdate("delete from t_praise where userId=? and  blogId=?  ",new Object[]{userId,blogId});
    }



    @Override
    //根据微博id查看点赞表信息
    public List<Praise> getPraiseById(int blogId) {
        return executeQuery("select * from t_praise where blogId = ?",new Object[]{blogId});
    }
    //查看点赞数
    @Override
    public int getPraiseCount(int blogId) {
        return getRecordCount("select count(*) from t_praise where blogId = ?",new Object[]{blogId});
    }

    //根据微博id和用户id查询是否存在点赞行为
    public List<Praise> getPraisetwoById(int blogId,int user_id) {
        return executeQuery("select * from t_praise where blogId = ? and userId = ?",new Object[]{blogId,user_id});
    }
}
