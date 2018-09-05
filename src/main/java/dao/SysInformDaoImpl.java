package dao;

import entity.SysInform;

import java.util.List;

public  class SysInformDaoImpl extends BaseDao<SysInform> implements SysInformInfoDao {


    @Override
    public List<SysInform> showPraBlog(int userid) {
        return executeQuery("select c.userName,c.headP,d.praDate from\n" +
                "(select userName,userId,headP from t_user) c,\n" +
                "(SELECT a.userId,a.praDate FROM\n" +
                "(select blogId,userId,praDate from t_praise) a,\n" +
                "(select blogId from t_blog WHERE userId =?) b\n" +
                "WHERE a.blogId=b.blogId) d\n" +
                "where c.userId=d.userId",new Object[]{userid});
    }

    @Override
    public List<SysInform> showComment(int userid) {
        return executeQuery("SELECT c.userName,c.headP,d.comDate from \n" +
                "(SELECT userName,userId,headP from t_user)c,\n" +
                "(SELECT a.userId,a.comDate from\n" +
                "(SELECT blogId,userId,comDate from t_comment) a,\n" +
                "(select blogId from t_blog WHERE userId = ?) b\n" +
                "where a.blogId=b.blogId)d\n" +
                "where c.userId=d.userId",new Object[]{userid});
    }

    @Override
    public List<SysInform> showTranspond(int userid) {
        return executeQuery("select d.userName,d.headP FROM\n" +
                "(select userId,userName,headP from t_user)d,\n" +
                "(select a.userId from\n" +
                "(SELECT blogId from t_blog where userId=?)b ,\n" +
                "(SELECT blogId,userId from t_transpond)a\n" +
                "where a.blogId=b.blogId)c\n" +
                "WHERE d.userId=c.userId",new Object[]{userid});
    }

    @Override
    public List<SysInform> showWarn(int userid) {
        return executeQuery("SELECT warnDate from t_inform where informStatus=0 and userId=?",new Object[]{userid});
    }

}
