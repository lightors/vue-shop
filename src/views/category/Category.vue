<template>
  <div style="display: flex; flex-direction: row">

  <van-sidebar v-model="activeKey" >
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
    <van-sidebar-item title="标签名称" />
  </van-sidebar>
  <div style="flex: 1;" class="right">{{activeKey}}</div>
  </div>


</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Category",
    components:{Scroll,},
    data() {
      return {
        activeKey: 0
      }
    },
    created() {

    },
    mounted() {
      /* this.scroll = new BScroll(document.querySelector('.wrapper'), {
         protoType: 0,
         pullUpLoad: true,
       })
       this.scroll.on('scroll', (position) => {
         //console.log(position);
       })

       this.scroll.on('pullingUp', () => {
         console.log('上拉加载更多');
       })
     }*/
    }
  }
</script>

<style scoped>
 .right {
   background: #ccc;
 }
</style>
