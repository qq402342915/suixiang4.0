package servlet;

import dao.UserInfoDao;
import dao.UserInfoDaoImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import util.UploadFile;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by David on 2018/8/28.
 */
@WebServlet("/uploadFile")
public class UploadFileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;



    /**
     * 上传数据及保存文件
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<String> fileSrcList = UploadFile.upload(request);
        JSONObject obj = new JSONObject();

        obj.put("errno",0);
        obj.put("data", JSONArray.fromObject(fileSrcList));
        String str=obj.toString();
        int begin=str.indexOf("upload");

        int end=str.indexOf("]")-1;
        System.out.println(str.substring(begin,end));
        String url="../"+str.substring(begin,end);
        String telNum="13333333333";
        new UserInfoDaoImpl().UpdateHeadP(url,telNum);
        response.getWriter().print(obj.toString());

    }
}
