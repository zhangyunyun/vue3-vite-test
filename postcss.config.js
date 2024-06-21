module.exports = {
    plugins: {
        'autoprefixer': {
            // 配置要兼容到的环境信息
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
            rootValue: 16, //根节点的font-size值, 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ['*'], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            selectorBlackList: [':root'] //str/reg指定不转换的选择器，str时包含字段即匹配
        }
    }
}