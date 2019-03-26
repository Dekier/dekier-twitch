import Vue from 'vue'
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)

Vue.component('carousel', VueCarousel.carousel)
Vue.component('slide', VueCarousel.slide)