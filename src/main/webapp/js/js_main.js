layui.use(['flow','upload',"layer","element"], function() {
    var flow = layui.flow,
        upload = layui.upload,
        layer = layui.layer,
        element = layui.element;
    //发布的内容
    var s_photo;
    var s_video;
    var s_text;
    //执行实例
    var uploadInst = upload.render({
        elem: '#s_picture',      //绑定元素
        url: "/uploadFile", //上传接口
        accept:'images',
        auto: false, //选择文件后不自动上传
        multiple: true, //允许多文件上传
        drag:true,
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
                $('.preview_div').append('<div class="image-container" id="container'+index+'"><div class="delete-css"></div>' +
                    '<img id="showImg'+index+'" style="width: 150px; margin:4px;cursor:pointer;float: left"src="' + result + '" alt="' + file.name + '"><button id="upload_img_'+index+'" class="layui-btn layui-btn-danger layui-btn-xs" style="float: left">✖</button></div>');
                //删除某图片
                $("#upload_img_" + index).click(function () {
                    delete files[index];
                    $("#container"+index).remove();
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

        done: function(res, index, upload){
            alert("上传成功");
            s_photo = res.data;
            layer.closeAll('loading'); //关闭loading
            $('.preview_div').children().remove();
        },
        error: function(index, upload){
            layer.open({
                type: 1
                ,offset: auto
                ,id: 'layerDemo'+type //防止重复弹出
                ,content: '<div style="padding: 20px 100px;">'+ text +'</div>'
                ,btn: '知道啦'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0 //不显示遮罩
                ,yes: function(){
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
        multiple: false,
        auto: true,
        drag:true,
        dataType: 'json',
        choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>&nbsp;&nbsp;&nbsp;'+ (file.size/1014).toFixed(1) +'kb</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-normal video_publish">上传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    ,'</td>'
                    ,'<td><button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button></td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                $(".preview_div").append(tr);
            });
        }
        ,done: function(res, index, upload){
            if(res.errno == 0){ //上传成功
                s_video = res.data;
                setTimeout( "$('.preview_div').children().remove()",3000);
                var tr = $(".preview_div").find('tr#upload-'+ index)
                    ,tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = $(".preview_div").find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });




$(function () {

    //登录标志
    var login_flag = 0;
    //转发
    $(".s_mynode").on("click",".s_body_content_func_1",function () {
        if(login_flag == 0){
            layer.msg("请先登录");
        }else {
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
                            $("#LAY_demo1").empty();
                            showContent("/ShowHotBlog","#LAY_demo1");
                        }
                    }
                })
            })
        }
    });
    //发表评论
    $(".s_comment_publish_push").click(function () {
        if(login_flag == 0){
            layer.msg("请先登录");
        }else{
            var $node_push = $(this);
            var $node_text = $node_push.parent().prev().children(".s_comment_publish_text");
            var $node = $node_push.closest(".s_comment_publish");
            // alert($node_text.val());
            // alert($node_push.parents(".s_comment").prev().children(".s_body_content_func_2").children("span").html())
            $.ajax({
                url: "/SInsertComment",
                type:"post",
                data:{"userId":$(".s_body").attr("userId"),"blogId":$node_push.closest("li").attr("blogId"),"comContent":$node_text.val()},
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
        }
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
        if(login_flag == 0){
            layer.msg("请先登录");
        }else{
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
        }
    })
    //点赞
    $(".s_mynode").on("click",".s_body_content_func_3",function (e) {
        if(login_flag == 0){
            layer.msg("请先登录");
        }else{
            $su = $(this).closest("li");
            var t =$su.attr("blogid");
            $su1 = $(this).children().eq(0);
            praise_ud(t,$su1,"/SPraiseServlet");
        }
    });
    var $node = $(".s_mynode").detach();
function showContent(url,node) {
    //滑轮滚动事件
    var pages = 0;
    $.ajax({
        url: url,
        type:"post",
        data:{"page":pages},
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
                            pic = pic + '<img src="../images/'+result+'" alt="">';
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
                            $newnode = '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span><br>'+pic+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
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
                            $newnode = '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span><br>'+'<video src="../upload/'+userblog[i].blogVideo+'" controls="controls"> your browser does not support the video tag </video>'+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
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
                            $newnode= '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span></div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                            // praise(userblog[i].blogId,$($newnode).siblings(".s_body_content_func").children().eq(2).children().eq(0),"/SPraiseShow");
                        }
                    })
                }
                $mynode.attr("blogId",userblog[i].blogId);
                $mynode.prepend($newnode);
                praise(userblog[i].blogId,$mynode.children().eq(2).children().eq(2).children().eq(0),"/SPraiseShow");
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
                data:{"page":pages},
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
                                    pic = pic + '<img src="../images/'+result+'" alt="">';
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
                                    $newnode = '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span><br>'+pic+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
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
                                    $newnode = '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span><br>'+'<video src="../upload/'+userblog[i].blogVideo+'" controls="controls"> your browser does not support the video tag </video>'+'</div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
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
                                    $newnode= '<div class="s_body_content_personinfo"> <img src='+userblog[i].headP+' alt=""> <div class="s_body_content_personinfo_nt"> <a href="">'+userblog[i].userName+'</a> <span>'+format(userblog[i].sendDate.time)+'</span> </div> </div> <div class="s_body_content_text"><span class="s_biaoqing">'+ userblog[i].context +'</span></div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>'+Num[0].transNum+'</span></div> <div class="s_body_content_func_2"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>'+Num[0].comNum+'</span></div> <div class="s_body_content_func_3"><i class="layui-icon layui-icon-praise layui-anim" style="font-size: 25px"></i><span>'+Num[0].praNum+'</span></div> </div>';
                                }
                            })
                        }
                        $mynode.attr("blogId",userblog[i].blogId);
                        $mynode.prepend($newnode);
                        praise(userblog[i].blogId,$mynode.children().eq(2).children().eq(2).children().eq(0),"/SPraiseShow");
                        $(node).append($mynode);
                    }
                    if(userblog.length < 5){
                        $(window).off('scroll');
                        $(node).append('<div class="s_xinxijiazaitishi">没有更多了</div>');
                        pages = 0;
                    }
                }
            });
            pages = pages + 5;
        }
    });
}
    showContent("/ShowHotBlog","#LAY_demo1");
    $(".s_biaoqing").emojiParse({
        basePath: 'images/emoji',
        icons: emojiLists   // 注：详见 js/emoji.list.js
    });
    //登录成功后，显示用户信息，关注微博等
    function showUser() {
        $.ajax({
            async:false,
            url:"/ShowMy",
            type:"post",
            data:{"w_tel":$("#w_telId").val()},
            dataType:"json",
            success:function (user) {
                $("#personInfo").attr("userId",user[0].userId);
                $("#s_headphoto_photo").prop("src",user[0].headP);
                $("#s_userName").html(user[0].userName);
                $(".s_body").attr("headP",user[0].headP);
                $(".s_body").attr("userId",user[0].userId);
                $.ajax({
                    async:false,
                    url:"/SGetBgByIdServlet",
                    type:"post",
                    data:{"bgId":user[0].bgId},
                    dataType:"text",
                    success:function (bgPath) {
                        // alert(bgPath);
                        $(".s_main").css("background-image","url(" + bgPath + ")");
                    }
                });
                login_flag = 1;
            }
        })
        // alert($("#personInfo").attr("userId"));
        $("#personInfo").prop("href","personinfo.html?userid="+($("#personInfo").attr("userId")));
        $(".s_headphoto_nologin").hide();
        $(".s_headphoto_login").show();
        $("#s_header_right").show();
        $("#s_body_content_commentgif").click(function () {
            $("#LAY_demo2").empty();
            showContent("/ShowLikeDayBlog","#LAY_demo2");
        });
    }
    //发布功能
    // $("#s_publish_test").
    $("#publish").click(function () {
        if(login_flag == 0){
            layer.msg("请先登录");
        }else{
            $.ajax({
                url:"/PublishBlogServlet",
                type:"post",
                data:{"s_photo":s_photo,"s_text":$("#s_publish_test").val(),"s_video":s_video},
                success:function (result) {
                    $("#s_publish_test").val("");
                    // var $newnode;
                    //
                    // var $mynode = $node.clone(true);
                    // $mynode.append($newnode);
                    // $("#LAY_demo2").append($mynode);
                }
            })
        }
    })
    // $("#LAY_demo1").hide();
    $.ajax({
        url:"/ShowMy",
        dataType:"json",
        success:function (result) {
            // alert(result[0]);
            // alert(result.userName);
            if(result[0].userName != null){
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
                            showUser();
                        }else if(res=="false"){
                            $("#w_wrongInfo span").text("您输入的用户名或密码不正确");
                            $("#w_wrongInfo span").css("display","inline-block");
                        }else if(res=="codeFalse"){
                            $("#w_wrongInfo span").text("验证码错误");
                            $("#w_wrongInfo span").css("display","inline-block");
                        }else {

                            // layer.msg("您因被举报锁定三个小时");
                            //显示剩余时间
                            $.ajax({
                                url:"/UserGetLockServlet",
                                data:{"telNum":$("#w_telId").val()},
                                type:"post",
                                dataType:"json",
                                success:function (res) {
                                    // var $content=$("<span id='w_hour'></span><span>时</span><span id='w_min'></span><span>分</span><span id='w_sec'></span><span>秒</span>")
                                    layer.open({
                                        type: 1 //Page层类型
                                        ,area: ['500px', '200px']
                                        ,title: '你已被举报'
                                        ,shade: 0.6 //遮罩透明度
                                        ,maxmin: true //允许全屏最小化
                                        ,anim: 1 //0-6的动画形式，-1不开启
                                        ,content: '<div style="padding:50px;"><span>剩余时间:</span><span id="w_hour"></span><span>时</span><span id="w_min"></span><span>分</span><span id="w_sec"></span><span>秒</span></div>'
                                    });
                                    var lockDate;
                                    $.each(res,function (index,obj) {
                                        //得到锁定时间
                                        lockDate=obj['lockDate'];

                                    });
                                    var lock = new Date(lockDate.replace(/-/g, "/"));
                                    var hour;
                                    var min;
                                    var sec;
                                    var nd = 1000 * 24 * 60 * 60;
                                    var nh = 1000 * 60 * 60;
                                    var nm = 1000 * 60;
                                    var ns = 1000;
                                    setInterval(function () {
                                        var currentDate = new Date();
                                        //得到相同的秒数
                                        var diff=currentDate.getTime()-lock.getTime();
                                        hour = Math.floor(3-diff % nd / nh);
                                        min =  Math.floor(59-diff % nd % nh / nm);
                                        sec =  Math.floor(59-diff % nd % nh % nm / ns);
                                        $("#w_hour").text(hour);
                                        $("#w_min").text(min);
                                        $("#w_sec").text(sec);


                                    },1000);




                                }
                            });
                        }
                    }

                });
            }


        });

    });
    //注册
    $("#s_register").click(function () {
        window.location.href="su_register.html";
    });
    //表情
    $("#s_publish_test").emoji({
        button:"#s_emoji",
        showTab: true,
        animation: 'fade',
        basePath: '../images/emoji',
        icons: emojiLists   // 注：详见 js/emoji.list.js
    });
    //表情解析

    //退出登录
    $("#s_quit").click(function () {
        $.ajax({
            url:"/SQuit",
            type:"post",
            dataType:"text",
            success:function (quit) {
                login_flag = 0;
            }
        });
    });
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
    //推荐关注
    // alert($("#y_a1").text())
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
            if(login_flag == 0){
                layer.msg("请先登录");
            }else{
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
        }
    )
    $("#y_change").click(function () {
        if(login_flag == 0){
            layer.msg("请先登录");
        }else{
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
        }
    });
 });
});
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