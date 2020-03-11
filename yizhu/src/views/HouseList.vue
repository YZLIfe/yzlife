<template>
  <div class="homepage">
    <Header :WhatRouter="this.$router.currentRoute.name"></Header>
    <Carousel></Carousel>
    <div class="hometaps">
      <ul>
        <li :class="[selNum==1?'s_active':'']" @click="Changefy(1)">
          <span class="iconfont iconhouse"></span> 全部房源
        </li>
        <li :class="[selNum==2?'s_active':'']" @click="Changefy(2)">
          <span class="iconfont icondashaxiaoqudizhi01"></span> 精装公寓
        </li>
        <li :class="[selNum==3?'s_active':'']" @click="Changefy(3)">
          <span class="iconfont iconjingjide"></span> 经济房源
        </li>
      </ul>
      <div class="hotfy">
        <div class="hotleft">
          <h2>热门房源</h2>
          <span>Popular listings</span>
        </div>
        <div class="hotright" @click="toScreen">
          <span class="iconfont iconshaixuan"></span>
          <span>房源筛选</span>
        </div>
      </div>
    </div>
    <div class="roomlist">
      <div class="roomitems" v-for="(item,index) in houseList" :key="index" @click="handelJump(item.id)">
        <img :src="item.imagePath" alt />
        <h2>{{item.name}}</h2>
        <div class="items_adress">
          <p>{{item.address}}</p>
          <span>
            <small>{{item.roomTypeParams|SumType}}</small>种可选户型
          </span>
        </div>
        <div class="jiage">
          <div class="jiage_left">
            <span>
              <small>¥{{item.fee}}</small> 元/起
            </span>

            <p>精装公寓</p>
          </div>
          <div class="jiage_right">{{item.notRentNum|Rent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import { GetALL, GetHard, GetEco } from "../common/request/api";
import Header from "../components/header";
export default {
  data() {
    return {
      selNum: 1,
      houseList: []
    };
  },
  components: {
    Carousel,
    Header
  },
  methods: {
    Changefy(val) {
      if (val == 1) {
        GetALL().then(res => {
          this.houseList = res.data.data;
        });
      } else if (val == 2) {
        GetHard().then(res => {
          this.houseList = res.data.data;
        });
      } else {
        GetEco().then(res => {
          this.houseList = res.data.data;
        });
      }
      this.selNum = val;
    },
    toScreen() {
      this.$router.push({
        name: "screen"
      });
    },
    handelJump(val){
      this.$router.push({
        name:'build',
        query:{
          id:val
        }
      })
    }
  },
  created() {
    GetALL().then(res => {
      console.log(res)
      this.houseList = res.data.data;
    });
  },
  filters: {
    SumType: val => {
      return val.length;
    },
    Rent: val => {
      if (val == 0) {
        return "全部已经租满";
      } else if (val != 0 && val < 5) {
        return "少于5套可租";
      } else {
        return "有房可租";
      }
    }
  }
};
</script>

<style lang="scss">
body {
  background: #f5f5f7;
}
.hometaps {
  background: white;
  ul {
    padding: 50px 0;
    display: flex;
    justify-content: space-around;
    color: #9c9c9c;
    li {
      font-size: 34px;
      line-height: 50px;
    }
    span {
      font-size: 38px;
    }
    .s_active {
      font-size: 40px;
      // font-weight: 600;
      color: black;
      span {
        color: #ff8001;
        font-size: 42px;
        font-weight: 600;
      }
    }
  }
}
.hotfy {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  .hotleft {
    // display: flex;
    line-height: 50px;
    h2 {
      color: #444;
      font-size: 40px;
      display: inline-block;
      vertical-align: middle;
    }
    span {
      margin-left: 20px;
      color: #999;
      font-size: 26px;
    }
  }
  .hotright {
    line-height: 50px;
    color: #999;
    .iconshaixuan {
      font-size: 38px;
    }
    span {
      font-size: 30px;
      margin-left: 10px;
    }
  }
}
.roomitems {
  background: white;
  border-bottom: 1px solid #eee;
  padding: 30px;
  margin-bottom: 30px;
  img {
    border-radius: 10px;
    width: 100%;
  }
  h2 {
    line-height: 80px;
    font-size: 30px;
    font-weight: 700;
    color: #002323;
  }
  .items_adress {
    height: auto;
    overflow: hidden;
    clear: both;
    p {
      color: #999;
      float: left;
      font-size: 26px;
    }
    span {
      float: right;
      font-size: 26px;
      small {
        color: #ff8001;
      }
    }
  }
  .jiage {
    margin: 20px 0;
    overflow: hidden;
    .jiage_left {
      span {
        float: left;
        color: #f54300;
        font-size: 26px;
        small {
          font-size: 30px;
          font-weight: bold;
        }
      }
      p {
        margin-left: 10px;
        padding: 0px 5px;
        float: left;
        width: 100px;
        font-size: 24px;
        background-color: #fffcf8;
        border: 2px solid #fba44b;
        color: #fba44b;
        text-align: center;
        line-height: 38px;
        border-radius: 3px;
      }
    }
    .jiage_right {
      float: right;
      font-size: 24px;
      color: #242424;
      display: inline-block;
      font-weight: 500;
    }
  }
}
</style>