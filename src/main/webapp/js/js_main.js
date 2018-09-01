layui.use(['flow','upload'], function() {
    var flow = layui.flow,upload = layui.upload;

    flow.load({
        elem: '#LAY_demo1' //流加载容器
        , done: function (page, next) { //执行下一页的回调
            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 8; i++) {
                    lis.push('<li> <div class="s_body_content_personinfo"> <img src="../images/logo.png" alt=""> <div class="s_body_content_personinfo_nt"> <a href="">你不爱吃西红柿</a> <span>2018-08-28 9:30</span> </div> </div> <div class="s_body_content_text"> 6666 <br> 666666 <br> 6666 <br> 666666 <br>  6666 <br> 666666 <br> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> <img src="../images/logo.png" alt=""> </div> <div class="s_body_content_func"> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-release" style="font-size: 25px"></i><span>1</span></div> <div class="s_body_content_func_1"><i class="layui-icon layui-icon-reply-fill" style="font-size: 25px"></i><span>3</span></div> <div><i class="layui-icon layui-icon-praise layui-anim layui-anim-scaleSpring" style="font-size: 25px"></i><span>2</span></div> </div> </li>')
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 10); //假设总页数为 10
            }, 500);
        }
    });


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
                    '<img id="showImg'+index+'" style="width: 150px; margin:4px;cursor:pointer;float: left"src="' + result + '" alt="' + file.name + '"><button id="upload_img_'+index+'" class="layui-btn layui-btn-danger layui-btn-xs" style="float: left">X</button></div>');
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
        multiple: true,
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


})





$(function () {
    // $("#LAY_demo1").hide();
        $("#s_publish_test").emoji({
            button:"#s_emoji",
            showTab: true,
            animation: 'fade',
            basePath: '../images/emoji',
            icons: emojiLists   // 注：详见 js/emoji.list.js
        });
    });



layui.use(['element','layer'], function() {
    var layer = layui.layer //表格
        ,element = layui.element //元素操作

    // element.on('tab(content)', function(data){
    //
    // });
})