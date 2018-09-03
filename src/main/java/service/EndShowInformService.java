package service;


import dao.InformDao;
import dao.InformDaoImpl;
import entity.Inform;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import util.JsonDate;

import java.util.Date;
import java.util.List;

public class EndShowInformService {
    public String showInformLimit(String pageNoStr, String pageSizeStr){
        //获取分页
        int pageNo=Integer.parseInt(pageNoStr);
        int pageSize=Integer.parseInt(pageSizeStr);
        //处理数据
        InformDao informDao = new InformDaoImpl();
        List<Inform> informDaoList= informDao.getAllInform(pageNo,pageSize);
        JsonConfig jsonConfig =new JsonConfig();
        JsonDate jd=new JsonDate();
        jsonConfig.registerJsonValueProcessor(Date.class,jd);
        //返回结果
        return String.valueOf(JSONArray.fromObject(informDaoList,jsonConfig));
    }
}
