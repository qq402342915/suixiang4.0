package dao;

import entity.User;

import java.util.List;

public class UserInfoDaoImpl extends BaseDao<User> implements UserInfoDao {
    @Override
    public List<User> getAllUser() {
        return executeQuery("select * from t_user");
    }

    @Override
    public User getUser(int userId) {
        return null;
    }

    @Override
    public boolean getUser(int telNum, String password) {
        return false;
    }

    @Override
    public int insertUser(User user) {
        return 0;
    }

    @Override
    public int updateUser(User user) {
        return 0;
    }

    @Override
    public int getUserName(String username) {
        return 0;
    }
}
