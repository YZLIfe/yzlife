<template>
  <div>
    <Carousel :imgpath="this.imgpaths"></Carousel>
    <div class="roominfo">
      <div class="titles">
        <p>{{this.gyinfo.title}}</p>
        <div class="roomspecil">
          <ul>
            <li v-for="(item,index) in gyinfo.features" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="zujin">
          <div class="zj_left">
            租金：
            <span>{{gyinfo.fee}}元/月</span> 已有0人预约
          </div>
          <div class="zj_right">{{gyinfo.feeTypeYa}}押付{{gyinfo.feeTypeFu}}</div>
        </div>
      </div>
    </div>
    <div class="profile">
      <div class="sametitle">
        <div class="proleft">
          房源概况
          <span>Housing profile</span>
        </div>
        <div class="proright">发布于{{gyinfo.releaseTime|SliceStr}}</div>
      </div>
      <div class="zulininfo">
        <div class="zlinfo">
          租金：
          <span>{{gyinfo.fee}}元/月</span>
        </div>
        <div class="zlinfo">
          房型：
          <span>单间</span>
        </div>
        <div class="zlinfo">
          面积：
          <span>{{gyinfo.area}}㎡</span>
        </div>
        <div class="zlinfo">
          楼层：
          <span>{{gyinfo.floor}}楼/总共{{gyinfo.totalFloor}}楼</span>
        </div>
        <div class="zlinfo">
          类型：
          <span>精装公寓</span>
        </div>
        <div class="zlinfo">
          装修：
          <span>{{gyinfo.decorationDegree}}</span>
        </div>
        <div class="zlinfo">
          朝向：
          <span>{{gyinfo.orientation}}</span>
        </div>
      </div>
    </div>
    <div class="supports">
      <div class="sametitle">
        <div class="proleft">
          房屋配套
          <span>Housing support</span>
        </div>
      </div>
      <ul class="ul">
        <li
          v-for="(item,index) in arr"
          :class="[supportName.indexOf(item.name)==-1?'cssline':'']"
          :key="index"
        >
          <img :src="item.ico" alt />
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="ketingfuwu">{{gyinfo.remark}}</div>
    <div class="findMore">
      <span @click="drawer = true">找同户型</span>
    </div>

    <el-drawer title="我是标题" size="70" :visible.sync="drawer" :with-header="false" direction="btt">
      <div class="drawboxs">
        <div class="draw_header">
          <img
            src="https://yizhu.oss-cn-shenzhen.aliyuncs.com/house/2019/04/27/20190427170823285_141.jpg?x-oss-process=style/compress"
            alt
          />
          <div class="rightbox">
            <p>{{ResponseData.minFee}}元/月</p>
            <p>{{ResponseData.houseName}}</p>
            <p>
              房间：
              <span>{{slectedRoom.roomName}}</span> 面积：
              <span>{{slectedRoom.area}}㎡</span>
            </p>
          </div>
        </div>
        <div class="draw_others">
          <div class="drawerh" @click="handelHadden">
            <span>其他户型</span>
            <div class="othertype">1房0厅</div>
          </div>
          <div class="hiddenbox" v-if="hiddens">
            <p
              v-for="(item,index) in ResponseData.roomTypeInfoVos"
              :key="index"
              @click="handelJumpSle(item)"
            >{{item.typeBed}}房{{item.typeRoom}}厅-租金:{{item.fee}}</p>
          </div>
        </div>
        <div class="clickother">
          <div class="otherheader">
            <span>选择房间</span>
            <p>
              <span>
                <i></i> 可租
              </span>
              <span>
                <i></i> 已租
              </span>
            </p>
          </div>
          <div class="infoBoxs">
            <span
              v-for="(item,index) in ResponseData.roomSimpleVos"
              :key="index"
              @click="handelGet(item)"
              :class="[slectedRoom.roomId==item.roomId?'slect':'',item.roomStatus==2?'':'notclick']"
            >{{item.roomName}}</span>
          </div>
        </div>
        <div class="submit" @click="submit">确定</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import { GetSingleRoom, GetTd, GetAllOrigin } from "../common/request/api";
export default {
  data() {
    return {
      imgpaths: 123,
      gyinfo: {},
      arr: [],
      arr1: [],
      supportName: [],
      drawer: false,
      ResponseData: {},
      houseNum: null,
      slectedRoom: {
        area: null,
        fee: null,
        roomId: null,
        roomName: null,
        roomStatus: null
      },
      hiddens: false
    };
  },
  computed: {
    js() {
      return;
    }
  },
  components: {
    Carousel
  },
  methods: {
    handelGet(val) {
      this.slectedRoom = val;
    },
    handelHadden() {
      this.hiddens = !this.hiddens;
    },
    handelJumpSle(val) {
      let str = `${val.houseId}/${val.typeBed}/${val.typeRoom}/${val.fee}`;
      GetAllOrigin(str).then(res => {
        console.log(res.data.data)
        this.ResponseData = res.data.data;
        this.slectedRoom = res.data.data.roomSimpleVos[0];
        this.hiddens = !this.hiddens;
      });
    },
    submit() {
      this.drawer = !this.drawer;
      let id = this.slectedRoom.roomId;
      GetSingleRoom(id).then(res => {
        this.gyinfo = res.data.data;
      });
    }
  },
  created() {
    let id = this.$route.query.id;
    var str = "";
    GetSingleRoom(id).then(res => {
      this.imgpaths = res.data.data.images;
      this.gyinfo = res.data.data;
      str = `${this.gyinfo.houseId}/${this.gyinfo.typeBed}/${this.gyinfo.typeRoom}/${this.gyinfo.fee}`;
      GetAllOrigin(str).then(res => {
        this.ResponseData = res.data.data;
        this.slectedRoom = res.data.data.roomSimpleVos[0];
      });
      res.data.data.supports.forEach((v, i, arrs) => {
        this.supportName.push(v.name);
      });
      GetTd().then(result => {
        this.arr = result.data;
        result.data.forEach((v, i, arrs) => {
          this.arr1.push(v.name);
        });
        var boolean = this.supportName.indexOf("asd");
      });
    });
  },
  filters: {
    SliceStr: val => {
      var arr = (val || "").split(" ");
      return arr[0];
    }
  }
};
</script>

