<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel height="315px" width="395px">
                  <el-carousel-item v-for="item in imglist" :key="item.id">
                    <img :src="item.thumb_path" alt class="slider_img">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="num"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" @click="showDesc=true" :class="{selected:showDesc}">商品介绍</a>
                  </li>
                  <li>
                    <a
                      href="javascript:;"
                      @click="showDesc=false"
                      :class="{selected:!showDesc}"
                    >商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" v-show="showDesc" v-html="goodsinfo.content"></div>
              <div class="tab-content" v-show="!showDesc">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model="message"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="submit"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in comments" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalcount"
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <!-- <a href="#/site/goodsinfo/90" class=""> -->
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                      <!-- </a> -->
                    </div>
                    <div class="txt-box">
                      <!-- <a href="#/site/goodsinfo/90" class=""></a> -->
                      <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                      <span>{{item.add_time | formatTime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
// import moment from "moment"
export default {
  name: "detail",
  data() {
    return {
      // 计数器初始
      num: 1,
      showDesc: true,
      // min:0,
      goodsinfo: {},
      // max:goodsinfo.stock_quantity,
      hotgoodslist: [],
      imglist: [],
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 评论数据
      comments: [],
      // 评论数
      totalcount: 0,
      //   评论
      message: ""
    };
  },
  methods: {
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
          this.totalcount = res.data.totalcount;
          this.comments = res.data.message;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getComments();
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.pageIndex = val;
      this.getComments();
    },
    submit() {
      if (this.message === "") {
        this.$message.error("写点东西呗");
        return;
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
            commenttxt: this.message
          })
          .then(res => {
            // console.log(res);
            if (res.data.status === 0) {
              this.$message.success("评论成功");
              this.message = "";
              this.getComments();
            }
          });
      }
    }
  },
  // 接收产品id
  created() {
    this.$axios
      .get("site/goods/getgoodsinfo/" + this.$route.params.id)
      .then(res => {
        console.log(res);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      }),
      this.getComments();
  },
  // 侦听器
  watch: {
    "$route.params.id"(nv, ov) {
      this.$axios.get("site/goods/getgoodsinfo/" + nv).then(res => {
        // console.log(res);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      }),
        this.getComments();
    }
  }
 
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
  height: 100%;
}
.pic-box {
  width: 395px;
  height: 315px;
}
.pic-box .slider_img {
  width: 100%;
}
</style>
