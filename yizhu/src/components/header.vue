<template>
  <div class="header">
    <div :class="[isShow==1?'headerShow':'','headerBox']">
      <a href="/" class="logo"></a>
    </div>
    <div :class="[isShow==2?'headerShow':'','headerTitle']" @click="goBack">
      <span class="iconfont iconzuo"></span> 租房选择
    </div>
    <div :class="[isShow==3?'headerShow':'','headerTitle']" @click="goBack">
      <span class="iconfont iconzuo"></span> 房源
    </div>
    <div :class="[isShow==4?'headerShow':'','headerTitle']" @click="goBack">
      <span class="iconfont iconzuo"></span> 独栋房源
    </div>
    <div :class="[isShow==5?'headerShow':'','headerTitle']" @click="goBack">
      <span class="iconfont iconzuo"></span> 用户登录
    </div>
    <div class="zhanweizhi"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      logoSrc: require("../assets/images/logo.png"),
      isShow: 0
    };
  },
  props: ["WhatRouter"],
  created() {
    console.log(this.WhatRouter);
    if (this.WhatRouter == "Home") {
      this.isShow = 1;
    } else if (this.WhatRouter == "screen") {
      this.isShow = 2;
    } else if (this.WhatRouter == "filter") {
      this.isShow = 3;
    } else if (this.WhatRouter == "build") {
      this.isShow = 4;
    } else if (this.WhatRouter == "login") {
      this.isShow = 5;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.headerBox {
  height: 100px;
  background: #ff8001;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9997;
  width: 100%;
  display: none;
}
.headerTitle {
  color: white;
  height: 100px;
  line-height: 100px;
  background: #ff8001;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9997;
  width: 100%;
  font-size: 38px;
  display: none;
}
.headerTitle span {
  font-size: 48px;
}
.logo {
  display: block;
  width: 220px;
  height: 50px;
  margin: 30px 0 0 30px;
  background: url(../assets/images/logo.png) no-repeat;
  background-size: contain;
}
.zhanweizhi {
  height: 100px;
  width: 100%;
}
.headerShow {
  display: block;
}
</style>