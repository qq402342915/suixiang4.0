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
    public List<Fansuser> getAllFans(int userId) {
        return executeQuery("select fansId from t_fansuser where userId=?",new Object[]{userId});
    }

    @Override
    public int addFollow(Fansuser fansuser) {
        return executeUpdate("insert into t_fansuser(userId,fansId,followDate) values(?,?,?)",new Object[]{fansuser.getUserId(),fansuser.getFansId(),fansuser.getFollowDate()});
    }

    @Override
    public int cancelFollow(int userId, int fansId) {
        return executeUpdate("delete from t_fansuser where userId=? and fansId=?",new Object[]{userId,fansId});
    }
}
