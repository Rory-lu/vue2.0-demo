<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratings-header-wrapper">
        <div class="left">
          <h2 class="score">{{seller.score}}</h2>
          <p class="text">综合评分</p>
          <p class="descri">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="deliverTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect @ratingTypeSelect = ratingTypeSelect
                    @toggleContent = toggleContent
                    :ratings="ratings"
                    :selectType="selectType"
                    :onlyContent="onlyContent">
      </ratingSelect>
      <div class="rating-wrapper">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28"/>
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>
              <span class="item" v-for="item in rating.recommend">{{item}}</span>
            </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';
  import ratingSelect from '../../components/ratingselect/ratingselect.vue';

  const ERROR_OK = 0;
  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        if (response.body.errno === ERROR_OK) {
          this.ratings = response.body.data;
          // 应用better-scroll
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      ratingTypeSelect (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        // 待理解
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      star: star,
      split: split,
      ratingSelect: ratingSelect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-header-wrapper
      display: flex
      padding: 18px 0
      .left
        flex: 0 0 137.5px
        width: 137.5px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .score
          line-height: 28px
          margin-bottom: 6px
          font-size: 24px
          color: rgb(255, 153, 0)
        .text
          line-height: 12px
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7, 17, 27)
        .descri
          line-height: 10px
          font-size: 10px
          color: rgb(7, 17, 27)
      .right
        flex: 1
        margin-left: 24px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
            .star-item
              margin-right: 6px
              &:last-child
                margin-right: 0
          .score
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153, 0)
          .deliverTime
            display: inline-block
            vertical-align: top
            line-height: 18px
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
          &:last-child
            margin-bottom: 0

    .rating-wrapper
      padding: 0 18px
      .rating-item
        border-1px(rgba(7, 17, 27, 0.1))
        display: flex
        padding: 18px 0
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            line-height: 12px
            margin-bottom: 4px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
          .text
            line-height: 18px
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
          .recommend
            font-size: 0
            .icon-thumb_up,.icon-thumb_down
              display: inline-block
              vertical-align: top
              line-height: 16px
              margin: 0 8px 4px 0
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(183, 187, 191)
            .item
              display: inline-block
              vertical-align: top
              line-height: 14px
              padding: 0 6px
              margin: 0 8px 4px 0
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              font-size: 9px
              color: rgb(147, 153, 159)
          .time
            position: absolute
            right: 0
            top: 0
            line-height: 12px
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)

</style>
