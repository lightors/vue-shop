import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListrner = () => {newRefresh()}
    this.$bus.$on('itemImageLoad', this.itemImgListrner)
    console.log('混入');
  }
}
