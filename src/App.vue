<template>
  <div>

    <!--使用header组件-->
    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--路由出口-->
    <!--路由匹配到的组件将渲染在这里-->
    <router-view :seller="seller"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
  // 引入head组件
  import header from './components/header/header.vue';

  const responseSuccessCode = 0;
  export default {
    // data()方法返回当前app.vue组件中要用到的数据
    data() {
      return {
        seller: {}
      };
    },
    // 在vue实例创建的时候调用接口异步获取数据
    /**
     * 这样通过接口就能在父组件的实例中获取到seller的数据
     * 然后传递给子组件
     * 通过在v-bind:name="seller"传递给子组件
     * 然后在子组件中通过props属性接收
     */
    created() {
      this.$http.get('/api/seller').then(response => {
        let responseDatas = response.body;
        if (responseDatas.errno === responseSuccessCode) {
          this.seller = responseDatas.data;
        }
      });
    },
    // 注册header组件
    components: {
      'v-header': header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    /**
    ** 每个组件用到的mixins需要在单独引用
     */
    @import "./common/stylus/mixin.styl"

    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      //border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        a
          display: block
          color: rgb(77, 85, 93)
          font-size 14px
          &.active
            color: rgb(240, 20, 20)


</style>
