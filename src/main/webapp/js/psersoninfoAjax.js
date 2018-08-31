$(function () {
    $.ajax({
        url:"/ShowBlogServlet",
        type:"post",
        dataType:"json",
        success:function (bloglist) {
            for (var i = 0; i < bloglist.length; i ++) {
                var $node = $('<div class="c_content">\n' +
                    '                <div class="c_content_top" >\n' +
                    '                   <img src="../images/head.jpg">\n' +
                    '                   <div class="c_content_name"><a>Hello</a><i class="layui-icon layui-icon-close c_blog_del"></i></div>\n' +
                    '                   <div class="c_content_date"><a>6月6日 06:06</a><a><i class="layui-icon layui-icon-location"></i><span>天津</span></a></div>\n' +
                    '                </div>\n' +
                    '                <div class="c_content_content">66666<br>66666<br>66666<br>66666<br>66666<br></div>\n' +
                    '                <div class="c_content_img">\n' +
                    '                    <ul>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                        <li><img src="../images/head.jpg"></li>\n' +
                    '                    </ul>\n' +
                    '                </div>\n' +
                    '                <div class="c_content_bottom">\n' +
                    '                    <a><i class="layui-icon layui-icon-release" style="font-size: 20px"></i><span>6</span></a>\n' +
                    '                    <a><i class="layui-icon layui-icon-reply-fill" style="font-size: 20px"></i><span>66</span></a>\n' +
                    '                    <a><i class="layui-icon layui-icon-praise" style="font-size: 20px"></i><span>666</span></a>\n' +
                    '                </div>\n' +
                    '            </div>')
            }
        }
    });
})