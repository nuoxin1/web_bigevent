$(function () {
    // 点击“去注册账号”的链接

    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 通过layui中获取form
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()函数自定义验证规则
    form.verify({
        // 自定义一个叫做PWd校检规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校检两次密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码总的内容，
            // 还需要拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败，则
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 绑定提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认行为提交
        e.preventDefault()
        // 
        data = {
            username: $('#form_reg [name= username]').val(),
            password: $('#form_reg [name= password]').val()
        }
        $.post(
            'http://www.liulongbin.top:3007/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功请登录')
                // 模拟点击事件，进行调转到登录页面
                $('#link_login').click()
            }
        )
    })
    // 登录表单的监听事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')

                }

                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                /*   location.href = '/index.html'  这个跳转不过去*/
                location.href = 'http://127.0.0.1:5500/home/index.html'

            }
        })
    })















})
