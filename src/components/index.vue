<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="(item, index) in catelist" :key="index">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p >
                      <span v-for="(it, i) in item.subcates" :key="i">{{it.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a href="/goods/43.html" v-for="(it, i) in item.subcates" :key="i">{{it.title}}</a>
                        
                      </dd>
                    </dl>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <el-carousel height="341px">
              <el-carousel-item v-for="item in sliderlist" :key="item.id">
                
                <img class="slider_img" :src="item.img_url" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item, index) in toplist" :key="index">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | formatTime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="(item, index) in sectionlist" :key="index">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a href="/goods/43.html" v-for="(it, i) in item.level2catelist" :key="i">{{it.subcatetitle}}</a>
          
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(it, i) in item.datas" :key="i">
              <!-- <a href="#/site/goodsinfo/87" class> -->
              <router-link :to="'/detail/'+it.artID">
                <div class="img-box">
                  <img
                    :src="it.img_url"
                  >
                </div>
                <div class="info">
                  <h3>{{it.artTitle}}</h3>
                  <p class="price">
                    <b>{{it.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{it.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{it.market_price}}</s>
                    </span>
                  </p>
                </div>
              <!-- </a> -->
              </router-link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import elementUI from "element-ui"
export default {
  name: "index",
  data() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      sectionlist:[]
    };
  },
  created() {
    // 获取顶部三部分数据
    axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(response => {
        console.log(response);
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
      // 获取下面四大部分
    axios
      .get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
      .then(response => {
        console.log(response);
        this.sectionlist=response.data.message
      });

  },
  // 过滤器
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY年MM月DD日");
    }
  }
};
</script>
    
<style>
    .slider_img{
        width: 100%;
        height: 100%;
    }
</style>
