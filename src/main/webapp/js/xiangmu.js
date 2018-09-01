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
    //展示用户信息
    $.ajax({
        url: "/ShowInformation",
        type: "post",
        // date:"telNumber"
        dateType: "json",
        success:function(res){
            alert(res[0].userName);
            // $('input[name="nickName"]').text(res[0].nickName);
            // $('input[name="telNumber"]').text(res[0].telNumber);
            // $('input[name="email"]').text(res[0].email);
            // $('input[name="sex"]').text(res[0].sex);
            // $('input[name="school"]').text(res[0].school);
            // // $('input[name="regTime"]').text(res[0].regTime);
            // $('input[name="sign"]').text(res[0].sign);
            // // $('input[name="birthday"]').text(res[0].birthday);
            // $('input[name="address"]').text(res[0].address);


        }
    })

    $('.y_headp_chance').fileupload({
        url: "/UploadFile",
        Type: 'POST',//请求方式 ，可以选择POST，PUT或者PATCH,默认POST
        dataType: 'json',//服务器返回的数据类型
        // singleFileUploads: false,//不设置多个文件循环提交，设置后一起提交

        //add函数为选择文件后执行的操作
        add: function (e, data) {
            //获取图片路径并显示预览
            var url = getUrl(data.files[0]);

            $(".y_headp").prop("src", url)

        },
        //done函数为上传成功后执行的操作
        done: function (e, ret) {
            if (ret.result.errno == 0) {
                // 显示上传成功，并循环输出上传内容预览。
                $(".y_headback").append("<div>上传成功:" + ret.result.data + "</div>");
                $.each(ret.result.data, function (index, fileSrc) {
                    $(".y_headback").append("<div style='margin-top:10px;'><embed src=" +
                        fileSrc + " allowscriptaccess='always' " +
                        "allowfullscreen='true' wmode='opaque' width='280' height='200'>" +
                        "</embed></div>");
                });
            } else {
                alert("上传失败");
            }

        },

        // //此方法控制进度条
        // progressall: function (e, data) {
        //     var progress = parseInt(data.loaded / data.total * 100, 10);
        //     $('#progress .bar').css(
        //         'width',
        //         progress + '%'
        //     );
        // },
        //dropZone: $('#dropzone') //此为拖拽文件控制，暂未开发。
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
