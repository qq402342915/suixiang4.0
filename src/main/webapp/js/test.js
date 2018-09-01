$(function () {
    //定义一个全局变量表示总数
    var Count = 0;

    //获得所有记录总数
    function getCount(url){
        $.ajax({
            async: false,
            url: url,
            type: "post",
            dataType: "text",
            success: function (res) {
                Count=res;
            }
        });
        return Count;
    }


    layui.use('element', function () {
        var element = layui.element;

    });


    //查看管理员基本资料
    $("#w_see_admin").click(function (e) {
        e.preventDefault();
        layer.open({
            type: 1 //Page层类型
            , area: ['500px', '300px']
            , title: '你好，远方。'
            , shade: 0.6 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , anim: 1 //0-6的动画形式，-1不开启
            , content: '<div style="padding:50px;">这是一个非常普通的页面层，传入了自定义的html</div>'
        });
    });

    //1.用户管理
    //1.1切换表格
    $("#w_user_manage").click(function (e) {
        e.preventDefault();
        $(".w_demo").children().remove();


        $(".w_demo").prepend('<div class="demoTable">\n' +
            '                    搜索ID：\n' +
            '                    <div class="layui-inline">\n' +
            '                        <input class="layui-input" name="id" id="demoReload" autocomplete="off">\n' +
            '                    </div>\n' +
            '                    <button class="layui-btn" data-type="reload">搜索</button>\n' +
            '                </div>\n' +
            '                <table class="layui-table">\n' +
            '                    <colgroup>\n' +
            '                        <col width="50">\n' +
            '                        <col width="100">\n' +
            '                        <col width="70">\n' +
            '                        <col width="100">\n' +
            '                        <col width="100">\n' +
            '                        <col width="70">\n' +
            '                        <col width="100">\n' +
            '\n' +
            '                        <col width="100">\n' +
            '                        <col width="120">\n' +
            '\n' +
            '\n' +
            '                    </colgroup>\n' +
            '                    <thead>\n' +
            '                    <tr>\n' +
            '                        <th>ID</th>\n' +
            '                        <th>用户昵称</th>\n' +
            '                        <th>头像</th>\n' +
            '                        <th>手机号</th>\n' +
            '                        <th>密码</th>\n' +
            '                        <th>性别</th>\n' +
            '\n' +
            '                        <th>注册时间</th>\n' +
            '\n' +
            '                        <th>锁定时间</th>\n' +
            '                        <th>操作</th>\n' +
            '\n' +
            '                    </tr>\n' +
            '                    </thead>\n' +
            '                    <tbody>\n' +
            '                    <tr>\n' +
            '                        <td>1</td>\n' +
            '                        <td>远方</td>\n' +
            '                        <td><img src="../images/headpic1.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>17863951757</td>\n' +
            '                        <td>609455247@qq.com</td>\n' +
            '                        <td>男</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button></td>\n' +
            '\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td>2</td>\n' +
            '                        <td>核桃</td>\n' +
            '                        <td><img src="../images/headpic2.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>15621437172</td>\n' +
            '                        <td>fjsklfjs@qq.com</td>\n' +
            '                        <td>女</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:35</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:67</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button></td>\n' +
            '\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td>1</td>\n' +
            '                        <td>远方</td>\n' +
            '                        <td><img src="../images/headpic3.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>17863951757</td>\n' +
            '                        <td>609455247@qq.com</td>\n' +
            '                        <td>男</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button></td>\n' +
            '\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td>1</td>\n' +
            '                        <td>远方</td>\n' +
            '                        <td><img src="../images/headpic4.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>17863951757</td>\n' +
            '                        <td>609455247@qq.com</td>\n' +
            '                        <td>男</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button></td>\n' +
            '\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td>1</td>\n' +
            '                        <td>远方</td>\n' +
            '                        <td><img src="../images/headpic3.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>17863951757</td>\n' +
            '                        <td>609455247@qq.com</td>\n' +
            '                        <td>男</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button></td>\n' +
            '\n' +
            '                    </tr>\n' +
            '\n' +
            '                    <tr>\n' +
            '                        <td>100</td>\n' +
            '                        <td>远方</td>\n' +
            '                        <td><img src="../images/headpic4.jpg" class="layui-nav-img"></td>\n' +
            '                        <td>17863951757</td>\n' +
            '                        <td>609455247@qq.com</td>\n' +
            '                        <td>男</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '\n' +
            '                        <td>2016-11-29 11:00:00</td>\n' +
            '                        <td>\n' +
            '                            <button class="layui-btn layui-btn-xs see">查看</button>\n' +
            '                            <button class="del layui-btn-xs layui-btn layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
            '                                <i class="layui-icon"></i> 删除</button>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                    </tbody>\n' +
            '                </table>');
        $(".w_demo").addClass("w_padding");
    });

    //1.2
    //点击查看查看个人信息
    $("body").on("click", ".see", function () {
        var $id = $(this).closest('tr');
        console.log($id.text());
        console.log($id.children().eq(1).text());
        layer.open({
            type: 1 //Page层类型
            , area: ['500px', '300px']
            , title: $id.children().eq(1).text() + '的信息'
            , shade: 0.6 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , anim: 1 //0-6的动画形式，-1不开启
            , content: '<table class="layui-table">\n' +
            '    <colgroup>\n' +
            '        <col width="100">\n' +
            '        <col width="200">\n' +
            '    </colgroup>\n' +
            '    <tbody>\n' +
            '    <tr>\n' +
            '        <td>出生日期</td>\n' +
            '        <td>1998-04-07</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td>所在地</td>\n' +
            '        <td>北京</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td>毕业学校</td>\n' +
            '        <td>青岛大学</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td>签名</td>\n' +
            '        <td>人生如逆旅</td>\n' +
            '    </tr>\n' +
            '\n' +
            '\n' +
            '    </tbody>\n' +
            '</table>'
        });

    });
    //1.3
    //点击删除按钮删除个人信息
    $("body").on("click", ".del", function () {
        var $id = $(this).closest('tr');

        layer.confirm('确定要删除吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $id.remove();
            layer.msg('删除成功', {icon: 1});
        }, function () {
            layer.msg('取消操作');
        });
    });


    //2.微博管理
    //2.1切换表格
    $("#w_blog_manage").click(function (e) {
        e.preventDefault();

        //加载弹框
        var loadBlog = layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });


        $(".w_demo").children().remove();
        $(".w_demo").addClass("w_padding");


        var $head = $('<div class="demoTable">\n' +
            '                    搜索用户ID：\n' +
            '                    <div class="layui-inline">\n' +
            '                        <input class="layui-input" name="id" id="demoReload" autocomplete="off">\n' +
            '                    </div>\n' +
            '                    <button class="layui-btn" id="w_blogSelect" data-type="reload">搜索</button>\n' +
            '                </div>');
        var $table = $(
            '<table class="layui-table">\n' +
            '    <colgroup>\n' +
            '        <col width="70">\n' +
            '        <col width="70">\n' +
            '        <col width="70">\n' +
            '        <col width="70">\n' +
            '        <col width="160">\n' +
            '        <col width="70">\n' +
            '        <col width="100">\n' +
            '\n' +
            '    </colgroup>\n' +
            '    <thead>\n' +
            '    <tr>\n' +
            '        <th>微博ID</th>\n' +
            '        <th>用户ID</th>\n' +
            '        <th>发表时间</th>\n' +
            '        <th>发布地点</th>\n' +
            '        <th>微博内容</th>\n' +
            '        <th>转发次数</th>\n' +
            '        <th>操作</th>\n' +
            '    </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '</table>');
        $(".w_demo").prepend($table);
        $(".w_demo").prepend($head);


        //分页
        function limit(pageNo, pageSize,url,id) {
            $.ajax({
                url: url,
                type: "post",
                data: {"pageNo": pageNo,
                    "pageSize": pageSize,
                    "userId":id},
                dataType: "json",
                success: function (res) {
                    getBlogJson(res);
                }
            });
        }



        //分页
        layui.use('laypage', function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: 'demo'
                , limit: 7
                , count: getCount("/GetBlogCountServlet")
                , layout: ['prev', 'page', 'next', 'skip']
                , jump: function (obj) {
                    var pageNo = obj.curr;
                    var pageSize = obj.limit;
                    limit(pageNo, pageSize,"/ShowAllBlogServlet");

                }
            });

        });

        //得到微博
        function getBlogJson(res) {
            $table.children("tbody").children().remove();
            $.each(res, function (index, obj) {
                var $tr = $('    <tr>\n' +
                    '        <td>' + obj['blogId'] + '</td>\n' +
                    '        <td>' + obj['userId'] + '</td>\n' +
                    '        <td>' + obj['sendDate'] + '</td>\n' +
                    '        <td>' + obj['sendAddr'] + '</td>\n' +
                    '        <td>' + obj['context'] + '</td>\n' +
                    '        <td>' + obj['tsNum'] + '</td>\n' +
                    '        <td>\n' +
                    '        <button class="layui-btn layui-btn-xs w_blog_see">查看详情</button>\n' +
                    '        <button class="layui-btn layui-btn-xs w_blog_del layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
                    '            <i class="layui-icon"></i> 删除</button></td>\n' +
                    '    </tr>');

                $table.children("tbody").append($tr);
                //关闭加载层
                layer.close(loadBlog);

            });

        }

        //2.2查看详细信息
        $("body").on("click", ".w_blog_see", function () {
            layer.open({
                type: 1 //Page层类型
                , area: ['500px', '300px']
                , title: '你好，layer。'
                , shade: 0.6 //遮罩透明度
                , maxmin: true //允许全屏最小化
                , anim: 1 //0-6的动画形式，-1不开启
                , content: '<div style="padding:50px;">这是一个非常普通的页面层，传入了自定义的html</div>'
            });
        });

        //2.3
        //点击删除按钮删除个人信息
        $("body").on("click", ".w_blog_del", function () {
            var $id = $(this).closest('tr');

            layer.confirm('确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $id.remove();
                layer.msg('删除成功', {icon: 1});
            }, function () {
                layer.msg('取消操作');
            });
        });

        //2.4
        //点击搜索搜索指定用户ID发过的所有微博
        $("body").on("click","#w_blogSelect",function () {
           layer.msg("hahah");
           //获取input信息
            var userId=$("#demoReload").val();
            // 把input信息通过ajax发送到后端 "/EndUserBlogServlet"
            //分页
            layui.use('laypage', function () {
                var laypage = layui.laypage
                    , layer = layui.layer;
                laypage.render({
                    elem: 'demo'
                    , limit: 7
                    , count: getCount("/GetBlogCountServlet")
                    , layout: ['prev', 'page', 'next', 'skip']
                    , jump: function (obj) {
                        var pageNo = obj.curr;
                        var pageSize = obj.limit;
                        limit(pageNo, pageSize,"/ShowAllBlogServlet");

                    }
                });

            });


        });


        //3.消息通知
        //3.1切换表格
        $("#w_inform_manage").click(function (e) {
            e.preventDefault();
            $(".w_demo").children().remove();
            $(".w_demo").addClass("w_padding");


            $(".w_demo").prepend('<table class="layui-table">\n' +
                '    <colgroup>\n' +
                '        <col width="70">\n' +
                '        <col width="70">\n' +
                '        <col width="100">\n' +
                '        <col width="150">\n' +
                '        <col width="70">\n' +
                '        <col width="70">\n' +
                '        <col width="70">\n' +
                '    </colgroup>\n' +
                '    <thead>\n' +
                '    <tr>\n' +
                '        <th>通知ID</th>\n' +
                '        <th>被举报用户ID</th>\n' +
                '        <th>举报时间</th>\n' +
                '        <th>举报内容</th>\n' +
                '        <th>举报用户ID</th>\n' +
                '        <th>是否处理</th>\n' +
                '        <th>操作</th>\n' +
                '\n' +
                '    </tr>\n' +
                '    </thead>\n' +
                '    <tbody>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td>3</td>\n' +
                '        <td>5</td>\n' +
                '        <td>2018-07-09 11:00:00</td>\n' +
                '        <td>微博涉及反动言论</td>\n' +
                '        <td>1</td>\n' +
                '        <td>否</td>\n' +
                '        <td><button class="layui-btn w_inform_btn layui-btn-warm layui-btn-xs">警告</button></td>\n' +
                '\n' +
                '    </tr>\n' +
                '\n' +
                '\n' +
                '    </tbody>\n' +
                '</table>   ');
        });
        //3.2通知用户
        $("body").on("click", ".w_inform_btn", function () {
            layer.msg('通知成功');
        });


    });
});
