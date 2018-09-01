$(function () {
    /*显示用户信息*/
    $.ajax({
        url:"/RepostSession",
        type:"post",
        dataType:"json",
        success:function (user) {
            $(".c_head_img").prop("src",user[0].headP);
            $(".c_top_one_name h2").html(user[0].userName);
            if(user[0].sex == '女')  $(".c_top_one_name img").prop("src","../images/woman.png");
            else $(".c_top_one_name img").prop("src","../images/man.png");
            $(".intro").html(user[0].sign);
        }
    });

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
    //点击改变关注，粉丝背景
    $(".c_content_left a").click(function () {
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
layui.use('layer', function(){
    var layer = layui.layer;
});
