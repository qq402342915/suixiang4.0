package dao;

import entity.User;

import java.util.List;

public class UserInfoDaoImpl extends BaseDao<User> implements UserInfoDao {
    @Override
    public List<User> getAllUser() {
        return executeQuery("select * from t_user");
    }

    @Override
    public List<User> getUser(String telNum) {
        return executeQuery("select * form t_user where telNum = ?",new Object[]{telNum});
    }

    @Override
    public List<User> getUser(String telNum, String password) {
        return executeQuery("select * form t_user where telNum = ? and password = ?",new Object[]{telNum,password});
    }

    @Override
    public int insertUser(User user) {
        return executeUpdate("insert into t_user(userName,telNum,password) values(?,?,?)",new Object[]{user.getUserName(),user.getTelNum(),user.getPassword()});
    }

    @Override
    public int updateUser(User user) {
        return executeUpdate("UPDATE t_user set userName = ? ,telNum=?,emai=?,sex=?,school=?,sign=?,birthday=?,address=?",new Object[]{user.getUserName(),user.getTelNum(),user.getEmail(),user.getSex(),user.getSchool(),user.getSign(),user.getBirthday(), user.getAddress()});
    }

    @Override
    public int getUserName(String username) {
        return 0;
    }
}
