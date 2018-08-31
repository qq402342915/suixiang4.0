package util;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import java.text.SimpleDateFormat;
import java.util.Date;

public class JsonDate implements JsonValueProcessor {
    private String format ="yyyy-MM-dd HH:mm:ss";
    private SimpleDateFormat sdf=new SimpleDateFormat(format);
    @Override
    public Object processArrayValue(Object o, JsonConfig jsonConfig) {
        return null;
    }

    @Override
    public Object processObjectValue(String s, Object o, JsonConfig jsonConfig) {
        if(o==null){
            return "";
        }else if(o instanceof Date){
            return sdf.format((Date)o);
        }
        else{
            return o.toString();
        }
    }
}
