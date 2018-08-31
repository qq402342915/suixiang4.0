package dao;

import entity.Transpond;

public class TranspondInfoDaoImpl extends BaseDao<Transpond> implements TranspondInfoDao{
    @Override
    public int insertTranspond(Transpond transpond) {
        return executeUpdate("insert into t_transpond(blogId,userId) VALUES(?,?)",new Object[]{transpond.getBlogId(),transpond.getUserId()});
    }

    @Override
    public int deleteTranspond(int tsId) {

        return executeUpdate("delete from t_transpond where tsId=?",new Object[]{tsId});
    }
}
