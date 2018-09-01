layui.use('layer',function () {
    var layer = layui.layer;
})
$(function () {
    $("#s_login").click(function () {

        layer.open({
            type: 1 //Page层类型
            , area: ['400px', '390px']
            , title: '随享，随你所享'
            , shade: 0.6 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , anim: 1 //0-6的动画形式，-1不开启
            , content: '<div class="w_login">\n' +
                '    <div class="w_loginHead">\n' +
                '        <span>用户登录</span>\n' +
                '        <span>Login User</span>\n' +
                '    </div>\n' +
                '    <div class="w_line w_lineLeft"></div>\n' +
                '    <div class="w_loginText">\n' +
                '        随时随地分享你的生活\n' +
                '    </div>\n' +
                '    <div class="w_line w_lineRight"></div>\n' +
                '    <div class="w_loginUser">\n' +
                '        <span class="layui-icon layui-icon-username"></span>\n' +
                '        <input name="w_tel" id="w_telId" type="text" placeholder="手机号">\n' +
                '    </div>\n' +
                '    <div class="w_loginPass">\n' +
                '        <span class="layui-icon layui-icon-password"></span>\n' +
                '        <input name="w_pass" id="w_passId" type="password" placeholder="密码">\n' +
                '    </div>\n' +
                '    <div class="w_remMe">\n' +
                '        <input id="w_rememberMe" type="checkbox"><span>记住我</span>\n' +
                '    </div>\n' +
                '    <div class="w_loginBottom">\n' +
                '        <div class="w_validationCode">\n' +
                '            <input type="text" id="w_codeId" name="w_code" placeholder="请输入验证码">\n' +
                '        </div>\n' +
                '        <div class="w_validationImg">\n' +
                '            <div><img id="w_changeImg" src="/CheckCodeServlet" alt=""></div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="w_wrong" id="w_wrongInfo">\n' +
                '        <span>您输入的用户名或密码不正确</span>\n' +
                '    </div>\n' +
                '    <div class="w_loginBtn">\n' +
                '        <input type="button" id="w_login_btn" class="layui-btn layui-btn-radius layui-btn-normal" value="登录">\n' +
                '    </div>\n' +
                '\n' +
                '</div>'
        });

        //图片验证码点击刷新
        $("#w_changeImg").click(function () {
            $(this).attr("src","/CheckCodeServlet?time=" + new Date().getTime())
        });

        //登录时自动添加用户名和密码
        $(document).ready(function () {

            var username= $.cookie('cookieUserName');
            var password= $.cookie('cookiePass');
            $("#w_telId").val(username);
            $("#w_passId").val(password);
            if(($("#w_telId").val()==""||$.trim($("#w_telId").val()).length==0)&&($("#w_passId").val()==""||$.trim($("#w_passId").val()).length==0)){

                $("#w_rememberMe").attr("checked",false);
            }else{
                $("#w_rememberMe").attr("checked",true);
            }


        });


        //点击登录按钮验证
        $("#w_login_btn").click(function () {
            //如果用户名为空
            if($("#w_telId").val()==""||$.trim($("#w_telId").val()).length==0){
                $("#w_wrongInfo span").text("您还没有输入用户名");
                $("#w_wrongInfo span").css("display","inline-block");
            }
            //如果密码为空
            else if($("#w_passId").val()==""||$.trim($("#w_passId").val()).length==0){
                $("#w_wrongInfo span").text("您还没有输入密码");
                $("#w_wrongInfo span").css("display","inline-block");
            }
            //用户名和密码都不为空
            else{
                $.ajax({
                    url:"/UserLoginServlet",
                    type:"post",
                    data:{"w_tel":$("#w_telId").val(),"w_pass":$("#w_passId").val(),
                        "rememberMe":$("#w_rememberMe").is(":checked"),"w_code":$("#w_codeId").val()},
                    dataType:"text",
                    success:function (res) {
                        if(res=="true"){
                            if($("#w_rememberMe").is(":checked")){
                                $.cookie('cookieUserName',$("#w_telId").val(), { expires: 7, path: '/' });
                                $.cookie('cookiePass',$("#w_passId").val(), { expires: 7, path: '/' });
                            }else{
                                //删除cookie
                                $.removeCookie('cookieUserName',{ path: '/' });
                                $.removeCookie('cookiePass',{path: '/' });
                            }
                            //登录成功
                            $("#w_wrongInfo span").css("display","none");
                            layer.closeAll();
                            layer.msg("登录成功");
                            $.ajax({
                                url:"/ShowMy",
                                type:"post",
                                data:{"w_tel":$("#w_telId").val()},
                                dataType:"json",
                                success:function (result) {

                                }
                            })
                            $(".s_headphoto_nologin").hide();
                            $(".s_headphoto_login").show();
                            $("#s_header_right").show();
                        }else if(res=="false"){
                            $("#w_wrongInfo span").text("您输入的用户名或密码不正确");
                            $("#w_wrongInfo span").css("display","inline-block");
                        }else if(res=="codeFalse"){
                            $("#w_wrongInfo span").text("验证码错误");
                            $("#w_wrongInfo span").css("display","inline-block");
                        }else {
                            layer.msg("您因被举报锁定三个小时");
                        }
                    }

                });
            }


        });


    });
})