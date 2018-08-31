package dao;

import entity.User;

import java.util.List;

public interface UserInfoDao {
    //获取用户列表
    List<User> getAllUser();
    //根据主键查看用户信息
    List<User> getUser(int userId);
    //根据手机号和密码验证用户是否登录成功
    List<User> getUser(String telNum,String password);
    //添加用户信息
    int insertUser(User user);
    //更新用户信息
    int updateUser(User user);
    //查看用户名是否存在
    boolean getUserName(String username);
    //查看用户是否被锁定
    boolean getUserIsLock(String telNum);
}
