layui.use(['flow', 'upload', "layer", "element"], function () {
    var flow = layui.flow,
        upload = layui.upload,
        layer = layui.layer,
        element = layui.element;

    //执行实例
    var uploadInst = upload.render({
        elem: '#s_picture',      //绑定元素
        url: "/uploadFile", //上传接口
        accept: 'images',
        auto: false, //选择文件后不自动上传
        multiple: true, //允许多文件上传
        drag: true,
        bindAction: '#publish', //指向一个按钮触发上传
        dataType: 'json',//服务器返回的数据类型
        //选中图片之后触发
        choose: function (obj) {
            //将每次选择的文件追加到文件队列
            var files = obj.pushFile();
            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function (index, file, result) {
                if (file.size > 0 && $('.preview_div').find('img').length === 0) {
                    $('.preview_div').empty();
                }
                // 添加图片 ImgPreview-预览的dom元素的id
                $('.preview_div').append('<div class="image-container" id="container' + index + '"><div class="delete-css"></div>' +
                    '<img id="showImg' + index + '" style="width: 150px; margin:4px;cursor:pointer;float: left"src="' + result + '" alt="' + file.name + '"><button id="upload_img_' + index + '" class="layui-btn layui-btn-danger layui-btn-xs" style="float: left">X</button></div>');
                //删除某图片
                $("#upload_img_" + index).click(function () {
                    delete files[index];
                    $("#container" + index).remove();
                    uploadInst.config.elem.next()[0].value = '';
                });
                //某图片放大预览
                $("#showImg" + index).click(function () {
                    var width = $("#showImg" + index).width();
                    var height = $("#showImg" + index).height();
                    var scaleWH = width / height;
                    var bigH = 600;
                    var bigW = scaleWH * bigH;
                    if (bigW > 900) {
                        bigW = 900;
                        bigH = bigW / scaleWH;
                    }
                    // 放大预览图片
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: 1,
                        shadeClose: true,
                        area: [bigW + 'px', bigH + 'px'], //宽高
                        content: "<img width='" + bigW + "' height='" + bigH + "' src=" + result + " />"
                    });
                })

            });
        },

        done: function (res, index, upload) {
            alert("上传成功");
            layer.closeAll('loading'); //关闭loading
            $('.preview_div').children().remove();
        },
        error: function (index, upload) {
            layer.open({
                type: 1
                , offset: auto
                , id: 'layerDemo' + type //防止重复弹出
                , content: '<div style="padding: 20px 100px;">' + text + '</div>'
                , btn: '知道啦'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
    });


    /*上传视频多文件*/
    var uploadListIns = upload.render({
        elem: '#s_video',
        url: '/uploadFile',
        accept: 'video',
        multiple: true,
        auto: true,
        drag: true,
        dataType: 'json',
        choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>&nbsp;&nbsp;&nbsp;' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-normal video_publish">上传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '<td><button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button></td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                $(".preview_div").append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.errno == 0) { //上传成功
                setTimeout("$('.preview_div').children().remove()", 3000);
                var tr = $(".preview_div").find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = $(".preview_div").find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });


    $(function () {
        //转发,
        //评论
        $(".s_mynode").on("click", ".s_body_content_func_2", function () {
            var $node = $(this).parents(".s_mynode");
            var $comment = $node.children(".s_comment");
            $comment.children(".s_comment_publish").nextAll().remove();
            // alert();
            if ($($comment).css("display") != "none") {
                $comment.hide();
            } else {
                $comment.show();
            }
            $.ajax({
                url: "/SShowComment",
                type: "post",
                data: {"blogId": $node.attr("blogId")},
                dataType: "json",
                success: function (comment) {
                    for (var i = 0; i < comment.length; i++) {
                        var $newcomment = '<div class="s_showcomment">' +
                            '<img src="../images/logo.png" alt="">' +
                            '<span class="s_showcomment_name">我不爱吃西红柿</span>' +
                            '<div class="s_showcomment_text">:' + comment[i].comContent + '</div>' +
                            '<div class="s_showcomment_footer">' +
                            '<span class="s_showcomment_time">' + format(comment[i].comDate.time) + '</span>' +
                            '<div class="s_showcomment_footer_right">' +
                            '<span class="s_showcomment_footer_right_hui">回复</span>' +
                            '<span class="s_showcomment_footer_right_pra"><i class="layui-icon layui-icon-praise"></i><span>' + comment[i].num + '</span></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        $comment.append($newcomment);
                    }
                }
            })
        })
        //点赞
        var $node = $(".s_mynode").detach();

        function showContent(url, node) {
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                success: function (userblog) {
                    var $mynode;
                    // alert((userblog[0].blogPic == ""));
                    // var mypage = 5;
                    // var mypages = Math.floor(userblog.length/5);
                    for (var i = 0; i < userblog.length; i++) {
                        $mynode = $node.clone(true)
                        var $newnode;
                        // i = (page-1)*5 + j;
                        if (userblog[i].blogPic != "") {
                            var patt1 = new RegExp("\\w+(?:\\.jpg|\\.png)", "g");
                            // var reg = /\w+(?:\.jpg|\.png)/;
                            // var pic = patt1.exec(userblog[i].blogPic);
                            var pic = "";
                            do {
                                result = patt1.exec(userblog[i].blogPic);
                                if (result != null) {
                                    pic = pic + '<img src="../images/' + result + '" alt="">';
                                }
                            }
                            while (result != null)
                            $newnode = '<div class="s_body_content_personinfo"> <img src=' + userblog[i].headP + ' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">' + userblog[i].userName + '</a> <span>' + format(userblog[i].sendDate.time) + '</span> </div> </div> <div class="s_body_content_text">' + userblog[i].context + '<br>' + pic + '</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>' + userblog[i].tsNum + '</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>' + userblog[i].comNum + '</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim layui-anim-scaleSpring" style="font-size: 25px"></i><span>' + userblog[i].praNum + '</span></div> </div>';
                        } else if (userblog[i].blogVideo != "") {
                            $newnode = '<div class="s_body_content_personinfo"> <img src=' + userblog[i].headP + ' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">' + userblog[i].userName + '</a> <span>' + format(userblog[i].sendDate.time) + '</span> </div> </div> <div class="s_body_content_text">' + userblog[i].context + '<br>' + '</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>' + userblog[i].tsNum + '</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>' + userblog[i].comNum + '</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim layui-anim-scaleSpring" style="font-size: 25px"></i><span>' + userblog[i].praNum + '</span></div> </div>';
                        } else if (userblog[i].blogPic == "" && userblog[i].blogVideo == "") {
                            $newnode = '<div class="s_body_content_personinfo"> <img src=' + userblog[i].headP + ' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">' + userblog[i].userName + '</a> <span>' + format(userblog[i].sendDate.time) + '</span> </div> </div> <div class="s_body_content_text">' + userblog[i].context + '</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>' + userblog[i].tsNum + '</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>' + userblog[i].comNum + '</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim layui-anim-scaleSpring" style="font-size: 25px"></i><span>' + userblog[i].praNum + '</span></div> </div>';
                        }
                        $mynode.attr("blogId", userblog[i].blogId);
                        $mynode.prepend($newnode);
                        $(node).append($mynode);
                    }
                }
            })
        }

        showContent("/ShowHotBlog", "#LAY_demo1");

        //登录成功后，显示用户信息，关注微博等
        function showUser() {
            $("#personInfo").prop("href", "personinfo.html");
            $.ajax({
                url: "/ShowMy",
                type: "post",
                data: {"w_tel": $("#w_telId").val()},
                dataType: "json",
                success: function (user) {
                    $("#s_headphoto_photo").prop("src", user[0].headP);
                    $("#s_userName").html(user[0].userName);
                }
            })
            $(".s_headphoto_nologin").hide();
            $(".s_headphoto_login").show();
            $("#s_header_right").show();
            $("#s_body_content_commentgif").click(function () {
                showContent("/ShowLikeDayBlog", "#LAY_demo2");
            })
            //发布功能
            $("#publish").click(function () {

            })


        }

        // $("#LAY_demo1").hide();
        $.ajax({
            url: "/ShowMy",
            dataType: "json",
            success: function (result) {
                // alert(result[0]);
                // alert(result.userName);
                if (result[0].userName != null) {
                    showUser();
                }
            }
        })
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
                $(this).attr("src", "/CheckCodeServlet?time=" + new Date().getTime())
            });

            //登录时自动添加用户名和密码
            $(document).ready(function () {

                var username = $.cookie('cookieUserName');
                var password = $.cookie('cookiePass');
                $("#w_telId").val(username);
                $("#w_passId").val(password);
                if (($("#w_telId").val() == "" || $.trim($("#w_telId").val()).length == 0) && ($("#w_passId").val() == "" || $.trim($("#w_passId").val()).length == 0)) {

                    $("#w_rememberMe").attr("checked", false);
                } else {
                    $("#w_rememberMe").attr("checked", true);
                }


            });


            //点击登录按钮验证
            $("#w_login_btn").click(function () {
                //如果用户名为空
                if ($("#w_telId").val() == "" || $.trim($("#w_telId").val()).length == 0) {
                    $("#w_wrongInfo span").text("您还没有输入用户名");
                    $("#w_wrongInfo span").css("display", "inline-block");
                }
                //如果密码为空
                else if ($("#w_passId").val() == "" || $.trim($("#w_passId").val()).length == 0) {
                    $("#w_wrongInfo span").text("您还没有输入密码");
                    $("#w_wrongInfo span").css("display", "inline-block");
                }
                //用户名和密码都不为空
                else {
                    $.ajax({
                        url: "/UserLoginServlet",
                        type: "post",
                        data: {
                            "w_tel": $("#w_telId").val(), "w_pass": $("#w_passId").val(),
                            "rememberMe": $("#w_rememberMe").is(":checked"), "w_code": $("#w_codeId").val()
                        },
                        dataType: "text",
                        success: function (res) {
                            if (res == "true") {
                                if ($("#w_rememberMe").is(":checked")) {
                                    $.cookie('cookieUserName', $("#w_telId").val(), {expires: 7, path: '/'});
                                    $.cookie('cookiePass', $("#w_passId").val(), {expires: 7, path: '/'});
                                } else {
                                    //删除cookie
                                    $.removeCookie('cookieUserName', {path: '/'});
                                    $.removeCookie('cookiePass', {path: '/'});
                                }
                                //登录成功
                                $("#w_wrongInfo span").css("display", "none");
                                layer.closeAll();
                                layer.msg("登录成功");
                                showUser();
                            } else if (res == "false") {
                                $("#w_wrongInfo span").text("您输入的用户名或密码不正确");
                                $("#w_wrongInfo span").css("display", "inline-block");
                            } else if (res == "codeFalse") {
                                $("#w_wrongInfo span").text("验证码错误");
                                $("#w_wrongInfo span").css("display", "inline-block");
                            } else {
                                layer.msg("您因被举报锁定三个小时");
                            }
                        }

                    });
                }


            });

        });


        $("#s_publish_test").emoji({
            button: "#s_emoji",
            showTab: true,
            animation: 'fade',
            basePath: '../images/emoji',
            icons: emojiLists   // 注：详见 js/emoji.list.js
        });

        //推荐关注
        alert($("#y_a1").text())
        // var i = 1;
        $.ajax({
            url: "/SuggestFollow",
            type: "post",
            // data: {"page": i},
            dataType: "json",
            success: function (ret) {
// alert(ret[0].headP)
                $("#y_img1").prop("src", ret[0].headP);
                $("#y_a1").text(ret[0].userName);
                $("#y_img2").attr("src", ret[1].headP);
                $("#y_a2").text(ret[1].userName);
                $("#y_img3").prop("src", ret[2].headP);
                $("#y_a3").text(ret[2].userName);
                $("#y_img4").prop("src", ret[3].headP);
                $("#y_a4").text(ret[3].userName);
            }
        })

        //选择关注
        $(".y_follow").click(function () {

                $.ajax({
                    url: "/InsertFollow",
                    type: "post",
                    data: {
                        "userName": $(this).prev().text()
                    },
                    dataType: "json",
                    success: function (ret) {

                    }
                })
                $(this).text("√ 已关注")
                //setTimeout(reload2(),3000);
                // setTimeout(function (){$(".y_follow").text("+关注")},2000);
            }
        )
        $("#y_change").click(function () {

            $.ajax({
                url: "/SuggestFollow",
                type: "post",
                // data: {"page": i},
                dataType: "json",
                success: function (ret) {

                    $("#y_img1").prop("src", ret[0].headP);
                    $("#y_a1").html(ret[0].userName);
                    $("#y_img2").attr("src", ret[1].headP);
                    $("#y_a2").text(ret[1].userName);
                    $("#y_img3").prop("src", ret[2].headP);
                    $("#y_a3").text(ret[2].userName);
                    $("#y_img4").prop("src", ret[3].headP);
                    $("#y_a4").text(ret[3].userName);
                }
            })
            $(".y_follow").text("+关注");
        });


    });
})



function add0(m) {
    return m < 10 ? '0' + m : m
}

function format(timestamp) {
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况

    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}

function reload2() {
    $.ajax({
        url: "/SuggestFollow",
        type: "post",
        dataType: "json",
        success: function (ret) {

            $("#y_img1").prop("src", ret[0].headP);
            $("#y_a1").text(ret[0].userName);
            $("#y_img2").attr("src", ret[1].headP);
            $("#y_a2").text(ret[1].userName);
            $("#y_img3").prop("src", ret[2].headP);
            $("#y_a3").text(ret[2].userName);
            $("#y_img4").prop("src", ret[3].headP);
            $("#y_a4").text(ret[3].userName);
        }
    })
}
