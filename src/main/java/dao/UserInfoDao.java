package dao;

import entity.Blog;
import entity.BlogContext;
import entity.User;

import java.sql.Date;
import java.util.List;

public interface UserInfoDao {
    //获取用户列表
    List<User> getAllUser();
    /*//获取用户粉丝列表
    List<User> getAllFans(int userId);*/
    //根据主键查看用户信息
    List<User> getUser(int userId);
    //根据手机查看用户信息
    List<User> getUser(String telNum);
    //根据手机号和密码验证用户是否登录成功
    List<User> getUser(String telNum,String password);
    //添加用户信息
    int insertUser(User user);
    //更新用户信息
    int updateUser(User user ,int userId);
    //查看用户名是否存在
    boolean getUserName(String username);
    //查看用户是否被锁定
    boolean getUserIsLock(String telNum);
//    //获取string类型时间
//    String getStringReg(Date regDate);
//    String getStringBir(Date birthday);
    //分页查询所有用户
    List<User> getAllUser(int pageNo,int pageSize);
    //查询用户总记录数
    int getCountUser();
    //根据用户id删除单个用户
    int delOneUser(int userId);
    //更新头像
    int UpdateHeadP(String headp,String telNum);
    //更新背景
    int UpdateBg(int bgId,String telNum);
    List<User> getNotFansId(int userId );
    //查询未关注的人
    List<User> getNotFansId(int userId,int num,int size);
    //根据用户名查找
    List<User> getUserId(String username);
    //查询今天的用户注册量
    int countToday();
    //查询之前某天的用户注册量
    int countPreDay(int day);
    //给用户加锁
    int updateLockDate(int userId);
    //给用户解锁
    int unLockDate(String telNum);

}
