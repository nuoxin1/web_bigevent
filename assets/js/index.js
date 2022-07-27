$(function () {
    // 调用获取用户基本信息
    getUserInfo()
})

// 退出登录操作
//eg1
let layer = layui.layer
$('#btnlogout').on('click', function () {

    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something

        layer.close(index);
        location.href = '/home/login.html'
    });

})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        // url: 'http://www.liulongbin.top:3007/my/userinfo ',
        url: '/my/userinfo ',
        method: 'GET',
        // headers就是请求配置对象
        headers: {
            // 从本地储存的getItem()方法,找到token,如果拿到了。就返回，没有拿到就反回为空
            // Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.msg('获取用户信息失败')

            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        complete: function (res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }



    })
}
// 渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像 attr(属性名，属性值)设置属性
        $('.layui-nav-img').attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()

    } else {
        // 3.2渲染文本头像 toUpperCase()方法转成大写的 name[0]就是第一个
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
            .show()
    }
}