var userId;
var userhead;
var username;
var key;
var num = 1;
var num1 = 1;
var topinfo = -1;
var maxPage = 1;
var rsCount = 1;
var pageSize = 3;
var maxPage1 = 1;
var rsCount1 = 1;
var from_userId;
$(function () {
    ///////////////////////////
    //转发
    $(".s_mynode").on("click",".s_body_content_func_1",function () {
        var $node = $(this);
        var userName = $node.parent().siblings(".s_body_content_personinfo").children().eq(1).children("a").text();
        // alert(userName);
        layer.open({
            type: 1 //Page层类型
            , area: ['500px', '343px']
            , title:"转发"
            , shade: 0.6 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , anim: 1 //0-6的动画形式，-1不开启
            , content: '<div class="s_trans_body">'+
                '<span class="s_trans_body_at">'+'@'+userName+'</span>'+
                '<div class="s_trans_body_text">'+
                '<textarea id="s_trans_body_text"></textarea>'+
                '</div>'+
                '<div class="s_trans_body_trans">'+
                '<button class="layui-btn layui-btn-sm layui-btn-normal" id="s_trans">转发</button>'+
                '</div>'+
                '</div>'
        })
        $("#s_trans").click(function () {
            // alert(($("#s_trans_body_text").val() != ""));
            var regv = /\w+(?:\.mp4)/;
            var video = regv.exec($node.parent().prev().children("video").prop("src"));
            var reg = /\w+(?:\.jpg|\.png)/;
            var photoList = $node.parent().prev().children("img");
            var photo = "";
            for(var i = 0;i<photoList.length;i++){
                photo = photo + reg.exec(reg.exec($node.parent().prev().children("img").eq(i).prop("src")))+","
            }
            if($("#s_trans_body_text").val() != ""){
                var text = "#"+$("#s_trans_body_text").val()+"#"+$(".s_trans_body_at").text()+$node.parent().prev().text();
            }else{
                var text = "#"+"转发的微博"+"#"+$(".s_trans_body_at").text()+$node.parent().prev().text();
            }
            $.ajax({
                url: "/PublishBlogServlet",
                type:"post",
                data:{"s_photo":photo,"s_text":text,"s_video":video,"blogId":$node.closest("li").attr("blogId")},
                dataType:"text",
                success:function (result1) {
                    if(result1 == 1){
                        var num = parseInt($node.parents(".s_comment").prev().children(".s_body_content_func_1").children("span").html()) + 1;
                        $node.parents(".s_comment").prev().children(".s_body_content_func_1").children("span").html(num);
                        layer.closeAll();
                        layer.msg("转发成功");
                        showContent("/ShowHotBlog",".c_content_right2");
                    }
                }
            })
        })
    });
    //发表评论
    $(".s_comment_publish_push").click(function () {
        var $node_push = $(this);
        var $node_text = $node_push.parent().prev().children(".s_comment_publish_text");
        var $node = $node_push.closest(".s_comment_publish");
        // alert($node_text.val());
        // alert($node_push.parents(".s_comment").prev().children(".s_body_content_func_2").children("span").html())
        $.ajax({
            url: "/SInsertComment",
            type:"post",
            data:{"userId":userId,"blogId":$node_push.closest("li").attr("blogId"),"comContent":$node_text.val()},
            dataType:"text",
            success:function (ret) {
                if(ret == "1"){
                    layer.msg("评论成功");
                    $(".s_comment_publish_text").val("");
                    var num = parseInt($node_push.parents(".s_comment").prev().children(".s_body_content_func_2").children("span").html()) + 1;
                    $node_push.parents(".s_comment").prev().children(".s_body_content_func_2").children("span").html(num);
                    $.ajax({
                        async: false,
                        url: "/SShowComment",
                        type:"post",
                        data:{"blogId":$node_push.closest("li").attr("blogId")},
                        dataType:"json",
                        success:function (comment) {
                            // alert(comment.length);
                            var $newcomment;
                            $.ajax({
                                async: false,
                                url: "/SShowUserInfoServlet",
                                type:"post",
                                data:{"userId":comment[0].userId},
                                dataType:"json",
                                success:function (s_user) {
                                    // alert(comment[0].comContent)
                                    $newcomment = '<div class="s_showcomment"> <img src="'+s_user[0].headP+'" alt=""> <span class="s_showcomment_name">'+s_user[0].userName+'</span> <div class="s_showcomment_text">:'+comment[0].comContent+'</div> <div class="s_showcomment_footer"> <span class="s_showcomment_time">'+format(comment[0].comDate.time)+'</span> <div class="s_showcomment_footer_right"> <span class="s_showcomment_footer_right_hui">回复</span> <span class="s_showcomment_footer_right_pra"><i class="layui-icon layui-icon-praise"></i><span>'+comment[0].num+'</span></span> </div> </div> </div>';
                                    $node.after($newcomment);
                                }
                            })
                        }
                    })
                }
            }
        })
    })
    //评论回复
    $(".s_mynode").on("click",".s_showcomment_footer_right_hui",function () {
        var $node_push_reply = $(this);
        var $node_push_reply_who = $node_push_reply.parents(".s_showcomment_footer").siblings(".s_showcomment_name").text();
        $node_push_reply.parents(".s_showcomment").siblings(".s_comment_publish").children(".s_comment_publish_header").children().eq(1).val("@"+$node_push_reply_who+":");
        // alert($node_push_reply.parents(".s_showcomment").siblings(".s_comment_publish").children(".s_comment_publish_header").children().eq(1).text())
    });
    //显示评论
    $(".s_mynode").on("click",".s_body_content_func_2",function () {
        var $node = $(this).parents(".s_mynode");
        var $comment = $node.children(".s_comment");
        $comment.children(".s_comment_publish").nextAll().remove();
        // alert();
        if($($comment).css("display") != "none"){
            $comment.hide();
        }else{
            $(".s_comment_publish_header img").prop("src",$(".s_body").attr("headP"));
            // alert($(".s_body").attr("headP"));
            $comment.show();
            $.ajax({
                async: false,
                url: "/SShowComment",
                type:"post",
                data:{"blogId":$node.attr("blogId")},
                dataType:"json",
                success:function (comment) {
                    // alert(comment.length);
                    for(var i = 0; i < comment.length;i++){
                        var $newcomment;
                        $.ajax({
                            async: false,
                            url: "/SShowUserInfoServlet",
                            type:"post",
                            data:{"userId":comment[i].userId},
                            dataType:"json",
                            success:function (s_user) {
                                // alert(comment[0].comContent)
                                $newcomment = '<div class="s_showcomment"> <img src="'+s_user[0].headP+'" alt=""> <span class="s_showcomment_name">'+s_user[0].userName+'</span> <div class="s_showcomment_text">:'+comment[i].comContent+'</div> <div class="s_showcomment_footer"> <span class="s_showcomment_time">'+format(comment[i].comDate.time)+'</span> <div class="s_showcomment_footer_right"> <span class="s_showcomment_footer_right_hui">回复</span> <span class="s_showcomment_footer_right_pra"><i class="layui-icon layui-icon-praise"></i><span>'+comment[i].num+'</span></span> </div> </div> </div>';
                            }
                        })
                        $comment.append($newcomment);
                    }
                }
            })
        }
    })
    //点赞
    $(".s_mynode").on("click",".s_body_content_func_3",function (e) {
        $su = $(this).closest("li");
        var t =$su.attr("blogid");
        $su1 = $(this).children().eq(0);
        praise_ud(t,$su1,"/SPraiseServlet");
    });
    var $node = $(".s_mynode").detach();
    // function reurl(){
    //     url = location.href; //把当前页面的地址赋给变量 url
    //     var times = url.split("?"); //分切变量 url 分隔符号为 "?"
    //     if(times[1] != 1){ //如果?后的值不等于1表示没有刷新
    //         url += "?1"; //把变量 url 的值加入 ?1
    //         self.location.replace(url); //刷新页面
    //     }
    // }
    // onload=reurl;

   //获取session里的userId
    $.ajax({
        async:false,
        url:"/RepostSession",
        type:"post",
        dataType:"json",
        success:function (user) {
            userId = user[0].userId;
            from_userId = userId;
        }
    });
    var flag=-1;
    var currentUserId=window.location.search.substring(8,11);
    if(userId==currentUserId){
        userId=userId;
        flag=1;
        $(".guanzhu").hide();
        $(".jubao").hide();
    }else {
        userId=currentUserId;
        flag=0;
        $(".c_search").hide();
        $(".c_search_img").hide();
        $(".c_list_span").addClass("hideguanzhu");
    }
    updateFansCount();
    updateFollowCount();
    showMyBlogInfo();
    showMyBlogCount();
    showTopIfFollow();
    showFansList();

    //获取用户信息
    $.ajax({
        async:false,
        url:"/SShowUserInfoServlet",
        type:"post",
        data:{"userId":userId},
        dataType:"json",
        success:function (user) {
            userhead = user[0].headP;
            username = user[0].userName;
            $(".c_head_img").prop("src",user[0].headP);
            $(".c_top_one_name h2").html(user[0].userName);
            if(user[0].sex == '女')  $(".c_top_one_name img").prop("src","../images/woman.png");
            else $(".c_top_one_name img").prop("src","../images/man.png");
            $(".intro").html(user.sign);
            $.ajax({
                async:false,
                url:"/SGetBgByIdServlet",
                type:"post",
                data:{"bgId":user[0].bgId},
                dataType:"text",
                success:function (bgPath) {
                    // alert(bgPath);
                    $("body").css("background-image","url(" + bgPath + ")");
                }
            });
            /*$(".c_content_top img").prop("src",user.headP);
            $(".c_content_name a").html("src",user.userName);*/
        }
    });
    /*window.onload()
    {
        if(location.href.indexOf('#reloaded')==-1){
            location.href=location.href+"#reloaded";
            location.reload();
        }
    }*/
    // if (sign == 0)
    // {	window.onload = function () { window.location.reload();sign = 1;}	}
    // var sign = 0;


//点击个人主页头部关注，取关
    $(".guanzhu").click(function () {
        if (topinfo == 1) {
            $.ajax({
                url:"/ShowFans?method=cancelTopFollow",
                data:{"nowId":currentUserId},
                dataType:"text",
                type:"post",
                success:function (res) {
                    if (res == 1) showTopIfFollow();
                    layer.msg("取消关注成功！");
                }
            });
        }else {
            $.ajax({
                url:"/ShowFans?method=addTopFollow",
                data:{"nowId":currentUserId},
                dataType:"text",
                type:"post",
                success:function (res) {
                    if (res == 1) showTopIfFollow();
                    layer.msg("添加关注成功！");
                }
            });
        }
    })
    //点击添加或取消关注
    $(".c_list").on('click',".c_list_span",function () {
        var fansId = $(this).attr("name");
        var $span = $(this);
        if ($span.html() == "<strong>+</strong> 关注"){
            $.ajax({
                url:"/ShowFans?method=addFollow",
                type:"post",
                data:{"userId":userId,"fansId":fansId},
                dataType:"text",
                success:function (result) {
                    if (result == 1) $span.html("✔已关注").css("background-color","rgb(232, 232, 232)");
                    updateFansCount();
                    updateFollowCount();
                }
            });
            layer.msg("添加关注成功！");
        }else {
            $.ajax({
                url:"/ShowFans?method=cancelFollow",
                type:"post",
                data:{"userId":userId,"fansId":fansId},
                dataType:"text",
                success:function (result) {
                    if (result == 1) $span.html("<strong>+</strong> 关注</span>").css("background-color","#f2f2f5");
                    updateFansCount();
                    updateFollowCount();
                }
            });
            layer.msg("取消关注成功！");
        }
    });
    $(".c_content_right1 a span").click(function () {
        location.reload();
    })
    //点击跳转其他主页
    $(".c_list").on('click',".c_list_a img",function (e){
        e.preventDefault();
        e.stopPropagation();
        currentUserId = $(this).attr("id");
        window.location.href="../html/personinfo.html?userId="+currentUserId;
    });
    //搜索微博
    $(".c_search_img").click(function () {
        key = $(".c_search").val();
        showSearchBlog();
    })
    //删除微博
    $(".c_content_right2").on('click',".c_blog_del",function () {
        var blogId = $(this).closest("li").attr("blogId");
        var $blogdiv = $(this).closest("li");
        layer.msg('确认要删除这条微博吗？', {
            time: 5000, //5s后自动关闭
            btn: ['确定', '取消'],
            yes:function () {
                $.ajax({
                    url:"/ShowBlogInfo?method=deleteBlog",
                    type:"post",
                    data:{"blogId":blogId},
                    dataType:"text",
                    success:function (result) {
                        if (result == 1) layer.msg("微博删除成功！");
                        $blogdiv.remove();
                        showMyBlogCount();
                    }
                });
            }
        });

    })
/*    $.ajax({
        url:"http://ip.taobao.com/service/getIpInfo.php?ip=43.247.4.54",
        type:"post",
        dataType:"JSONP",
        success:function (result) {
            alert("666")
        }
    });*/

    //点击改变主页或简介
    $(".c_top_two a").click(function () {
        if ($(this).prop("class") != "c_top_two1") {
            showUserInfo();
        }
        var index = $(this).index() + 1;
        $(this).css("border-bottom","3px solid #fa7d3c");
        $(this).siblings().css("border-bottom","0");
        $(this).css("font-weight","bold")
        $(this).siblings().css("font-weight","normal");
        $(".c_content_right_div").hide();
        $("#c_show_div" + index).show();
    });
    //点击改变关注，粉丝背景,切换列表
    $(".c_content_left a").click(function () {
        if($(this).prop("name") == "follow" ) {
            showFollowList();
            $("#prev").hide();
            $("#prev1").show();
            $("#next").hide();
            $("#next1").show();
            $("#c_follow").show();
            $("#c_fans").hide();
        }else {
            showFansList();
            $("#prev1").hide();
            $("#prev").show();
            $("#next1").hide();
            $("#next").show();
            $("#c_follow").hide();
            $("#c_fans").show();
        }
        $(this).css("background-color","#e8e8e8");
        $(this).siblings().css("background-color","white");
    });
    //显示举报
    $(".jubao").hover(function () {
        $(".jubao_div").show(300);
    },function () {
        $(".jubao_div").hide();
    })
    $(".jubao_div").hover(function () {
        $(this).show();
    },function () {
        $(this).hide(300);
    })


    //王时巨-------------------------------------------------------------
    //点击举报
    $("#w_Report").click(function () {
        layer.msg('确定要举报吗？', {
            /*time: 5000, //5s后自动关闭*/
            btn: ['确定', '再想想'],
            yes:function () {
                layer.open({
                    type: 1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    title:"请填写举报信息",
                    content: '<textarea class="c_report"></textarea>',
                    btn: ['提交','取消'],
                    yes:function () {
                        $.ajax({
                            url:"/ReportUserServlet",
                            data:{"userId":currentUserId,"content":$(".c_report").val()},
                            dataType:"text",
                            type:"post",
                            success:function (res) {
                                if (res == 1) {
                                    layer.closeAll();
                                    layer.msg("举报成功！");
                                    $("#w_Report").html("&nbsp&nbsp&nbsp已举报");
                                    $(".jubao_div").hide();
                                }
                            }
                        });
                    }
                });
            }
        });


    });

    //显示粉丝列表id
    function getFansId() {
        $.ajax({
            url:"/ShowFans?method=showMyFansInfo",
            type:"post",
            dataType:"json",
            success:function (myfansList) {
                $(".c_list").children().remove();
                for (var i = 0; i < myfansList.length; i ++){
                    var userId = myfansList[i].userId;
                }
            }
        });
    }

    //显示关注列表id
    function getFollowId() {
        $.ajax({
            url:"/ShowFans?method=showMyFollowInfo",
            type:"post",
            dataType:"json",
            success:function (myfollowList) {
                $(".c_list").children().remove();
                for (var i = 0; i < myfollowList.length; i ++){
                    var userId = myfollowList[i].userId;
                }
            }
        });
        updateFollowCount();
        updateFansCount();
    }
//显示我的微博数量
    function showMyBlogCount() {
        $.ajax({
            url:"/ShowBlogInfo?method=showMyBlogCount",
            type:"post",
            data:{"userId":userId},
            dataType:"json",
            success:function (result) {
                $(".c_content_right1 strong").text(result);
            }
        });
    }
//显示粉丝数量
function updateFansCount() {
    $.ajax({
        async:false,
        url:"/ShowFans?method=showMyFansCount",
        type:"post",
        data:{"userId":userId},
        dataType:"json",
        success:function (result) {
            $("#c_str2").text(result);
        }
    });
}
//显示关注数量
function updateFollowCount(){
    $.ajax({
        async:false,
        url:"/ShowFans?method=showMyFollowCount",
        type:"post",
        data:{"userId":userId},
        dataType:"json",
        success:function (result) {
            $("#c_str1").text(result);
        }
    });
}
//判断头部是否关注
function showTopIfFollow(){
    $.ajax({
        async:false,
        url:"/ShowFans?method=showTopIfFollow",
        data:{"nowId":currentUserId},
        dataType:"text",
        type:"post",
        success:function (res) {
            if (res == "true") {
                $(".guanzhu").css("background-color","#696e78").html("✔已关注");
                topinfo = 1;
            }else {
                $(".guanzhu").css("background-color","#fa7d3c").html("<strong>+</strong> 关注");
                topinfo = 0;
            }
            return topinfo;
        }
    });
}

//显示粉丝列表
function showFansList() {
    $.ajax({
        async:false,
        url:"/ShowFans?method=showMyFansInfo",
        type:"post",
        data:{"num":num},
        dataType:"json",
        success:function (myfansList) {
            $(".c_list").children().remove();
            for (var i = 0; i < myfansList.length; i ++){
                var userId = myfansList[i].userId;
                if(flag==1){
                    var $node = $(' <a class="c_list_a"><img src="'+myfansList[i].headP+'" id="'+userId+'"><span class="c_list_name">'+myfansList[i].userName+'</span><span class="c_list_span" name="'+userId+'"><strong>+</strong> 关注</span></a>')
                }else{
                    var $node = $(' <a class="c_list_a"><img src="'+myfansList[i].headP+'" id="'+userId+'"><span class="c_list_name">'+myfansList[i].userName+'</span></a>')
                }
                $.ajax({
                    url:"/ShowFans?method=showIfFollow",
                    type:"post",
                    async: false,
                    data:{"fansId":userId},
                    dataType:"text",
                    success:function (result) {
                        if (result == "true"){
                            $($node).children("span").eq(1).html("✔已关注").css("background-color","rgb(232, 232, 232)");
                        }
                    }
                });
                $(".c_list").append($node);
            }
            rsCount = $("#c_str2").text();
        }
    });
}
    //粉丝上下页
    $("#prev").click(function () {
        num = num > 1 ? -- num : num;
        $(".c_list").children().remove();
        showFansList();
        $("#c_fans").text(num);
    })
    $("#next").click(function () {
        maxPage = Math.ceil(rsCount / pageSize);
        num = num < maxPage ? ++ num : maxPage;
        $(".c_list").children().remove();
        showFansList();
        $("#c_fans").text(num);
    })

//显示关注列表
function showFollowList() {
    $.ajax({
        url:"/ShowFans?method=showMyFollowInfo",
        type:"post",
        data:{"num":num1},
        dataType:"json",
        success:function (myfollowList) {
            $(".c_list").children().remove();
            for (var i = 0; i < myfollowList.length; i ++){
                var userId = myfollowList[i].userId;
                if(flag==1){
                    var $node = $(' <a class="c_list_a"><img src="'+myfollowList[i].headP+'" id="'+myfollowList[i].userId+'"><span class="c_list_name">'+myfollowList[i].userName+'</span><span class="c_list_span" name="'+userId+'"><strong>+</strong> 关注</span></a>')
                }else{
                    var $node = $(' <a class="c_list_a"><img src="'+myfollowList[i].headP+'" id="'+myfollowList[i].userId+'"><span class="c_list_name">'+myfollowList[i].userName+'</span></a>')
                }

                $.ajax({
                    url:"/ShowFans?method=showIfFollow",
                    type:"post",
                    async: false,
                    data:{"fansId":userId},
                    dataType:"text",
                    success:function (result) {
                        if (result == "true"){
                            $($node).children("span").eq(1).html("✔已关注").css("background-color","rgb(232, 232, 232)");
                        }
                    }
                });
                $(".c_list").append($node);
            }
            rsCount1 = $("#c_str1").text();
        }
    });
}
//关注上下页
    $("#prev1").click(function () {
        num1 = num1 > 1 ? -- num1 : num1;
        $(".c_list").children().remove();
        showFollowList();
        $("#c_follow").text(num1);
    })
    $("#next1").click(function () {
        maxPage1 = Math.ceil(rsCount1 / pageSize);
        num1 = num1 < maxPage1 ? ++ num1 : maxPage1;
        $(".c_list").children().remove();
        showFollowList();
        $("#c_follow").text(num1);
    })

//显示自己微博
function showMyBlogInfo() {
        $(".c_content_right2").empty();
        showContent("/ShowBlogInfo?method=showMyBlogInfo",$(".c_content_right2"),1);
   /* $.ajax({
        url:"/ShowBlogInfo?method=showMyBlogInfo",
        type:"post",
        dataType:"json",
        success:function (bloglist) {

            for (var i = 0; i < bloglist.length; i ++){
                var $node = $('<div class="c_content">'+
                    '<div class="c_content_top" >'+
                    '<img src="'+userhead+'">'+
                    '<div class="c_content_name"><a>'+username+'</a><i class="layui-icon layui-icon-close c_blog_del" id="'+bloglist[i].blogId+'"></i></div>'+
                    '<div class="c_content_date"><a>'+bloglist[i].sendDate+'</a><a><!--<i class="layui-icon layui-icon-location"></i>--><span></span></a></div>'+
                    '</div> <div class="c_content_content">'+bloglist[i].context+'</div>'+
                    '<div class="c_content_img"> <ul>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '<li><img src="../images/head.jpg"></li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="c_content_bottom">'+
                    '<a><i class="layui-icon layui-icon-release" style="font-size: 20px"></i><span>6</span></a>'+
                    '<a><i class="layui-icon layui-icon-reply-fill" style="font-size: 20px"></i><span>66</span></a>'+
                    '<a><i class="layui-icon layui-icon-praise" style="font-size: 20px"></i><span>666</span></a>'+
                    '</div>'+
                    '</div>');
                $(".c_content_right2").append($node);
            }
        }
    });*/
}
//显示搜索微博
function showSearchBlog() {
    $(".c_content_right2").empty();
    showContent("/ShowBlogInfo?method=showSearchBlog",$(".c_content_right2"),2);
    // $.ajax({
    //     url:"/ShowBlogInfo?method=showSearchBlog",
    //     type:"post",
    //     data:{"key":key},
    //     dataType:"json",
    //     success:function (bloglist) {
    //         $(".c_content_right2").children().remove();
    //         if (bloglist.length == 0) layer.msg("无符合内容的微博！")
    //         else layer.msg("查询成功！共"+bloglist.length+"条");
    //         for (var i = 0; i < bloglist.length; i ++){
    //             var $node = $('<div class="c_content">'+
    //                 '<div class="c_content_top" >'+
    //                 '<img src="'+userhead+'">'+
    //                 '<div class="c_content_name"><a>'+username+'</a><i class="layui-icon layui-icon-close c_blog_del" id="'+bloglist[i].blogId+'"></i></div>'+
    //                 '<div class="c_content_date"><a>'+bloglist[i].sendDate+'</a><a><i class="layui-icon layui-icon-location"></i><span>天津</span></a></div>'+
    //                 '</div> <div class="c_content_content">'+bloglist[i].context+'</div>'+
    //                 '<div class="c_content_img"> <ul>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '<li><img src="../images/head.jpg"></li>'+
    //                 '</ul>'+
    //                 '</div>'+
    //                 '<div class="c_content_bottom">'+
    //                 '<a><i class="layui-icon layui-icon-release" style="font-size: 20px"></i><span>6</span></a>'+
    //                 '<a><i class="layui-icon layui-icon-reply-fill" style="font-size: 20px"></i><span>66</span></a>'+
    //                 '<a><i class="layui-icon layui-icon-praise" style="font-size: 20px"></i><span>666</span></a>'+
    //                 '</div>'+
    //                 '</div>');
    //             $(".c_content_right2").append($node);
    //         }
    //         $(".c_search").val("");
    //     }
    // });
}
//显示用户所有信息
    function showUserInfo() {
        $.ajax({
            url:"/SShowUserInfoServlet",
            type:"post",
            data:{"userId":userId},
            dataType:"json",
            success:function (userInfoList) {
                for(var i=0;i<userInfoList.length;i++){
                    for(var key in userInfoList[i]){
                        if (userInfoList[i][key].length == 0)
                            userInfoList[i][key] = "此项暂无信息";
                    }
                }
                $(".layui-table tr th:eq(1)").text(userInfoList[0].userName);
                $(".layui-table tbody tr:eq(0) td:eq(1)").text(userInfoList[0].telNum);
                $(".layui-table tbody tr:eq(1) td:eq(1)").text(userInfoList[0].email);
                $(".layui-table tbody tr:eq(2) td:eq(1)").text(userInfoList[0].sex);
                $(".layui-table tbody tr:eq(3) td:eq(1)").text(userInfoList[0].school);
                $(".layui-table tbody tr:eq(4) td:eq(1)").text(userInfoList[0].regDate);
                $(".layui-table tbody tr:eq(5) td:eq(1)").text(userInfoList[0].sign);
                $(".layui-table tbody tr:eq(6) td:eq(1)").text(userInfoList[0].birthday);
                $(".layui-table tbody tr:eq(7) td:eq(1)").text(userInfoList[0].address);
            }
        });
    }

    /////////////////////////////////////////////////////////////
    function showContent(url,node,mytype) {
        //滑轮滚动事件
        var pages = 0;
        $.ajax({
            url: url,
            type:"post",
            data:{"page":pages,"key":key,"userId":userId},
            dataType:"json",
            success:function (userblog) {
                if(mytype == 2){
                            if (userblog.length == 0) layer.msg("无符合内容的微博！");
                            else layer.msg("查询成功！共"+userblog.length+"条");
                }
                // alert(userblog.length);
                var $mynode;
                // alert((userblog[0].blogPic == ""));
                // var mypage = 5;
                // var mypages = Math.floor(userblog.length/5);
                for (var i = 0; i < userblog.length; i++) {
                    $mynode = $node.clone(true);
                    var $newnode;
                    // i = (page-1)*5 + j;
                    if(userblog[i].blogPic != ""){
                        var patt1=new RegExp("\\w+(?:\\.jpg|\\.png)","g");
                        // var reg = /\w+(?:\.jpg|\.png)/;
                        // var pic = patt1.exec(userblog[i].blogPic);
                        var pic = "";
                        do
                        {
                            result=patt1.exec(userblog[i].blogPic);
                            if(result != null){
                                pic = pic + '<img src="../upload/'+result+'" alt="">';
                            }
                        }
                        while (result!=null)
                        $.ajax({
                            async: false,
                            url: "/SShowNumServlet",
                            type:"post",
                            data:{"blogId":userblog[i].blogId},
                            dataType:"json",
                            success:function (Num) {
                                $newnode = '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i><span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'<br>'+pic+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                            }
                        })
                    }else if(userblog[i].blogVideo != ""){
                        $.ajax({
                            async: false,
                            url: "/SShowNumServlet",
                            type:"post",
                            data:{"blogId":userblog[i].blogId},
                            dataType:"json",
                            success:function (Num) {
                                $newnode = '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i> <span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'<br>'+'<video src="../upload/'+userblog[i].blogVideo+'" controls="controls"> your browser does not support the video tag </video>'+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                            }
                        })
                    }else if(userblog[i].blogPic == "" && userblog[i].blogVideo == "" && userblog[i].context != ""){
                        $.ajax({
                            async: false,
                            url: "/SShowNumServlet",
                            type:"post",
                            data:{"blogId":userblog[i].blogId},
                            dataType:"json",
                            success:function (Num) {
                                // alert(Num[0].comNum);
                                $newnode= '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a> <i class="layui-icon layui-icon-close c_blog_del"></i><span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                                // praise(userblog[i].blogId,$($newnode).siblings(".s_body_content_func").children().eq(2).children().eq(0),"/SPraiseShow");
                            }
                        })
                    }
                    $mynode.attr("blogId",userblog[i].blogId);
                    $mynode.prepend($newnode);
                    praise(userblog[i].blogId,$mynode.children().eq(2).children().eq(2).children().eq(0),"/SPraiseShow");
                    // alert($mynode.children().eq(0).children().eq(1).children().eq(1).html())
                    if(userId != from_userId){
                        $mynode.children().eq(0).children().eq(1).children().eq(1).remove();
                    }
                    $(node).append($mynode);
                }
                if(userblog.length < 5){
                    $(window).off('scroll');
                    pages = 0;
                    $(node).append('<div class="s_xinxijiazaitishi">没有更多了</div>');
                }
            }
        });
        pages = pages + 5;
        $(window).scroll(function () {
            // var now_height = $(window).scrollTop();
            // var now_window = $(window).height();
            // var now_document = $(document).height();
            // alert(now_height);
            var bot = 180;
            if ((bot + $(window).scrollTop()) > ($(document).height() - $(window).height()) + 50) {
                $.ajax({
                    url: url,
                    type:"post",
                    data:{"page":pages,"userId":userId},
                    dataType:"json",
                    success:function (userblog) {
                        // alert(userblog.length);
                        var $mynode;
                        // alert((userblog[0].blogPic == ""));
                        // var mypage = 5;
                        // var mypages = Math.floor(userblog.length/5);
                        for (var i = 0; i < userblog.length; i++) {
                            $mynode = $node.clone(true);
                            var $newnode;
                            // i = (page-1)*5 + j;
                            if(userblog[i].blogPic != ""){
                                var patt1=new RegExp("\\w+(?:\\.jpg|\\.png)","g");
                                // var reg = /\w+(?:\.jpg|\.png)/;
                                // var pic = patt1.exec(userblog[i].blogPic);
                                var pic = "";
                                do
                                {
                                    result=patt1.exec(userblog[i].blogPic);
                                    if(result != null){
                                        pic = pic + '<img src="../upload/'+result+'" alt="">';
                                    }
                                }
                                while (result!=null)
                                $.ajax({
                                    async: false,
                                    url: "/SShowNumServlet",
                                    type:"post",
                                    data:{"blogId":userblog[i].blogId},
                                    dataType:"json",
                                    success:function (Num) {
                                        $newnode = '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i> <span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'<br>'+pic+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                                    }
                                })
                            }else if(userblog[i].blogVideo != ""){
                                $.ajax({
                                    async: false,
                                    url: "/SShowNumServlet",
                                    type:"post",
                                    data:{"blogId":userblog[i].blogId},
                                    dataType:"json",
                                    success:function (Num) {
                                        $newnode = '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i> <span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'<br>'+'<video src="../upload/'+userblog[i].blogVideo+'" controls="controls"> your browser does not support the video tag </video>'+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                                    }
                                })
                            }else if(userblog[i].blogPic == "" && userblog[i].blogVideo == "" && userblog[i].context != ""){
                                $.ajax({
                                    async: false,
                                    url: "/SShowNumServlet",
                                    type:"post",
                                    data:{"blogId":userblog[i].blogId},
                                    dataType:"json",
                                    success:function (Num) {
                                        // alert(Num[0].comNum);
                                        $newnode= '<div class="s_body_content_personinfo"> <img src='+userhead+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i> <span>'+userblog[i].sendDate+'</span> </div> </div> <div class="s_body_content_text">'+ userblog[i].context +'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                                        // praise(userblog[i].blogId,$($newnode).siblings(".s_body_content_func").children().eq(2).children().eq(0),"/SPraiseShow");
                                    }
                                })
                            }
                            $mynode.attr("blogId",userblog[i].blogId);
                            $mynode.prepend($newnode);
                            praise(userblog[i].blogId,$mynode.children().eq(2).children().eq(2).children().eq(0),"/SPraiseShow");
                            if(userId != from_userId){
                                $mynode.children().eq(0).children().eq(1).children().eq(1).remove();
                            }
                            $(node).append($mynode);
                        }
                        if(userblog.length < 5){
                            $(window).off('scroll');
                            pages = 0;
                            $(node).append('<div class="s_xinxijiazaitishi">没有更多了</div>');
                        }
                    }
                });
                pages = pages + 5;
            }
        });
    }
    /////////////////////////////////////////
});
layui.use(['layer','element'], function(){
    var layer = layui.layer,
        element = layui.element;
});



//////////////////////////////////////////////////////////

function add0(m){return m<10?'0'+m:m }
function format(timestamp)
{
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况

    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
}

//点赞
function praise(t,$praisenode,praurl) {
    $.ajax({
        async: false,
        url:praurl,
        type:"post",
        data:{"praise":t}, //t:blogId
        dataType:"text",
        success:function (ret) {
            if(ret==0){
                $praisenode.css("color","red");
            }else {
                $praisenode.css("color","black");
            }
        }
    });
}
//点赞加减
function praise_ud(t,$praisenode,praurl) {
    $.ajax({
        async: false,
        url:praurl,
        type:"post",
        data:{"praise":t}, //t:blogId
        dataType:"text",
        success:function (ret) {
            if(ret==0){
                $praisenode.css("color","red");
                var i = parseInt($praisenode.next().text()) + 1;
                $praisenode.next().text(i);
            }else {
                $praisenode.css("color","black");
                var i = parseInt($praisenode.next().text()) - 1;
                $praisenode.next().text(i);
            }
        }
    });
}