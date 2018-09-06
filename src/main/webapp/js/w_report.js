
$(function () {
    //引入layer
    layui.use(["layer"],function () {
        layer = layui.layer;
        //即时显示举报通知
        var flag=-1;
        var timer=null;
        timer= setInterval(function () {
            $.ajax({
                async: false,
               url:"/InformServlet",
               type:"post",
               dataType:"json",
               success:function (res) {
                   $.each(res,function (index,obj) {
                       if(obj['warnDate']!=null){
                           layer.open({
                               type: 1
                               ,offset: 'rb' //具体配置参考：offset参数项
                               ,content: '<div style="padding: 20px 80px;">你已经被举报</div>'
                               ,btn: '关闭全部'
                               ,btnAlign: 'c' //按钮居中
                               ,shade: 0 //不显示遮罩
                               ,yes: function(){
                                   layer.closeAll();
                               }
                           });
                           clearInterval(timer);
                       }

                   });
               }
            });

        },5000);


            // layer.msg("hahha");



    });


});