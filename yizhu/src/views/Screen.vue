<template>
  <div>
    <Header :WhatRouter="this.$router.currentRoute.name"></Header>
    <div class="xuqiu">您的租房需求</div>
    <div class="fanwei">
      <p>选择租金范围</p>
      <p>{{value[0]}}元--{{value[1]}}元</p>
      <div class="block">
        <el-slider v-model="value" range :max="10000" @change="handelChange" :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div class="wz" @click="handelShow">
      <div class="wzLeft">位置</div>
      <div class="wzRight">不限 ></div>
    </div>
    <div class="huxing">
      <p>户型选择</p>
      <ul>
        <li :class="[SearchRoom.typeBed==0?'sleCLass':'']" @click="handelHx(0)">不限</li>
        <li :class="[SearchRoom.typeBed==1?'sleCLass':'']" @click="handelHx(1)">单间</li>
        <li :class="[SearchRoom.typeBed==2?'sleCLass':'']" @click="handelHx(2)">二房</li>
        <li :class="[SearchRoom.typeBed==3?'sleCLass':'']" @click="handelHx(3)">三房</li>
        <li :class="[SearchRoom.typeBed==4?'sleCLass':'']" @click="handelHx(4)">四房</li>
      </ul>
    </div>
    <div class="tedian">
      <p>特点（可多选）</p>
      <ul>
        <li @click="handelZero" :class="[slecTd.length==0?'liactive':'']">不限</li>
        <li
          v-for="(item ,index) in Td"
          :key="index"
          @click="handelTd($event,index)"
          :class="{liactive:slecTd.indexOf(index+1)!=-1}"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="sbmt">
      <div class="cz tj">重置</div>
      <div class="qd tj" @click="handelSbmt">确定</div>
    </div>
    <div :class="['diqu',isShow?'hide':'']">
      <ul>
        <li class="lione" @click="handelShow">不限</li>
        <li v-for="(item,index) in diqu" :key="index" @click="handelClick(item.id)">
          {{item.name}}
          <span>（{{item.roomNum}}套）</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import { GetTd, GetWz, PostFj } from "../common/request/api";
export default {
  components: {
    Header
  },
  data() {
    return {
      value: [0, 10000],
      SearchRoom: {
        areaCode: null,
        list: [],
        maxFee: 10000,
        minFee: 0,
        typeBed: 0
      },
      Td: [],
      slecTd: [],
      diqu: [],
      isShow: true
    };
  },
  created() {
    GetTd().then(res => {
      this.Td = res;
    });
    GetWz().then(res => {
      this.diqu = res.data;
    });
  },
  methods: {
    handelHx(val) {
      this.SearchRoom.typeBed = val;
    },
    handelChange() {
      this.SearchRoom.maxFee = this.value[1];
      this.SearchRoom.minFee = this.value[0];
    },
    handelTd($event, val) {
      if (this.slecTd.length == 0) {
        this.slecTd.push(val + 1);
      } else {
        let index = this.slecTd.indexOf(val + 1);
        if (index < 0) {
          this.slecTd.push(val + 1);
        } else {
          this.slecTd.splice(index, 1);
        }
      }
    },
    handelZero() {
      this.slecTd = [];
    },
    handelShow() {
      this.isShow = !this.isShow;
    },
    handelClick(val) {
      this.SearchRoom.areaCode = val;
      this.isShow = !this.isShow;
    },
    handelSbmt() {
      this.SearchRoom.list = this.slecTd;
      console.log(this.SearchRoom);
      PostFj(this.SearchRoom).then(res => {
        console.log(res);
        this.$router.push({
          name: "filter",
          query: res
        });
      });
    }
  }
};
</script>

<style lang='scss'>
.xuqiu {
  margin: 0 auto;
  height: 40px;
  font-size: 34px;
  text-align: center;
  font-weight: 400;
  color: #333;
  line-height: 40px;
  padding: 80px 30px;
}
.fanwei {
  padding: 0 70px;
  margin-bottom: 50px;
  p:nth-of-type(1) {
    color: #333;
    line-height: 30px;
    font-size: 30px;
    vertical-align: top;
    font-weight: 400;
  }
  p:nth-of-type(2) {
    text-align: center;
    line-height: 40px;
    margin-bottom: 50px;
    font-size: 34px;
    margin-top: 40px;
    margin-bottom: 50px;
  }
}
.el-slider__button {
  width: 35px !important;
  height: 35px !important;
}
.el-slider__runway,
.el-slider__bar {
  height: 8px !important;
}
.wz {
  font-size: 30px;
  color: #333;
  padding: 30px 30px 35px 67px;
  //   line-height: 40px;
  overflow: hidden;
  border-top: 1px solid #efeeee;
  border-bottom: 1px solid #efeeee;
  .wzLeft {
    float: left;
  }
  .wzRight {
    float: right;
  }
}
.huxing {
  padding: 50px 63px 0;
  p {
    font-size: 30px;
  }
  ul {
    height: auto;
    overflow: hidden;
    margin: 35px auto;
    li {
      font-size: 28px;
      width: 165px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border: 2px solid #e1e1e1;
      border-radius: 16px;
      float: left;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      margin-right: 20px;
    }
    .sleCLass {
      border: 2px solid #ffaa5d !important;
      color: #ffaa5d;
      background-color: #f9e7d5;
    }
  }
}
.tedian {
  padding: 50px 63px 0;
  p {
    font-size: 30px;
  }
  ul {
    height: auto;
    overflow: hidden;
    margin: 35px auto;
    li {
      font-size: 28px;
      width: 165px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border: 2px solid #e1e1e1;
      border-radius: 16px;
      float: left;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      margin-right: 20px;
    }
    .liactive {
      border: 2px solid #ffaa5d !important;
      color: #ffaa5d;
      background-color: #f9e7d5;
    }
  }
}
.sbmt {
  border-top: 2px solid #efeeee;
  padding-top: 50px;
  padding-bottom: 65px;
  padding-left: 60px;
  padding-right: 60px;
  display: flex;
  justify-content: space-around;
  .tj {
    width: 210px;
    line-height: 68px;
    font-size: 30px;
    text-align: center;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: inline-block;
    color: #333;
  }
  .qd {
    background: #fba44b;
    color: white;
  }
}
.diqu {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 99999;
  background: white;
  ul {
    .lione {
      color: #ffaa5d;
    }
    li {
      padding: 0 40px;
      font-size: 30px;
      height: 90px;
      line-height: 100px;
      box-shadow: 0 4px 0 0 #f4f4f4;
      font-weight: 400;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.hide {
  display: none;
}
</style>