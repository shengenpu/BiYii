<template>
  <div
    style="
      width: 100%;
      height: 800px;
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
    "
    v-if="orders.showorder"
  >
    <div class="order">
      请确认你的订单>>>>
      <div class="orderone">
        <div class="ordername">
          <p>商品:{{ store.$state.showgoodsone.name }}</p>
          <p>价格:￥{{ store.$state.showgoodsone.price }}</p>
          <p>数量:{{ store.$state.showgoodsone.store }}</p>
          <p>地址:{{ store.$state.address}}</p>
          <p>电话:{{ store.$state.phone}}</p>
          <p>详细地址:{{ store.$state.fulladdress}}</p>
          <el-button type="primary" size="default" @click="pay()">支付</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="buyit">
    <router-link to="/index" class="routerstyle"
      ><el-page-header
        @back="goBack"
        title="Back"
        content="嘟嘟嘟~让货物飞一会~"
        style="color: #4490f1"
      >
      </el-page-header
    ></router-link>
    <p style="">商品详情>>></p>

    <el-carousel
      :interval="2000"
      arrow="always"
      height="320px"
      indicator-position="none"
      id="goodsoneimg"
    >
      <el-carousel-item v-for="item in store.$state.goodoneimg" :key="item">
        <img :src="item" alt="" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="goorder">
      {{ store.$state.showgoodsone.name }}
      <p
        style="
          font-size: 20px;
          color: black;
          margin-top: 20px;
          margin-left: 10px;
        "
      >
        <strong>商家留言：</strong>
      </p>
      <div class="giaoyahu">
        <p class="giao">{{ store.$state.showgoodsone.detailed }}</p>
      </div>
      <p
        style="
          font-size: 20px;
          letter-spacing: 10px;
          font-weight: 100;
          color: black;
        "
      >
        你感兴趣的商品仅剩<strong
          ><i style="font-size: 35px">{{
            store.$state.showgoodsone.store
          }}</i></strong
        >件啦
      </p>
      <div>
        <money style="width: 30px"></money>
        <span style="font-size: 30px">
          ￥{{ store.$state.showgoodsone.price }}</span
        >
        <button
          @click="order"
          style="
            width: 200px;
            height: 50px;
            border: 1px solid whitesmoke;
            background-color: rgb(207, 50, 50);
            border-radius: 10px;
            font-size: 20px;
            color: white;
            display: inline-block;
            cursor: pointer;
            float: right;
          "
        >
          <i>点击购买</i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import useStore from "../gopinia.js";
import { ElMessage } from "element-plus";
import { orderBy } from "lodash";
import { reactive } from "vue";
let route = useRoute();
const store = useStore();
const goBack = () => {};
const orders = reactive({
  showorder: false,
});
const order = () => {
  orders.showorder = true;
};
const pay = () => {
  var time=new Date().getTime();
  var order_id=store.$state.uuid+time;
  window.open(
    "http://localhost:8080/alipay/pay?subject="+store.$state.showgoodsone.name+"&traceNo="+order_id+"&totalAmount="+store.$state.showgoodsone.price
  );
  ElMessage({
    message: "请求成功！",
    type: "success",
  });
};
</script>
