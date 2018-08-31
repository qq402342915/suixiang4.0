package dao;

import entity.User;

import java.util.List;

public class UserInfoDaoImpl extends BaseDao<User> implements UserInfoDao {
    @Override
    public List<User> getAllUser() {
        return executeQuery("select * from t_user");
    }

    @Override
    public List<User> getUser(int userId) {
        return executeQuery("select * form t_user where userId = ?",new Object[]{userId});
    }

    @Override
    public List<User> getUser(int telNum, String password) {
        return executeQuery("select * form t_user where telNum = ? and password = ?",new Object[]{telNum,password});
    }

    @Override
    public int insertUser(User user) {
        return executeUpdate("insert into t_user(userName,telNum,password) values(?,?,?)",new Object[]{user.getUserName(),user.getTelNum(),user.getPassword()});
    }

    @Override
    public int updateUser(User user) {
        return executeUpdate("UPDATE t_user set userName = ? ,telNum=? ,password=?,emai=?,sex?,school=?",new Object[]{user.getUserName(),user.getTelNum(),user.getPassword()});
    }

    @Override
    public boolean getUserName(String username) {
        if (executeQuery("select * form t_user where username = ?", new Object[]{username}) != null)
            return true;
        else
            return false;
    }

}
