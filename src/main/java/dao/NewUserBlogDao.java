package dao;

import entity.UserBlog;

import java.util.List;

public interface NewUserBlogDao{
    //显示热门微博，查看当天的微博，并以发表时间顺序排序
    public List<UserBlog> searchDayBlog(int page);
    //显示用户关注的人的当天微博
    public List<UserBlog> searchLikeDayBlog(int myId,int page);
}
