package dao;

import entity.Blog;

import java.util.List;

public class BlogInfoDaoImpl extends BaseDao<Blog> implements BlogInfoDao{
    @Override
    public List<Blog> getAllBlog() {
        return executeQuery("select * from t_blog");
    }

    @Override
    public int deleteBlog(int blogId) {
        return 0;
    }

    @Override
    public List<Blog> getAllBlog(int userId) {
        return null;
    }

    @Override
    public int insertBlog(Blog blog) {
        return 0;
    }

    @Override
    public List<Blog> getFollowBlogById(int userId) {
        return null;
    }

    @Override
    public List<Blog> getBlogByKey(String key) {
        return null;
    }

    @Override
    public List<Blog> getBlogByKey(int UserId, String key) {
        return null;
    }

    @Override
    public int getTransCount(int blogId) {
        return 0;
    }
}
