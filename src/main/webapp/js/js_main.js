layui.use('flow', function() {
    var flow = layui.flow;

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

})

layui.use(['element','layer'], function() {
    var layer = layui.layer //表格
        ,element = layui.element //元素操作

    // element.on('tab(content)', function(data){
    //
    // });
})