import Vue from 'vue';
import Router from 'vue-router';
import Goods from '../components/goods/goods.vue';
import Seller from '../components/seller/seller.vue';
import Ratings from '../components/ratings/ratings.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/vue/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/vue/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/vue/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
});
