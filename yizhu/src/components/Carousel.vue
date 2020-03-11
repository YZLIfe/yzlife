<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in imgSrc" :key="index">
        <img :src="item.path" alt />
        123
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: ["imgpath"],
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        loop: true,
        autoplay: true
      },
      imgSrc: [],
      imgp: [
        {
          path: require("../assets/images/banner01.jpg")
        },
        {
          path: require("../assets/images/banner02.jpg")
        }
      ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    imgpath(n, o) {
      this.imgpath = n;
      if (this.imgpath.lenght == 0) {
        this.imgSrc = this.imgp;
      } else {
        this.imgSrc = this.imgpath;
      }
    }
  },
  mounted() {
    console.log(this.imgpath);
  },
  created() {
    this.$axios({
      methods: "get",
      url: "https://api.yizhulife.com/special/village/1"
    }).then(res => {
      // console.log(res);
    });
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss">
.swiper-container {
  height: 350px;
  img {
    width: 100%;
  }
}
</style>