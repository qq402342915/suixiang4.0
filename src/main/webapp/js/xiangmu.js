$(function () {

    // jQuery.validator.addMethod("regex", //addMethod第1个参数:方法名称
    // function (value, element, params)
    // {//addMethod第2个参数:验证方法，
    //     //验证方法参数（被验证元素的值，被验证元素，参数）
    //     var exp = new RegExp(params);//实例化正则对象，参数为用户传入的正则表达式
    //     return exp.test(value);//测试是否匹配
    // },
    // "格式错误");
    $(".y_head_img").click(function () {
        $('#inform').hide()
        $('.y_person_image').css("background-color", "cornflowerblue")

        $('.y_head').show()
        $('.y_head_img').css("background-color", "#87c4db")

    })

    $(".y_person_image").click(function () {
        $('#inform').show()
        $('.y_person_image').css("background-color", "#87c4db")

        $('.y_head').hide()
        $('.y_head_img').css("background-color", "cornflowerblue")

    })

    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#test1' //指定元素
        });
    });

    $(".layui-form").validate({
        rules: {
            nickName: {
                required: true,
                maxlength: 10,
                regex: "^[\u4e00-\u9fa5a-zA-Z0-9]+$"
            },
            telNumber: {
                required: true,
                minlength: 11,
                maxlength: 11,
                regex: "^1[3|4|5|7|8][0-9][0-9]{8}$",
            },
            // email: {
            //     required: true,
            //     regex: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
            // },
            // school: {
            //     required: true,
            //     maxlength: 10,
            //     regex: "^[\u4e00-\u9fa5a-zA-Z]+$"
            // },
            // sign: {
            //     required: true,
            //     maxlength: 50,
            //
            // },
            // address: {
            //     required: true,
            //     maxlength: 19,
            //     regex: "^[\u4e00-\u9fa5a-zA-Z]+$"
            // },
        },
        messages: {
            nickName: {
                required: "请输入昵称",
                maxlength: "昵称小于十个字",
                regex: "只能输入中文，英文，数字"
            },

            telNumber: {
                required: "请输入手机号",
                minlength: "输入小于11位",
                maxlength: "输入大于11位",
                regex: "号码输入错误",

            },
            email: {
                required: "请输入邮箱",
                regex: "邮箱格式错误"
            },
            school: {
                required: "请输入学校",
                maxlength: "学校小于十个字",
                regex: "学校名称由中文或英文字母组成"
            },

            sign: {
                required: "请输入签名",
                maxlength: "签名小于五十个字",

            },

            address: {
                required: "请输入地址",
                maxlength: "地址小于十九个字",
                regex: "只能输入中文，英文"
            },

        },

    })

    // //String->Date
    // function getDate(strDate) {
    //     //strDate为需要转换成日期格式的字符串
    //     var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
    //         function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    //     return date;
    // }
   // tlogDate=getDate(tlogDate);

    //展示用户信息
    $.ajax({
        url: "/ShowInformation",
        type: "post",
        // data:"telNumber"
        dataType: "json",
        success:function(res){

            $('input[name="userName"]').val(res[0].userName);
            $('input[name="telNumber"]').val(res[0].telNum);
            $('input[name="email"]').val(res[0].email);
            $('input[name="sex"]').val(res[0].sex);
            $('input[name="school"]').val(res[0].school);
            $('input[name="regDate"]').val(res[0].regDate);
            $('input[name="sign"]').val(res[0].sign);
            $('input[name="birthday"]').val((res[0].birthday).substr(0,10));
            $('input[name="address"]').val(res[0].address);
            $(".y_headp").prop("src", res[0].headP);

        }
    })




//更换头像
    $('.y_headp_chance').fileupload({
        url: "/uploadFile",
        Type: 'POST',//请求方式 ，可以选择POST，PUT或者PATCH,默认POST
        dataType: 'json',//服务器返回的数据类型
        // singleFileUploads: false,//不设置多个文件循环提交，设置后一起提交

        //add函数为选择文件后执行的操作
        add: function (e, data) {
            //获取图片路径并显示预览
            var url = getUrl(data.files[0]);
            $(".y_headp").prop("src", url)
            $(".y_headp_hold").click(function () {
                data.submit();
            });
            // $.ajax({
            //     url:"/UpdateHeadp",
            //     Type:'POST',
            //     // data:"",
            //     dataType:"json",
            //     success:function (ret) {
            //
            //     }
            //
            // })

        },
        //done函数为上传成功后执行的操作
        done: function (e, ret) {
            if (ret.result.errno == 0) {
                // 显示上传成功，并循环输出上传内容预览。
alert("dddd")
            } else {
                alert("上传失败");
            }

        },

    });

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

})
