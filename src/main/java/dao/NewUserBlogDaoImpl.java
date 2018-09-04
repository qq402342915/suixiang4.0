package dao;

import entity.UserBlog;

import java.util.List;

public class NewUserBlogDaoImpl extends BaseDao<UserBlog> implements NewUserBlogDao{
    @Override
    public List<UserBlog> searchDayBlog() {
        return executeQuery("  select b.blogId,b.context,b.sendDate,b.sendAddr,b.tsNum,b.blogPic,b.blogVideo,u.userId,u.userName,u.headP\n" +
                "                               from t_blog b left join t_user u on b.userId=u.userId \n" +
                "                           where b.sendDate >= DATE(now()) GROUP BY b.blogId ORDER BY b.sendDate desc");
    }

    @Override
    public List<UserBlog> searchLikeDayBlog(int myId) {
        return executeQuery("  select b.blogId,b.context,b.sendDate,b.sendAddr,b.tsNum,b.blogPic,b.blogVideo,u.userId,u.userName,u.headP\n" +
                "                               from t_blog b left join t_user u on b.userId=u.userId \n" +
                "                           where b.sendDate >= DATE(now()) and b.userId in (select f.userId from t_fansuser f where f.fansId = ?) GROUP BY b.blogId ORDER BY b.sendDate desc",new Object[]{myId});
    }
}
