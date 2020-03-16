<template>
  <div>
    <scroll class="content" >
      <div style="position: relative">
        <van-image
          round
          width="100"
          height="100"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        /> <strong style="font-size: 24px;position: absolute; top: 40%;left: 130px;">昵称</strong>
      </div>

      <div>
        <van-grid>
          <van-grid-item icon="photo-o" text="收藏夹" />
          <van-grid-item icon="photo-o" text="关注店铺" />
          <van-grid-item icon="photo-o" text="足迹" />
          <van-grid-item icon="photo-o" text="红包卡券" />
        </van-grid>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between">
          <span>我的订单</span>
          <small>查看全部订单</small>
        </div>
        <van-grid column-num="5">
          <van-grid-item icon="photo-o" text="待付款" />
          <van-grid-item icon="photo-o" text="待发货" />
          <van-grid-item icon="photo-o" text="待收货" />
          <van-grid-item icon="photo-o" text="评价" />
          <van-grid-item icon="photo-o" text="退款/售后" />
        </van-grid>

        <van-card
          desc="到达某地..."
          title="运输中"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </div>
      <div>
        <div style="display: flex; justify-content: space-between">
          <span>必备工具</span>
          <small>查看全部工具</small>
        </div>
        <van-grid square>
          <van-grid-item
            v-for="value in 8"
            :key="value"
            icon="photo-o"
            text="文字"
          />
        </van-grid>
      </div>



    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";


  export default {
    name: "Profile",
    components: {
      Scroll,
    }
  }
</script>

<style scoped>
  .content {
    height: 100vh;
    background-color: #ccc;
    overflow: hidden;
  }
</style>
