package service;

import dao.PraiseInfoDao;
import dao.PraiseInfoDaoImpl;
import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.Praise;
import entity.User;

import java.util.List;

public class PraiseServiceImpl {
    public  int addOrDeletePraise(int praId,int blogId,int UserId ) {
        UserInfoDao userInfo = new UserInfoDaoImpl();
        int isExit;
        List<User> list = userInfo.getUser(UserId);
        Praise praise = new Praise(praId, blogId, UserId);
        PraiseInfoDao praiseInfoDao = new PraiseInfoDaoImpl();
        //若根据用户id得到数据为空，
        // 则isExit为0，可以点赞
        int ret=-1;
        if (list == null) {
            isExit = 0;
        } else {
            isExit = 1;
        }
        if (isExit == 1) {
            ret=praiseInfoDao.insertPraise(praise);
        } else{
             ret =praiseInfoDao.deletePraise(praId);
        }
        return ret;
    }
}
