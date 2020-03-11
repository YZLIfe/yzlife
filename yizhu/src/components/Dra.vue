<template>
  <div>
    <span @click="drawer = true">点击我</span>
    <el-drawer title="我是标题" size="70" :visible.sync="drawer" :with-header="false" direction="btt">
      <div class="drawboxs">
        <div class="draw_header">
          <img
            src="https://yizhu.oss-cn-shenzhen.aliyuncs.com/house/2019/04/27/20190427170823285_141.jpg?x-oss-process=style/compress"
            alt
          />
          <div class="rightbox">
            <p>2880元/月</p>
            <p>正青春公寓</p>
            <p>
              房间：
              <span>212</span> 面积：
              <span>38㎡</span>
            </p>
          </div>
        </div>
        <div class="draw_other">
          <span>其他户型</span>
          <div class="othertype">1房0厅</div>
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
            <span v-for="(item,index) in ResponseData.roomSimpleVos" :key="index">{{item.roomName}}</span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetAllOrigin } from "../common/request/api";
export default {
  data() {
    return {
      drawer: false,
      ResponseData: {}
    };
  },
  created() {
    let str = "277/1/1/2880";
    GetAllOrigin(str).then(res => {
      this.ResponseData = res.data;
      console.log(this.ResponseData);
    });
    //     this.$axios.get('/room/findIndexHouseFullInformationByType/277/1/1/2880')
    //   .then(function (res) {
    //     console.log(res);
    //   })
  }
};
</script>

<style lang='scss'>
.drawboxs {
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
  .draw_other {
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #dddddd;

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
</style>