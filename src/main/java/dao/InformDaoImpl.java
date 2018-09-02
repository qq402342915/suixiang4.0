package dao;

import entity.Inform;

import java.util.List;

public class InformDaoImpl extends BaseDao<Inform> implements InformDao {
    @Override
    public int insertInform(Inform inform) {
        return executeUpdate("insert into t_inform(userId, informContent, warnDate, informStatus,reporterId)values(?,?,?,?,?)",new Object[]{inform.getUserId(),inform.getInformContent(),inform.getWarnDate(),inform.getInformStatus(),inform.getReporterId()});

    }

    @Override
    public List<Inform> getInformById(int userId) {
        return executeQuery("select * from t_inform where userId=?",new Object[]{userId});
    }

    @Override
    public List<Inform> getAllInform() {
        return executeQuery("select * from t_inform");
    }
}
