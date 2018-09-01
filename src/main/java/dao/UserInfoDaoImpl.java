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
        return executeQuery("select * from t_user where userId = ?", new Object[]{userId});
    }

    @Override
    public List<User> getUser(String telNum, String password) {
        return executeQuery("select * from t_user where telNum = ? and password = ?", new Object[]{telNum, password});
    }

    @Override
    public int insertUser(User user) {
        return executeUpdate("insert into t_user(userName,telNum,password) values(?,?,?)", new Object[]{user.getUserName(), user.getTelNum(), user.getPassword()});
    }

    @Override
    public int updateUser(User user) {
        return executeUpdate("UPDATE t_user set userName = ? ,telNum=? ,password=?,email=?,sex=?,school=?,sign=?,birthday=?,address=?,headP=?,bgId=?,lockDate=?", new Object[]{user.getUserName(), user.getTelNum(), user.getPassword(),user.getEmail(),user.getSex(),user.getSchool(),user .getSign(),user.getBirthday(),user.getAddress(),user.getHeadP(),user.getBgId(),user.getLockDate()});
    }

    @Override
    public boolean getUserName(String username) {
        if (executeQuery("select * from t_user where username = ?", new Object[]{username}) != null)
            return true;
        else
            return false;
    }

    @Override
    public boolean getUserIsLock(String telNum) {
        List<User> userList = executeQuery("select lockDate from t_user where telNum = ?", new Object[]{telNum});
        if (userList.get(0).getLockDate()!=null)
            //锁定
            return true;
        else
            return false;
    }

}
