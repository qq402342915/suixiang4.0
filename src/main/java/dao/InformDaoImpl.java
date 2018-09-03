package dao;

import entity.Inform;

import java.util.List;

public class InformDaoImpl extends BaseDao<Inform> implements InformDao {
    @Override
    public int insertInform(Inform inform) {
        return executeUpdate("insert into t_inform(userId, informContent, warnDate, informStatus,reporterId)values(?,?,?,?,?)",new Object[]{inform.getUserId(),inform.getInformContent(),inform.getWarnDate(),inform.getInformStatus(),inform.getReporterId()});

    }

    @Override
    public List<Inform> getInformById(int informId) {
        return executeQuery("select * from t_inform where informId=?",new Object[]{informId});
    }

    @Override
    public List<Inform> getAllInform() {
        return executeQuery("select * from t_inform");
    }

    @Override
    public List<Inform> getAllInform(int pageNo,int pageSize){
        return executeQuery("select * from t_inform limit ?,?",new Object[]{(pageNo-1)*pageSize,pageSize});
    }
    @Override
    public int countAllInform(){
        return getRecordCount("select count(*) from t_inform");
    }
}
