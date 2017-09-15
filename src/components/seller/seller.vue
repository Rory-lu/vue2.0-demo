<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <span class="stress">{{seller.minPrice}}</span>元
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    watch: {
      // 监听seller的变化
      'seller' () {
        this.$nextTick(() => {
          this._initScroll();
         // this._initPics();
        });
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
       // this._initPics();
      });
    },
    methods: {
      _initScroll () {
        if (!this.initScroll) {
          this.initScroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.initScroll.refresh();
        }
      },
      _initPics () {
        if (this.seller.pics) {
//          let picWidth = 120;
//          let margin = 6;
//          let width = (picWidth + margin) * this.seller.pics.length - margin;
//          this.$refs.picList.style.width = width + 'px';
//          console.log(width);
//          console.log(this.$refs.picWrapper.style.width);
//          this.$nextTick(() => {
//            if (!this.picScroll) {
//              this.picScroll = new BScroll(this.$refs.picwrapper, {
//                scrollX: true,
//                eventPassthrough: 'vertical'
//              });
//            } else {
//              this.picScroll.refresh();
//            }
//          });
        }
      }
    },
    components: {
      star: star,
      split: split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    left: 0
    bottom: 0
    top: 174px
    overflow: hidden
    .overview
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        color: rgb(77, 85, 93)
        .star
          display: inline-block
          vertical-align: top
          line-height: 10px
          .star-item
            margin-right: 8px
        .text
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 10px
      .remark
        padding-top: 18px
        display: flex
        .block
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          color: rgb(7, 17, 27)
          font-size: 10px
          h2
            line-height: 10px
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
          .stress
            font-size: 24px
            font-weight: 200
            line-height: 24px
          &:last-child
            border-right: none
    .bulletin
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          font-weight: 200
          color: rgb(240, 20, 20)
      .supports
        .support-item
          padding: 16px 12px
          font-size: 0
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.special
              bg-image('special_4')
            &.invoice
              bg-image('invoice_4')
            &.guarantee
              bg-image('guarantee_4')
          .text
            display: inline-block
            vertical-align: top
            line-height: 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
    .pics
      padding: 18px 0 18px 18px
      .title
        line-height: 14px
        margin-bottom: 12px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pic-wrapper
        width: 100%
        white-space: nowrap
        overflow: hidden
        /*.pic-list*/
          /*font-size: 0*/
          /*.pic-item*/
            /*display: inline-block*/
            /*margin-right: 6px*/
            /*width: 120px*/
            /*height: 90px*/
            /*&:last-child*/
              /*margin-right: 0*/
</style>
