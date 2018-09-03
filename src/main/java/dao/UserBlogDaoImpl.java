package dao;



import entity.BlogContext;

import java.util.List;

public class UserBlogDaoImpl extends BaseDao<BlogContext> implements UserBlogDao{
    @Override
    public List<BlogContext> searchDayBlog() {
        return executeQuery("select b.blogId,b.context,b.sendDate,b.sendAddr,b.tsNum,b.blogPic,b.blogVideo,u.userId,u.userName,u.headP,count(c.blogId) as comNum,count(p.blogId) as praNum\n" +
                "                from t_blog b join t_user u on b.userId=u.userId LEFT JOIN t_comment c on c.blogId = b.blogId LEFT JOIN t_praise p on p.blogId = b.blogId\n" +
                "                where b.sendDate >= DATE(now()) GROUP BY b.blogId ORDER BY b.sendDate desc\n");
    }

    @Override
    public List<BlogContext> searchLikeDayBlog(int myId) {
        return executeQuery("select b.blogId,b.context,b.sendDate,b.sendAddr,b.tsNum,b.blogPic,b.blogVideo,u.userId,u.userName,u.headP,count(c.blogId) as comNum,count(p.blogId) as praNum\n" +
                "                from t_blog b join t_user u on b.userId=u.userId LEFT JOIN t_comment c on c.blogId = b.blogId LEFT JOIN t_praise p on p.blogId = b.blogId\n" +
                "                where b.sendDate >= DATE(now()) and b.userId in (select f.userId from t_fansuser f where f.fansId = ?) GROUP BY b.blogId ORDER BY b.sendDate desc\n",new Object[]{myId});
    }
}
