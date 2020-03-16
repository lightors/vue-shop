<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :param-info="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
  import {itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,

      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
      }
    },
    mixins: [itemListenerMixin],
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //console.log(this.iid);

      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //获取顶部图片轮播
        this.topImages = data.itemInfo.topImages
        //this.res = res

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //店铺信息
        this.shop = new Shop(data.shopInfo)

        //商品详情
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]

        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list

      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    mounted() {},
    destroyed() {
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;

  }
</style>
