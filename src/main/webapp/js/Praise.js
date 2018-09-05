$(function () {
    $(".s_mynode").on("click",".s_body_content_func_3",function (e) {
        $su = $(this).closest("li");
        var t =$su.attr("blogid");
        $su1 = $(this);
        $.ajax({
            url:"/SPraiseServlet",
            type:"post",
            data:{"praise":t},
            dataType:"text",
            success:function (ret) {
                if(ret==1){
                    $su1.css("color","red");
                }else {
                    $su1.css("color","black");
                }
            }
        });
    });
})
