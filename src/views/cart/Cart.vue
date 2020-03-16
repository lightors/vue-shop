<template>
  <scroll>
  <!--  <div style="position: absolute;top: 0;">
      <van-submit-bar
        safe-area-inset-bottom="true"
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
        <span slot="tip">
    你的收货地址不支持同城送, <span>修改地址</span>
  </span>
      </van-submit-bar>
    </div>-->
  </Scroll>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  export default {
    name: "Cart",
    components: {
      Scroll,
    }
  }
</script>

<style scoped>

</style>
