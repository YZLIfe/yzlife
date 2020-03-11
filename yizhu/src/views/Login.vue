<template>
  <div>
    <Header :WhatRouter="this.$router.currentRoute.name"></Header>
    <div class="loginbox">
      <div class="imgbox">
        <img src="../assets/images/login.png" alt />
      </div>
      <div class="title">租客登录</div>
      <div class="inputbox">
        <input v-model="phone" type="text" placeholder="请输入手机号" />
        <input v-model="yzm" class="mima" type="text" placeholder="请填写验证码" />
        <button v-show="isShow" @click="handelGetYzm">获取验证码</button>
        <button v-show="!isShow">{{djs}}秒后获取</button>
      </div>
      <div class="btnbox">
        <button @click="handelLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import { GetYzm, Login } from "../common/request/api";
export default {
  components: {
    Header
  },
  data() {
    return {
      phone: "",
      yzm: "",
      djs: 10,
      isShow: true
    };
  },
  methods: {
    handelGetYzm() {
      if (this.phone == "") {
        this.$message({
          message: "请输入手机号！",
          center: true,
          offset: 200,
          customClass: "tost"
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message({
          message: "手机号格式错误",
          center: true,
          offset: 200,
          customClass: "tost"
        });
      } else {
        this.isShow = false;
        this.djs = 10;
        let timer = setInterval(() => {
          this.djs--;
          if (this.djs == 0) {
            clearInterval(timer);
            this.isShow = true;
          }
        }, 1000);
        GetYzm(this.phone)
          .then(res => {
            if (res.data.status == 0) {
              this.$message({
                message: "发送成功",
                center: true,
                offset: 200,
                customClass: "tost"
              });
            }
          })
          .catch(err => {
            if (err == 400) {
              this.$message({
                message: "发送间隔太短！",
                center: true,
                offset: 200,
                customClass: "tost"
              });
            }
          });
      }
    },
    handelLogin() {
      let arr = {
        code: this.yzm,
        openid: null,
        phone: this.phone,
        roleType: 4
      };
      Login(arr).then(res => {
        this.$store.commit("changeToken", res.headers.token);
        localStorage.setItem("token", res.headers.token);
        console.log(res.headers.token);
        if (res.data.status == 0) {
          this.$router.push({
            name: "my"
          });
        } else {
          this.$message({
            message: "请重新获取验证码",
            center: true,
            offset: 200,
            customClass: "tost"
          });
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.loginbox {
  img {
    width: 50%;
    padding: 80px 0;
  }
  .imgbox {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  .title {
    text-align: center;
    font-size: 30px;
    color: #b9b8b8;
    margin-bottom: 80px;
  }
  .inputbox {
    position: relative;
    padding: 0 30px;
    input {
      outline: none;
      border: none;
      width: 100%;
      line-height: 100px;
      background: white;
      border-radius: 10px;
      padding-left: 10px;
      margin: 20px 0;
      color: black;
      font-size: 32px;
    }
    input::-webkit-input-placeholder {
      color: #949494;
      font-size: 30px;
    }
    button {
      display: inline-block;
      width: 180px;
      line-height: 62px;
      text-align: center;
      position: absolute;
      right: 40px;
      bottom: 33px;
      background-color: #ff9934;
      color: #fff;
      border-radius: 6px;
      font-size: 26px;
    }
  }
  .btnbox {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    > button {
      width: 520px;
      line-height: 78px;
      margin: 0 auto;
      font-size: 30px;
      background-color: #ff8001;
      color: #fff;
      text-align: center;
      border-radius: 8px;
    }
  }
}
.tost {
  p {
    font-size: 28px;
    color: white !important;
  }
  padding: 20px 40px !important;
  background: rgba(33, 33, 33, 0.8) !important;
}
</style>