<template>
  <div class="footer">
    <router-link to="/" :class="['shoye','fbox' ]" >
        <span class="iconfont iconshouye"></span>
        首页
    </router-link>
    <router-link to="fujin" :class="['shoye','fbox' ]">
        <span class="iconfont icontubiao-"></span>
        附近
    </router-link>
    <router-link to="my" :class="['shoye','fbox' ]" >
        <span class="iconfont iconwode"></span>
        我的
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickNum: 1
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
.router-link-active {
  color: #ff8101 !important;
}
.footer {
  background: white;
  border-top: 1px solid #d9d9d9;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .fbox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 33.333%;
    font-size: 28px;
    text-align: center;
    color: #d6d6d6;
    span {
      font-size: 38px;
    }
  }
}
</style>