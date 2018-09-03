jQuery.validator.addMethod("regex", //addMethod第1个参数:方法名称
    function (value, element, params) {//addMethod第2个参数:验证方法，
        //验证方法参数（被验证元素的值，被验证元素，参数）
        var exp = new RegExp(params);//实例化正则对象，参数为用户传入的正则表达式
        return exp.test(value);//测试是否匹配
    }, "格式错误");
$(function () {
    $("#share_register").validate({
        rules: {
            userName: {
                required: true,
                minlength: 2,
                maxlength: 15,
                regex:"^[\u4E00-\u9FA5A-Za-z0-9_]+$"
            },
            phoneNum: {
                required: true,
                minlength: 11,
                maxlength: 11,
                regex: "^1[3|4|5|7|8][0-9][0-9]{8}$",
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 18,
                regex: "^[a-zA-Z][a-zA-Z0-9_]+$"
            },
            repassword: {
                required: true,
                minlength: 6,
                maxlength: 18,
                equalTo: "#kuang3",
                regex: "^[a-zA-Z][a-zA-Z0-9_]+$"
            },
            code:{
                required:true,
                minlength:6,
                regex:"^\\d{6}$"
            },
            agree:{
                required:true
            }
        },
        messages: {
            userName: {
                required: "请输入用户名",
                minlength: "用户名至少2个字母或汉字",
                maxlength: "用户名不得超过15个字母或汉字",
                regex: "请输入正确的用户名"
            },
            phoneNum: {
                required: "请输入您的手机号",
                minlength: "输入号码小于11位",
                maxlength: "输入号码大于11位",
                regex: "请输入正确的手机号！"
            },
            password: {
                required: "请输入你的密码",
                minlength: "密码长度不少于6位",
                maxlength: "密码长度不大于18位",
                regex: "密码格式错误" +
                "密码包括字母，数字或下划线" +
                "密码不能以字母或下划线开头"
            },
            repassword: {
                required: "请输入你的密码",
                minlength: "密码长度不少于6位",
                maxlength: "密码长度不大于18位",
                regex: "密码包括字母，数字或下划线",
                equalTo: "两次密码不一致"
            },
            code:{
                required:"请输入验证码",
                minlength:"验证码长度为6位",
                regex:"验证码必须为6位"
            },
            agree:{
                required:"请同意用户协议"
            }
        },
    });
    $("#l_regstForm").validate({
        rules: {
            l_loginname: {
                required: true,
                minlength: 2,
                maxlength: 15,
                regex:"^[\u4E00-\u9FA5A-Za-z0-9_]+$"
            },
            l_pwd: {
                required: true,
                minlength: 6,
                maxlength: 19,
                regex: "^[a-zA-Z][a-zA-Z0-9_]+$"
            }
        },
        messages: {
            l_loginname: {
                required: "请输入用户名",
                minlength: "用户名至少2个字母或汉字",
                maxlength: "用户名不得超过15个字母或汉字",
                regex: "请输入正确的用户名"
            },
            l_pwd: {
                required: "请输入您的密码",
                minlength: "密码长度至少为6位",
                maxlength: "密码长度不能超过19位",
                regex: "请输入正确的密码"// Start with the letter , the format is (^[a-zA-Z][a-zA-Z0-9_]+$)
            }
        },
        errorElement:"em",
        success:function (input) {
            input.text(" ").addClass("success");
            $("#btn").attr("disabled",false);
        }

    })
});