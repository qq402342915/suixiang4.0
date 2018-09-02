$(function () {


    //获得所有记录总数,第一个值为servlet地址，第二个值为userId的值
    //如果传入第二个值，则根据第二个值的id查询总数

    //定义一个全局变量表示总数
    var Count = 0;

    function getCount(url, userId) {
        $.ajax({
            async: false,
            url: url,
            data: {"userId": userId},
            type: "post",
            dataType: "text",
            success: function (res) {
                Count = res;
            }
        });
        return Count;
    }

    //根据指定id删除某一行记录
    var delInt = -1;

    function delRow(url, id) {
        $.ajax({
            async: false,
            url: url,
            data: {"id": id},
            type: "post",
            dataType: "text",
            success: function (res) {
                if (res != null) {
                    delInt = res;
                } else {
                    delInt = -1;
                }
            }
        });
        return delInt;
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
        //加载弹框
        var loadBlog = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $(".w_demo").children().remove();
        $(".w_demo").addClass("w_padding");


        var $head = $('<div class="demoTable">\n' +
            '                    搜索用户ID：\n' +
            '                    <div class="layui-inline">\n' +
            '                        <input class="layui-input" name="id" id="demoReload" autocomplete="off">\n' +
            '                    </div>\n' +
            '                    <button class="layui-btn" id="w_UserSelect" data-type="reload">搜索</button>\n' +
            '                </div>');

        var $table = $(
            '<table class="layui-table">\n' +
            '    <colgroup>\n' +
            '        <col width="50">\n' +
            '        <col width="100">\n' +
            '        <col width="70">\n' +
            '        <col width="100">\n' +
            '        <col width="130">\n' +
            '        <col width="50">\n' +
            '        <col width="100">\n' +
            '        <col width="100">\n' +
            '        <col width="120">\n' +
            '\n' +
            '    </colgroup>\n' +
            '    <thead>\n' +
            '    <tr>\n' +
            '        <th>ID</th>\n' +
            '        <th>用户昵称</th>\n' +
            '        <th>头像</th>\n' +
            '        <th>手机号</th>\n' +
            '        <th>邮箱</th>\n' +
            '        <th>性别</th>\n' +
            '        <th>注册时间</th>\n' +
            '        <th>锁定时间</th>\n' +
            '        <th>操作</th>\n' +
            '    </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '</table>');

        $(".w_demo").prepend($table);
        $(".w_demo").prepend($head);

        //分页，第一第二位的值为分页数据，第三个为url地址
        //若要根据查询指定值分页，则传入第四个参数
        //访问user
        function limitUser(pageNo, pageSize, url, id) {
            $.ajax({
                url: url,
                type: "post",
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize,
                    "userId": id
                },
                dataType: "json",
                success: function (res) {
                    getUserJson(res);

                }
            });
        }

        //分页，count后面写传入数据的总数
        //jump中写回调函数
        //分页用户
        layui.use('laypage', function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: 'demo'
                , limit: 7
                , count: getCount("/ShowUserCountServlet")
                , layout: ['prev', 'page', 'next', 'skip']
                , jump: function (obj) {
                    var pageNo = obj.curr;
                    var pageSize = obj.limit;
                    limitUser(pageNo, pageSize, "/EndShowAllUserServlet");
                }
            });

        });

        //得到用户json格式
        function getUserJson(res) {
            $table.children("tbody").children().remove();
            $.each(res, function (index, obj) {
                var $tr = $('    <tr>\n' +
                    '        <td>' + obj['userId'] + '</td>\n' +
                    '        <td>' + obj['userName'] + '</td>\n' +
                    '        <td><img src='+obj['headP']+' class="layui-nav-img"></td>\n' +
                    '        <td>' + obj['telNum'] + '</td>\n' +
                    '        <td>' + obj['email'] + '</td>\n' +
                    '        <td>' + obj['sex'] + '</td>\n' +
                    '        <td>' + obj['regDate'] + '</td>\n' +
                    '        <td>' + obj['lockDate'] + '</td>\n' +
                    '        <td>\n' +
                    '        <button class="layui-btn layui-btn-xs see">查看详情</button>\n' +
                    '        <button class="layui-btn layui-btn-xs del layui-btn-sm layui-btn-normal layui-btn layui-btn-danger">\n' +
                    '            <i class="layui-icon"></i> 删除</button></td>\n' +
                    '    </tr>');

                $table.children("tbody").append($tr);
                //关闭加载层
                layer.close(loadBlog);

            });
        };

    });

    //1.2
    //点击查看查看个人信息
    $("body").on("click", ".see", function () {


        //获取用户ID
        var userId = $(this).closest('tr').children().eq(0).text();
        //发送ajax请求用户表展示单个用户详细信息
        $.ajax({
            url: "/EndUserDetailsServlet",
            type: "post",
            data: {"userId": userId},
            dataType: "json",
            success: function (res) {
                getUserDetailsJson(res);

            }
        });

        //得到评论json格式
        function getUserDetailsJson(res) {
            $.each(res, function (index, obj) {
                var $detTr = $('    <tr>\n' +
                    '        <td>出生日期</td>\n' +
                    '        <td>' + obj['birthday'].substring(0,10) + '</td>\n' +
                    '</tr>\n' +
                    '    <tr>\n' +
                    '        <td>所在地</td>\n' +
                    '        <td>' + obj['address'] + '</td>\n' +
                    '</tr>\n' +
                    '    <tr>\n' +
                    '        <td>毕业学校</td>\n' +
                    '        <td>' + obj['school'] + '</td>\n' +
                    '</tr>\n' +
                    '    <tr>\n' +
                    '        <td>签名</td>\n' +
                    '        <td>' + obj['sign'] + '</td>\n' +
                    '    </tr>');
                $("#details").append($detTr);

            });

        }






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
            '    <tbody id="details">\n' +
            '    </tbody>\n' +
            '</table>'
        });

    });
    //1.3
    //点击删除按钮删除个人信息
    $("body").on("click", ".del", function () {
        var $id = $(this).closest('tr');
        var userId = $(this).closest('tr').children().eq(0).text();
        alert(userId);

        layer.confirm('确定要删除吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            if (delRow("/EndDelUserServlet", userId) != -1) {
                $id.remove();
                layer.msg('删除成功', {icon: 1});
            } else {
                layer.msg('删除失败', {icon: 2})
            }
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
            shade: [0.1, '#fff'] //0.1透明度的白色背景
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


        //分页，第一第二位的值为分页数据，第三个为url地址
        //若要根据查询指定值分页，则传入第四个参数
        function limit(pageNo, pageSize, url, id) {
            $.ajax({
                url: url,
                type: "post",
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize,
                    "userId": id
                },
                dataType: "json",
                success: function (res) {
                    getBlogJson(res);

                }
            });
        }


        //分页，count后面写传入数据的总数
        //jump中写回调函数
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
                    limit(pageNo, pageSize, "/ShowAllBlogServlet");
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
            var blogId = $(this).closest('tr').children().eq(0).text();
            // alert(blogId);
            //发送ajax请求评论表
            $.ajax({
                url: "/EndShowCommentServlet",
                type: "post",
                data: {"blogId": blogId},
                dataType: "json",
                success: function (res) {
                    getCommentJson(res);

                }
            });

            //得到评论json格式
            function getCommentJson(res) {
                $.each(res, function (index, obj) {
                    var $comTr = $('    <tr>\n' +
                        '        <td>' + obj['userId'] + '</td>\n' +
                        '        <td>' + obj['comContent'] + '</td>\n' +
                        '    </tr>');
                    $("#comId").append($comTr);

                });

            }

            //弹出查看详情页
            layer.open({
                type: 1 //Page层类型
                , area: ['500px', '300px']
                , title: '查看评论'
                , shade: 0.6 //遮罩透明度
                , maxmin: true //允许全屏最小化
                , anim: 1 //0-6的动画形式，-1不开启
                , content: '<div style="padding:0 10px; height: 200px">' + '<table class="layui-table">\n' +
                '        <colgroup>\n' +
                '            <col width="50">\n' +
                '            <col width="200">\n' +
                '        </colgroup>\n' +
                '        <thead>\n' +
                '        <tr>\n' +
                '            <td>用户ID</td>\n' +
                '            <td>评论内容</td>\n' +
                '        </tr>\n' +
                '        <tbody id="comId">\n' +
                '        </tbody>\n' +
                '        </thead>\n' +
                '    </table>\n' +
                '</div>'
            });
        });

        //2.3
        //点击删除按钮删除个人信息
        $("body").on("click", ".w_blog_del", function () {
            var $id = $(this).closest('tr');
            //获取当前微博id
            var blogId = $(this).closest('tr').children().eq(0).text();
            layer.confirm('确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {

                if (delRow("/EndDeleteOneBlogServlet", blogId) != -1) {
                    $id.remove();
                    layer.msg('删除成功', {icon: 1});
                } else {
                    layer.msg('删除失败', {icon: 2})
                }


            }, function () {
                layer.msg('取消操作');
            });
        });

        //2.4
        //点击搜索搜索指定用户ID发过的所有微博
        $("body").on("click", "#w_blogSelect", function () {
            //获取input信息
            var userId = $("#demoReload").val();
            // 把input信息通过ajax发送到后端 "/EndUserBlogServlet"
            //分页
            layui.use('laypage', function () {
                var laypage = layui.laypage
                    , layer = layui.layer;
                laypage.render({
                    elem: 'demo'
                    , limit: 7
                    , count: getCount("/EndBlogCountServlet", userId)
                    , layout: ['prev', 'page', 'next', 'skip']
                    , jump: function (obj) {
                        var pageNo = obj.curr;
                        var pageSize = obj.limit;
                        limit(pageNo, pageSize, "/EndUserBlogServlet", userId);

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
