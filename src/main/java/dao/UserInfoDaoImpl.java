package dao;

import entity.User;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public class UserInfoDaoImpl extends BaseDao<User> implements UserInfoDao {
    @Override
    public List<User> getAllUser() {
        return executeQuery("select * from t_user");
    }
    @Override
    public List<User> getUser(int userId) {
        return executeQuery("select * from t_user where userId = ?",new Object[]{userId});
    }
    @Override
    public List<User> getUser(String telNum) {
        return executeQuery("select * from t_user where telNum = ?",new Object[]{telNum});
    }

    @Override
    public List<User> getUser(String telNum, String password) {
        return executeQuery("select * from t_user where telNum = ? and password = ?",new Object[]{telNum,password});
    }

    @Override
    public int insertUser(User user) {
        return executeUpdate("insert into t_user(userName,telNum,password) values(?,?,?)",new Object[]{user.getUserName(),user.getTelNum(),user.getPassword()});
    }

    @Override
    public int updateUser(User user, int userId) {
        return executeUpdate("UPDATE t_user set userName = ? ,telNum=?,email=?,sex=?,school=?,sign=?,birthday=?,address=? where userId=?",new Object[]{user.getUserName(),user.getTelNum(),user.getEmail(),user.getSex(),user.getSchool(),user.getSign(),new Timestamp(user.getBirthday().getTime()), user.getAddress(),userId});
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
        List<User> userList = executeQuery("select userId from t_inform where userId=(SELECT userId from t_user where telNum=?) and informStatus = 0", new Object[]{telNum});
        if (!userList.isEmpty())
            //锁定
            return true;
        else
            return false;
    }
    @Override
    public List<User> getAllUser(int pageNo,int pageSize){
        return executeQuery("select * from t_user limit ?,?",new Object[]{(pageNo-1)*pageSize,pageSize});
    }
    public int getCountUser(){
        return getRecordCount("select count(*) from t_user");
    }
    @Override
    public int delOneUser(int userId){
        return executeUpdate("delete from t_user where userId = ?",new Object[]{userId});
    }

    @Override
    public int UpdateHeadP(String headp,String telNum) {
        return executeUpdate("update t_user set headP=? where telNum = ?",new Object[]{headp,telNum});
    }
    @Override
    public int countToday(){
        return getRecordCount("SELECT count(*) FROM t_user WHERE TO_DAYS(regDate) = TO_DAYS(NOW())");
    }
    @Override
    public int countPreDay(int day){//1为昨天，2为前天
        return getRecordCount("SELECT count(*) FROM t_user WHERE TO_DAYS(now()) - TO_DAYS(regDate) <= ?",new Object[]{day});
    }

    @Override
    public int UpdateBg(int bgId,String telNum){
        return executeUpdate("update t_user set bgId=? where telNum = ?",new Object[]{bgId,telNum});
    }
    @Override
    public int updateLockDate(int userId){
        return executeUpdate("update t_user set lockDate = CURRENT_TIMESTAMP where userId= ?",new Object[]{userId});
    }
    @Override
    public int unLockDate(String telNum){
        return executeUpdate("update t_user set lockDate = null where telNum = ?",new Object[]{telNum});
    }

    @Override
    public List<User> getNotFansId(int userId ) {
        return executeQuery("select * From t_user WHERE userId not in (select userId FROM t_fansuser where fansId=?)",new Object[]{userId});
    }
    @Override
    public List<User> getNotFansId(int userId,int num,int size ) {
        return executeQuery("select * from (select * From t_user WHERE userId not in (select userId FROM t_fansuser where fansId=?))as n limit ?,?",new Object[]{userId,(num-1)*size,size});
    }

    @Override
    public List<User> getUserId(String username) {
        return executeQuery("select * from t_user where userName=?",new Object[]{username});
    }
}
