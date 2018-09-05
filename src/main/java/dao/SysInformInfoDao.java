package dao;

import entity.SysInform;

import java.util.List;

public interface SysInformInfoDao {
    //显示用户微博的点赞信息
    public List<SysInform> showPraBlog(int userid);
    //显示用户微博的评论信息
    public List<SysInform> showComment(int userid);
    //显示用户微博的转发信息
    public  List<SysInform> showTranspond(int userid);
    //显示用户被举报信息
    public List<SysInform> showWarn(int userid);
}
