<template>
  <div>
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
    <ratingSelect  v-on:ratingTypeSelect = "ratingTypeSelect"
                   v-on:toggleContent = "toggleContent"
                   :ratings="ratings"
                   :selectType="selectType"
                   :onlyContent="onlyContent">
    </ratingSelect>
  </div>
</template>

<script type="text/ecmascript-6">
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
        }
      });
    },
    methods: {
      ratingTypeSelect (type) {
        console.log(type);
        this.selectType = type;
      },
      toggleContent () {
        console.log('1');
        this.onlyContent = !this.onlyContent;
      }
    },
    components: {
      star: star,
      split: split,
      ratingSelect: ratingSelect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

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

</style>
