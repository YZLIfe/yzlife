<template>
  <div>
    <Header :WhatRouter="this.$router.currentRoute.name"></Header>
    <div class="imgbox">
      <img :src="roomList.imagePath" alt />
    </div>
    <div class="roomtitle">
      <h2>{{roomList.address}}</h2>
      <div class="inner">
        <p>{{roomList.fee}}元/起</p>
        <div class="zxcd">{{roomList.type?'经济房源':'精装房源'}}</div>
      </div>
    </div>
    <div class="mou_box">
      <div class="mouheader">
        <div class="h2">待租房源</div>
        <div class="choosetype">{{roomList.roomTypeSize}}种可选户型</div>
      </div>
      <div :class="[this.isShow?'showmore':'','mouitem','maxheight']">
        <div class="moulist" v-for="(item,index) in roomList.roomTypeInfoVos" :key="index" @click="handelJump(item.id)">
          <img
            :src="roomList.imagePath"
            alt
          />
          <div class="listtitle">
            <p>{{roomList.address}} {{item.roomName}}</p>
            <p>{{item.typeBed}}房{{item.typeRoom}}厅/{{item.area}}/m2</p>
            <div class="spanbox">
              <span v-for="(rl,index) in item.features" :key="index">{{rl.name}}</span>
            </div>
            <div class="fee">{{item.fee}}元/月</div>
          </div>
        </div>
      </div>
      <div class="contorlmax" @click="handelMore">{{this.isShow?'收起':'查看更多'}}</div>
    </div>
    <div class="ttsq">
      <img src="../assets/images/sq.jpg" alt />
    </div>
    <div class="ffgk">
      <div class="fy">房源概况</div>
      <div class="gk">{{roomList.description}}</div>
    </div>
    <div class="fywz">
      <div class="fy">房源位置</div>
      <div class="wz">
        位置：
        <span>{{roomList.address}}</span>
      </div>
      <div class="map">
        <div id="allmap"></div>
      </div>
    </div>
    <div class="fwpt">
      <div class="fw">服务配套</div>
      <div class="pt">
        <div class="bj">
          <img src="../assets/images/1.png" alt />
          <div class="bjrigjt">
            <h2>保洁服务</h2>
            <p>定期保洁服务 为您营造一个舒适的 居家环境</p>
          </div>
        </div>
        <div class="bj">
          <img src="../assets/images/1.png" alt />
          <div class="bjrigjt">
            <h2>水电燃气代管代缴服务</h2>
            <p>智能水电表水电情况 自动读取精确无误 实现智能化代管代缴服务</p>
          </div>
        </div>
        <div class="bj">
          <img src="../assets/images/1.png" alt />
          <div class="bjrigjt">
            <h2>维修服务</h2>
            <p>提供专业维修管理人员维护巡检,零星维修等 社区服务</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import BMap from "../common/map/map";
import { GetSingle } from "../common/request/api";
export default {
  data() {
    return {
      isShow: false,
      jw: {
        la: null,
        lo: null
      },
      roomList: []
    };
  },
  components: {
    Header
  },
  mounted() {},
  methods: {
    handelMore() {
      this.isShow = !this.isShow;
    },
    theLocation() {
      BMap.init().then(BMap => {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        let arr = [this.jw.la, this.jw.lo];
        var point = new BMap.Point(arr[0], arr[1]);
        map.centerAndZoom(point, 16);

        var geolocation = new BMap.Geolocation();
        console.log(geolocation.getCurrentPosition);
        geolocation.getCurrentPosition(
          function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);
              alert("您的位置：" + r.point.lng + "," + r.point.lat);
            } else {
              // console.log("failed" + this.getStatus());
            }
          },
          { enableHighAccuracy: true }
        );
        var opts = {
          width: 200, // 信息窗口宽度
          height: 30 // 信息窗口高度
        };
        var infoWindow = new BMap.InfoWindow(this.title, opts); // 创建信息窗口对象
        map.enableScrollWheelZoom(true); //启用滚轮放大缩小
        var new_point = new BMap.Point(this.jw.lo, this.jw.la);
        var marker = new BMap.Marker(new_point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.panTo(new_point);
        map.openInfoWindow(infoWindow, new_point); // 打开信息窗口
      });
    },
    handelJump(val){
      this.$router.push({
        name:'roominfo',
        query:{
          id:val
        }
      })
    }
  },
  created() {
    GetSingle(this.$route.query.id).then(res => {
      this.roomList = res.data.data;
      console.log(this.roomList);
      this.jw.la = res.data.data.latitude;
      this.jw.lo = res.data.data.longitude;
      this.title = res.data.data.address;
      this.theLocation();
    });
  }
};
</script>

