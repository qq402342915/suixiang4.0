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
        elem: '#s_picture,#s_video' //绑定元素
        ,url: '/upload/' //上传接口
        ,done: function(res){
            //上传完毕回调
        }
        ,error: function(){
            //请求异常回调
        }
    });
})
// layui.use('element', function(){
//     var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
//     // element.init();
//     //监听导航点击
//     element.on('nav', function(elem){
//         // $("#LAY_demo1").show();
//         console.log(elem);
//     });
// });
$(function () {
    // $("#LAY_demo1").hide();
        $("#s_publish_test").emoji({
            button:"#s_emoji",
            showTab: true,
            animation: 'fade',
            basePath: '../images/emoji',
            icons: emojiLists   // 注：详见 js/emoji.list.js
        });
    $('.fileupload').fileupload({
        url: "/uploadFile",
        Type: 'POST',//请求方式 ，可以选择POST，PUT或者PATCH,默认POST
        dataType: 'json',//服务器返回的数据类型
        // singleFileUploads: false,//不设置多个文件循环提交，设置后一起提交

        //add函数为选择文件后执行的操作
        add: function (e, data) {
            //获取图片路径并显示预览
            var url = getUrl(data.files[0]);
            var $img = $("<img>").attr("src", url).css("width","50px")
            $("#image").append($img);
            //绑定上传提交事件
            $("#s_picture").click(function () {
                data.submit();
            });
        },
        //done函数为上传成功后执行的操作
        done: function (e, ret) {
            if (ret.result.errno == 0) {
                // 显示上传成功，并循环输出上传内容预览。
                $(".preview").append("<div>上传成功:" + ret.result.data + "</div>");
                $.each(ret.result.data, function (index, fileSrc) {
                    $(".preview").append("<div style='margin-top:10px;'><embed src=" +
                        fileSrc + " allowscriptaccess='always' " +
                        "allowfullscreen='true' wmode='opaque' width='280' height='200'>" +
                        "</embed></div>");
                });
            } else {
                alert("上传失败");
            }

        },

        //此方法控制进度条
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },

        //dropZone: $('#dropzone') //此为拖拽文件控制，暂未开发。
    });


})

//获取图片地址
function getUrl(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

layui.use(['element','layer'], function() {
    var layer = layui.layer //表格
        ,element = layui.element //元素操作

    // element.on('tab(content)', function(data){
    //
    // });
})