package dao;

import entity.Fansuser;
import entity.User;

import java.util.List;

public class FansInfoDaoImpl extends BaseDao<Fansuser> implements FansInfoDao{
    @Override
    public int getFansCount(int userId) {
        return getRecordCount("select count(fansId) from t_fansuser where userId=?",new Object[]{userId});
    }

    @Override
    public List<Fansuser> getAllFansId(int userId) {
        return executeQuery("select * from t_fansuser where userId=?",new Object[]{userId});
    }
    public List<Fansuser> getAllFansId(int userId,int pageNUm,int pageSize) {
        return executeQuery("select * from t_fansuser where userId=? order by userId asc limit ?,?",new Object[]{userId,(pageNUm-1)*pageSize,pageSize});
    }

    @Override
    public int getFollowCount(int userId) {
        return getRecordCount("select count(userId) from t_fansuser where fansId=?",new Object[]{userId});
    }

    @Override
    public List<Fansuser> getAllFollowId(int userId) {
        return executeQuery("select * from t_fansuser where fansId=?",new Object[]{userId});
    }

    @Override
    public List<Fansuser> getAllFollowId(int userId, int pageNUm, int pageSize) {
        return executeQuery("select * from t_fansuser where fansId=? order by userId asc limit ?,?",new Object[]{userId,(pageNUm-1)*pageSize,pageSize});
    }

    @Override
    public boolean getIfFollow(int userId, int fansId) {
        if (executeQuery("select * from t_fansuser where fansId = ? and userId = ?", new Object[]{userId,fansId}).isEmpty())
            return false;
        else
            return true;
    }

    @Override
    public int addFollow(Fansuser fansuser) {
        return executeUpdate("insert into t_fansuser(userId,fansId,followDate) values(?,?,?)",new Object[]{fansuser.getFansId(),fansuser.getUserId(),fansuser.getFollowDate()});
    }

    @Override
    public int cancelFollow(int userId, int fansId) {
        return executeUpdate("delete from t_fansuser where fansId=? and UserId=?",new Object[]{userId,fansId});
    }
}
