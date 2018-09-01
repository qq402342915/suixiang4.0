

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
        $('.y_person_image').css("background-color","cornflowerblue")

        $('.y_head').show()
        $('.y_head_img').css("background-color","#87c4db")

    })

    $(".y_person_image").click(function () {
        $('#inform').show()
        $('.y_person_image').css("background-color","#87c4db")

        $('.y_head').hide()
        $('.y_head_img').css("background-color","cornflowerblue")

    })

    layui.use('laydate', function(){
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
            email: {
                required: true,
                regex: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
            },
            school: {
                required: true,
                maxlength: 10,
                regex: "^[\u4e00-\u9fa5a-zA-Z]+$"
            },
            sign: {
                required: true,
                maxlength: 50,

            },
            address: {
                required: true,
                maxlength: 19,
                regex: "^[\u4e00-\u9fa5a-zA-Z]+$"
            },
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



})