<style lang="scss">
.imgbox {
  img {
    width: 100%;
  }
}
.roomtitle {
  background: white;
  padding: 30px;
  h2 {
    font-size: 30px;
    color: #333;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .inner {
    p {
      font-size: 32px;
      display: inline-block;
      color: #f54300;
    }
    .zxcd {
      display: inline-block;
      margin-left: 30px;
      width: 130px;
      height: 40px;
      font-size: 26px;
      background-color: #fffcf8;
      border: 2px solid #fba44b;
      color: #fba44b !important;
      text-align: center;
      line-height: 40px;
    }
  }
}
.mou_box {
  margin-top: 30px;
  padding-top: 20px;
  background: white;
  .mouheader {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    .h2 {
      font-size: 36px;
      display: inline-block;
      color: #232323;
    }
    .choosetype {
      color: #666;
      font-size: 22px;
      line-height: 70px;
    }
  }
  .mouitem {
    padding: 0 30px;
    .moulist {
      display: flex;
      justify-content: space-around;
      padding: 30px 0;
      border-bottom: 1px solid #eee;
      img {
        margin-right: 22px;
        margin-top: 10px;
        width: 200px;
        height: 154px;
        border-radius: 5px;
      }
      .listtitle {
        p:nth-of-type(1) {
          font-size: 28px;
          color: #444;
          font-weight: 600;
        }
        p:nth-of-type(2) {
          font-size: 23px;
          color: #999;
          line-height: 40px;
        }
        .spanbox {
          span {
            display: inline-block;
            padding: 3px 12px;
            margin-right: 15px;
            background: #ededed;
            color: #999;
            font-size: 22px;
            border-radius: 2px;
            margin-bottom: 10px;
          }
        }
      }
      .fee {
        font-size: 32px;
        color: #f54300;
      }
    }
  }
}
.contorlmax {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 26px;
  color: #ff8f19;
}
.maxheight {
  max-height: 800px;
  overflow: hidden;
}
.ttsq {
  margin: 30px 0;
  padding: 30px 50px;
  background: white;
  img {
    width: 100%;
  }
}
.ffgk,
.fywz {
  background: white;
  .fy {
    border-bottom: 2px solid #f1f1f1;
    font-size: 40px;
    padding: 30px 50px;
  }
  .gk {
    font-size: 28px;
    color: #666;
    padding: 60px 50px;
    border: 0;
    font-weight: 400;
    vertical-align: baseline;
  }
}
.fywz {
  margin-top: 30px;
  .wz {
    padding-left: 30px;
    color: #999;
    span {
      color: #444;
    }
  }
}
#allmap {
  width: 100%;
  height: 300px;
}
.map {
  padding: 30px;
}
.fwpt {
  margin-top: 30px;
  background: white;
  .fw {
    border-bottom: 2px solid #f1f1f1;
    font-size: 40px;
    padding: 30px 50px;
  }
  .pt {
    .bj {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      flex-flow: row nowrap;
      padding: 23px;
      img {
        width: 100px;
        height: 100px;
      }
      .bjrigjt {
        margin-left: 33px;
        border-bottom: 2px solid #f1f1f1;
        padding-bottom: 23px;
        padding-right: 20px;
        h2 {
          font-size: 34px;
          color: #444;
        }
        p {
          color: #666;
          font-size: 26px;
        }
      }
    }
  }
}
.showmore {
  max-height: none !important;
}
</style>