package dao;

import entity.Blog;

import java.util.List;

public interface BlogInfoDao {
    //查看所有微博
    List<Blog> getAllBlog();
    //根据主键删除微博
    int deleteBlog(int blogId);
    //获取用户所有微博
    List<Blog> getAllBlog(int userId);
    //发布新微博
    int insertBlog(Blog blog);
    //查询关注人的微博，根据时间排序，表连接
    List<Blog> getFollowBlogById(int userId);
    //模糊查询所有
    List<Blog> getBlogByKey(String key);
    //模糊查询自己的微博
    List<Blog> getBlogByKey(int UserId,String key);
    //查看转发数
    int getTransCount(int blogId);
}
