$(function () {
/*    var url = "http://ip.taobao.com/service/getIpInfo.php?ip=43.247.4.54";
    $.getJSON(url, function(json){
        alert("666")
    });*/



    /*显示用户信息*/
    var userhead;
    var username;
    $.ajax({
        url:"/RepostSession",
        type:"post",
        dataType:"json",
        success:function (user) {
            userhead = user.headP;
            username = user.userName;
            $(".c_head_img").prop("src",user.headP);
            $(".c_top_one_name h2").html(user.userName);
            if(user.sex == '女')  $(".c_top_one_name img").prop("src","../images/woman.png");
            else $(".c_top_one_name img").prop("src","../images/man.png");
            $(".intro").html(user.sign);
            /*$(".c_content_top img").prop("src",user.headP);
            $(".c_content_name a").html("src",user.userName);*/
        }
    });
    //显示我的微博数量
    $.ajax({
        url:"/ShowBlogInfo?method=showMyBlogCount",
        type:"post",
        dataType:"json",
        success:function (result) {
            $(".c_content_right1 strong").text(result);
        }
    });
    //显示我的微博信息
    $.ajax({
        url:"/ShowBlogInfo?method=showMyBlogInfo",
        type:"post",
        dataType:"json",
        success:function (bloglist) {
            for (var i = 0; i < bloglist.length; i ++){
                bloglist[i].sendDate
                var $node = $('<div class="c_content">'+
                    '<div class="c_content_top" >'+
                    '<img src="'+userhead+'">'+
                    '<div class="c_content_name"><a>'+username+'</a><i class="layui-icon layui-icon-close c_blog_del"></i></div>'+
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
    //显示粉丝数量
    $.ajax({
        url:"/ShowFans?method=showMyFansCount",
        type:"post",
        dataType:"json",
        success:function (result) {
             $("#c_str2").text(result);
        }
    });
    //显示关注数量
    $.ajax({
        url:"/ShowFans?method=showMyFollowCount",
        type:"post",
        dataType:"json",
        success:function (result) {
            $("#c_str1").text(result);
        }
    });
    //显示粉丝列表
        $.ajax({
            url:"/ShowFans?method=showMyFansInfo",
            type:"post",
            dataType:"json",
            success:function (myfansList) {
                $(".c_list").children().remove();
                for (var i = 0; i < myfansList.length; i ++){
                    var userId = myfansList[i].userId;
                    var $node = $(' <a class="c_list_a"><img src="'+myfansList[i].headP+'" id="'+userId+'"><span class="c_list_name">'+myfansList[i].userName+'</span><span class="c_list_span" name="'+userId+'"><strong>+</strong> 关注</span></a>')
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


/*    //显示是否关注
    $.ajax({
        url:"/ShowFans?method=showIfFollow",
        type:"post",
        data:{"fansId":$('.c_list_a img').prop("id")},
        dataType:"json",
        success:function (result) {

        }
    });*/

    /*$.ajax({
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
    //点击改变底部border
    $(".c_top_two a").click(function () {
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
            var method = "showMyFollowInfo";
        }else {
            method = "showMyFansInfo"
        }
        $.ajax({
            url:"/ShowFans?method=" + method,
            type:"post",
            dataType:"json",
            success:function (myfdList) {
                $(".c_list").children().remove();
                for (var i = 0; i < myfdList.length; i ++){
                    var userId = myfdList[i].userId;
                    var $node = $(' <a class="c_list_a"><img src="'+myfdList[i].headP+'" id="'+myfdList[i].userId+'"><span class="c_list_name">'+myfdList[i].userName+'</span><span class="c_list_span"><strong>+</strong> 关注</span></a>')
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
        $(this).css("background-color","#e8e8e8");
        $(this).siblings().css("background-color","white");
    });
    //搜索框聚焦
    $(".c_search").focus(function () {
        $(this).val("");
    });
    //搜索框失焦
    $(".c_search").blur(function () {
        $(this).val("搜索我的微博");
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
    //点击刪除箭头弹框
    $(".c_blog_del").click(function () {
        layer.msg('确认要删除这条微博吗？', {
            time: 5000, //5s后自动关闭
            btn: ['确定', '取消']
        });
    })
})
layui.use(['layer','element'], function(){
    var layer = layui.layer,
        element = layui.element;
});
