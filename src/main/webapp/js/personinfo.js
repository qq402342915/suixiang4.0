var userId;
var userhead;
var username;
var key;
$(function () {


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
            userId = user.userId;
        }
    });
    var flag=-1;
    var currentUserId=window.location.search.substring(8,10);
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
        alert($(".c_list_span").html());
    }
    updateFansCount();
    updateFollowCount();
    showFansList();
    showMyBlogInfo();
    showMyBlogCount();
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
        window.open("../html/personinfo.html?userId="+currentUserId);
    });
    //搜索微博
    $(".c_search_img").click(function () {
        key = $(".c_search").val();
        showSearchBlog();
    })
    //删除微博
    $(".c_content_right2").on('click',".c_blog_del",function () {
        var blogId = $(this).prop("id");
        var $blogdiv = $(this).parents(".c_content");
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
    //点击关注，取关
    $(".guanzhu").click(function () {
        if($(this).css("background-color") == "rgb(250, 125, 60)"){
            $(this).css("background-color","#696e78");
            $(this).html("✔已关注");
        }else {
            $(this).css("background-color","#fa7d3c");
            $(this).html("<strong>+</strong> 关注");
        }
    });
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
        }else {
            showFansList();
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
        $.ajax({
           url:"/ReportUserServlet",
            data:{"userId":userId},
           dataType:"text",
            type:"post",
            success:function (res) {

            }
        });

    });

    //显示粉丝列表
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

    //显示关注列表
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
        url:"/ShowFans?method=showMyFansCount",
        type:"post",
        dataType:"json",
        success:function (result) {
            $("#c_str2").text(result);
        }
    });
}
//显示关注数量
function updateFollowCount(){
    $.ajax({
        url:"/ShowFans?method=showMyFollowCount",
        type:"post",
        data:{"userId":userId},
        dataType:"json",
        success:function (result) {
            $("#c_str1").text(result);
        }
    });
}
//显示粉丝列表
function showFansList() {
    $.ajax({
        url:"/ShowFans?method=showMyFansInfo",
        type:"post",
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
        }
    });
}
//显示关注列表
function showFollowList() {
    $.ajax({
        url:"/ShowFans?method=showMyFollowInfo",
        type:"post",
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
        }
    });
}

//显示自己微博
function showMyBlogInfo() {
    $.ajax({
        url:"/ShowBlogInfo?method=showMyBlogInfo",
        type:"post",
        dataType:"json",
        success:function (bloglist) {

            for (var i = 0; i < bloglist.length; i ++){
                var $node = $('<div class="c_content">'+
                    '<div class="c_content_top" >'+
                    '<img src="'+userhead+'">'+
                    '<div class="c_content_name"><a>'+username+'</a><i class="layui-icon layui-icon-close c_blog_del" id="'+bloglist[i].blogId+'"></i></div>'+
                    '<div class="c_content_date"><a>'+bloglist[i].sendDate+'</a><a><i class="layui-icon layui-icon-location"></i><span>天津</span></a></div>'+
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
    });
}
//显示搜索微博
function showSearchBlog() {
    $.ajax({
        url:"/ShowBlogInfo?method=showSearchBlog",
        type:"post",
        data:{"key":key},
        dataType:"json",
        success:function (bloglist) {
            $(".c_content_right2").children().remove();
            if (bloglist.length == 0) layer.msg("无符合内容的微博！")
            else layer.msg("查询成功！共"+bloglist.length+"条");
            for (var i = 0; i < bloglist.length; i ++){
                var $node = $('<div class="c_content">'+
                    '<div class="c_content_top" >'+
                    '<img src="'+userhead+'">'+
                    '<div class="c_content_name"><a>'+username+'</a><i class="layui-icon layui-icon-close c_blog_del" id="'+bloglist[i].blogId+'"></i></div>'+
                    '<div class="c_content_date"><a>'+bloglist[i].sendDate+'</a><a><i class="layui-icon layui-icon-location"></i><span>天津</span></a></div>'+
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
            $(".c_search").val("");
        }
    });
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
});
layui.use(['layer','element'], function(){
    var layer = layui.layer,
        element = layui.element;
});