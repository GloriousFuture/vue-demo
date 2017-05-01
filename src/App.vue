<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/vue/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/vue/seller">商家</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/vue/ratings">评论</router-link>
      </div>

    </div>

    <router-view>
    </router-view>
  </div>
</template>

<script>
  import header from './components/header/header';
  const ERR_OK = 0;
  export default {
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.data = response.data;
          console.log(this.data);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: centers
        & > a
          display: block
          font-size: 14px;
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
