<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods='showGoods'/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowbackTop"/> <!--组件监听点击-->
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {itemListenerMixin} from "../../common/mixin";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      Scroll,
      BackTop,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowbackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    mixins: [itemListenerMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      //console.log('----activated');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //console.log('----deactivated');
      this.saveY = this.$refs.scroll.getScrollY()
      //console.log(this.saveY);

      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.ItemImgListener)

    },
    mounted() {
      //监听item图片加载完成
     /* const newRefresh = debounce(this.$refs.scroll.refresh, 100)

      //对监听事件进行保存
      this.ItemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImageLoad', this.ItemImgListener)*/

      //获取tabControl的offsetTop,
      // 所有的组件都有一个属性$el用来获取组件中的元素
      //console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
      /*
    * 事件监听相关
    *
    *
    * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000);
      },
      contentScroll(position) {
        //判断BackTop是否显示
        this.isShowbackTop = (-position.y) > 1000

        //决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        //console.log('上拉加载更多');
        this.getHomeGoods(this.currentType);
        //this.$refs.scroll.refresh();
      },


      //获取tabControl的offsetTop,
      // 所有的组件都有一个属性$el用来获取组件中的元素
      swiperImageLoad() {
        //console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /**
       * 网络请求相关
       *
       * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //获取页码
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          //console.log(res);
          //console.log(res.data.list);
          this.goods[type].list.push(...res.data.list);
          //页码加一
          this.goods[type].page += 1;
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*使用原生滚动的时候使用
    position: fixed;
      right: 0;
      top: 0;
      left: 0;
      z-index: 9;*/
  }

  .tab-control {
    /*position: sticky;*/
    /*top: 44px;*/
    /*  z-index: 9;*/

    position: relative;
    z-index: 9;

  }

  /*  .content {
      height: calc(100% - 93px);
      overflow: hidden;
      margin-top: 50px;
    }*/
  .content {
    /*    height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;

  }

  /*  .fixed {
      position: fixed;
      left: 0;
      top: 44px;
      right: 0;
    }*/


</style>
