<template>
  <div>
    <Header :WhatRouter="this.$router.currentRoute.name"></Header>
    <div class="roomlist">
      <div class="roomitems" v-for="(item,index) in FilterList" :key="index">
        <img :src="item.imagePath" alt />
        <h2>{{item.name}}</h2>
        <div class="items_adress">
          <p>{{item.address}}</p>
          <span class="hide">
            <small>{{item.roomTypeParams}}</small>种可选户型
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
import Header from "../components/header";
export default {
  components: {
    Header
  },
  data() {
    return {
      FilterList: []
    };
  },
  created() {
    console.log(this.$route.query);
    this.FilterList = this.$route.query.data;
    console.log(this.FilterList);
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
.hide {
  display: none;
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