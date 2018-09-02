package service;


import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import java.util.Date;
import java.util.List;

public class EndShowAllUserService {
    public String showAllUser(String pageNoStr, String pageSizeStr){

        //获取分页
        int pageNo=Integer.parseInt(pageNoStr);
        int pageSize=Integer.parseInt(pageSizeStr);

        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> userList = userInfoDao.getAllUser(pageNo,pageSize);
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);

        return String.valueOf(JSONArray.fromObject(userList,jsonConfig));
    }

    public String detailsUser(String userIdStr){
        int userId=Integer.parseInt(userIdStr);
        UserInfoDao userInfoDao = new UserInfoDaoImpl();
        List<User> userList = userInfoDao.getUser(userId);

        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date .class,jd);

        return String.valueOf(JSONArray.fromObject(userList,jsonConfig));

    }
}
