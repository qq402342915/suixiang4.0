package dao;

import entity.BlogContext;

import java.util.List;

public interface UserBlogDao {
    //显示热门微博，查看当天的微博，并以发表时间顺序排序
    public List<BlogContext> searchDayBlog();
    //显示用户关注的人的当天微博
    public List<BlogContext> searchLikeDayBlog(int myId);
}
