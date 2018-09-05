package service;
import java.sql.Date;
import java.sql.Timestamp;

public class JavaDateToSQLService {
    public Date JavaDateToSQL(java.util.Date date){
        Timestamp t = new Timestamp(date.getTime());
        return null;
    }
}