<style lang="scss">
.roominfo {
  padding: 30px;
  background: white;
  margin-bottom: 30px;
  .titles {
    p {
      font-size: 32px;
      color: #333;
      font-weight: 700;
      margin: 20px 0;
    }
    .roomspecil {
      ul {
        li {
          display: inline-block;
          padding: 6px 10px;
          margin-right: 12px;
          background: #ededed;
          color: #999;
          font-size: 22px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
      }
    }
    .zujin {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 26px;
      color: #666;
      .zj_left {
        span {
          font-size: 32px;
          color: #f54300;
        }
      }
    }
  }
}
.profile {
  background: white;
  padding: 30px;

  .zulininfo {
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    .zlinfo {
      width: 50%;
      //   margin-right: 60px;
      padding: 15px 0;
      font-size: 28px;
      color: #9e9e9e;
      span {
        color: #69574d;
      }
    }
  }
}
.sametitle {
  padding: 0 0 30px 0;
  border-bottom: 2px solid #f8f8f8;
  display: flex;
  justify-content: space-between;
  .proleft {
    font-size: 36px;
    display: inline-block;
    color: #232323;
    span {
      color: #666;
      font-size: 28px;
      letter-spacing: 1px;
    }
  }
  .proright {
    color: #666;
    font-size: 28px;
    letter-spacing: 1px;
  }
}
.supports {
  margin-top: 30px;
  padding: 30px;
  background: white;
  ul {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      color: #3b3b3b;
      width: 25%;
      font-size: 28px;
      margin: 5px 0 8px 0;
      img {
        width: 35px;
        //   height: 35px;
        display: inline-block;
      }
    }
    .cssline {
      text-decoration: line-through;
      color: #99999a;
    }
  }
}
.ketingfuwu {
  background: white;
  padding: 30px;
  font-size: 30px;
  color: #666666;
  line-height: 45px;
}
.findMore {
  position: fixed;
  right: 0;
  top: 50%;
  width: 180px;
  box-shadow: 0px 0px 10px red;
  line-height: 100px;
  text-align: center;
  color: white;
  font-size: 30px;
  border-radius: 50px 0 0 50px;
  background: #ff8f19;
}
.drawboxs {
  height: 100%;
  position: relative;
  .draw_header {
    display: flex;
    justify-content: flex-start;
    padding: 20px 20px 0;
    border-bottom: 2px solid #dddddd;
    img {
      width: 240px;
      height: 160px;
      margin-right: 30px;
      align-items: center;
    }
    .rightbox {
      margin: 20px;
      p:nth-of-type(1) {
        color: #f54300;
        font-size: 30px;
      }
      p:nth-of-type(2) {
        color: #232323;
        font-size: 30px;
        margin: 10px 0;
      }
      p:nth-of-type(3) {
        color: #232323;
        font-size: 30px;
        span:nth-of-type(1) {
          color: #fbaa58;
        }
        span:nth-of-type(2) {
          color: #a8a8a8;
        }
      }
    }
  }
  .draw_others {
    padding: 30px 20px;
    border-bottom: 2px solid #dddddd;
    .hiddenbox {
      p {
        text-align: center;
        line-height: 100px;
        font-size: 32px;
        border-bottom: 2px solid #dddddd;
      }
    }
  }
  .submit {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fba44b;
    color: white;
    font-size: 34px;
    line-height: 100px;
    text-align: center;
    border-radius: 50px;
  }
  .drawerh {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 36px;
      color: #4f4f4f;
    }
    .othertype {
      color: #666666;
      font-size: 28px;
    }
  }

  .clickother {
    padding: 30px 15px;
    .otherheader {
      display: flex;
      justify-content: space-between;
      > span {
        font-size: 36px;
        color: #4f4f4f;
      }
      p {
        span:nth-of-type(1) {
          margin-right: 30px;
          font-size: 26px;
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #fba44b;
          }
        }
        span:nth-of-type(2) {
          font-size: 26px;
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #fba44b;
          }
        }
      }
    }
  }
}
.el-drawer {
  height: 70% !important;
}
.clickother {
  .infoBoxs {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-height: 400px;
    overflow: scroll;
    > span {
      padding: 10px 25px;
      border-radius: 6px;
      border: 2px solid #fba44b;
      font-size: 30px;
      text-align: center;
      line-height: 36px;
      margin: 10px 10px 10px 10px;
    }
  }
}
.slect {
  background: #f9e7d5;
}
.notclick {
  color: #999999;
  border: 2px solid #999999 !important;
}
</style>