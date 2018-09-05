package dao;

import entity.Comment;
import entity.Transpond;

import java.util.List;

public class TranspondInfoDaoImpl extends BaseDao<Transpond> implements TranspondInfoDao{
    @Override
    public int insertTranspond(Transpond transpond) {
        return executeUpdate("insert into t_transpond(blogId,userId) VALUES(?,?)",new Object[]{transpond.getBlogId(),transpond.getUserId()});
    }

    @Override
    public int deleteTranspond(int tsId) {

        return executeUpdate("delete from t_transpond where tsId=?",new Object[]{tsId});
    }
    public List<Transpond> getAllTranpond(int blogId) {
        return executeQuery("select * from t_transpond where blogId=?",new Object[]{blogId});
    }

    @Override
    public int searchTransNum(int blogId) {
        return getRecordCount("select count(userId) from t_transpond where blogId = ?",new Object[]{blogId});
    }
}
