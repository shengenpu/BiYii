<template>
  <div style="width: 1370px">
    <div style="margin-top: 60px; margin-left: 100px; float: left">
      <div class="text-container">
        <transition class="inner-container2" name="slide" mode="out-in">
          <p class="text2" :key="text.number">{{ arr[text.number] }}</p>
        </transition>
      </div>
      <el-carousel
        :interval="2000"
        arrow="always"
        height="350px"
        indicator-position="none"
        id="carousel"
      >
        <el-carousel-item v-for="item in store.$state.goodslist" :key="item">
          <router-link to="/buyit"><img :src="item.img01" alt="" style="width: 100%; height: 100%" @click="gobuyit(item)"/></router-link>
        </el-carousel-item>
      </el-carousel>
      
    </div>
    <div class="goodsfor6">
      <div class="goodsfor3" v-for="item in store.$state.goodshave6">
        <div>
          <router-link to="/buyit">
            <img
              :src="item.img01"
              alt=""
              class="goodsfor1"
              @click="gobuyit(item)"
          /></router-link>
        </div>
        <div class="goodsfor2">
          <p class="goodsfor2p1">
            {{ item.name }}
          </p>
          <p class="goodsfor2p2">
            <i>{{ item.price }}</i> 元
          </p>
        </div>
      </div>
    </div>
  </div>
  <div id="classit">
    <div id="classleft">
      <button @click="classification(6)">全部</button>
      <button @click="classification(0)">数码</button>
      <button @click="classification(1)">日常</button>
      <button @click="classification(2)">玩具</button>
      <button @click="classification(3)">服饰</button>
      <button @click="classification(4)">图书</button>
      <button @click="classification(5)">其它</button>
    </div>
    <el-empty
      description="还没有用户上传该类型的商品哦~"
      style="margin-top: 100px"
      v-if="text.description"
    />
    <div id="classright" v-else>
      <div class="showfor3" v-for="item in text.showlist" v-if="text.isclick">
        <div>
          <router-link to="/buyit">
          <img
            :src="item.img01"
            alt=""
            class="goodsfor1"
            @click="gobuyit(item)"
          /></router-link>
        </div>
        <div class="goodsfor2">
          <p class="goodsfor2p1">
            {{ item.name }}
          </p>
          <p class="goodsfor2p2">
            <i>{{ item.price }}</i> 元
          </p>
        </div>
      </div>
      <div class="showfor3" v-for="item in store.$state.goodslist" v-else>
        <div>
          <router-link to="/buyit">
          <img
            :src="item.img01"
            alt=""
            class="goodsfor1"
            @click="gobuyit(item)"
          /></router-link>
        </div>
        <div class="goodsfor2">
          <p class="goodsfor2p1">
            {{ item.name }}
          </p>
          <p class="goodsfor2p2">
            <i>{{ item.price }}</i> 元
          </p>
        </div>
      </div>
      <!-- <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" :total="100" />
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import useStore from "../gopinia.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import service from "../utils/request.js";
const cxk = ref("");
let router = useRouter();
const store = useStore();
let text = reactive({
  number: 0,
  showlist: [],
  description: false,
  isclick:false
});
var shownum = [];
var num = 0;
var random;
var arr = [
  "环保扎根现在，绿色引领未来",
  "交流的是故事，得到的是实惠",
  "让旧货飞一会儿，嘟嘟嘟~",
  "知识改变命运，读书成就未来",
  "能挑擅找，变废为宝",
  "小市集，大惊喜",
  "太贵!不怕!太旧!不怕!来笔忆BiYi叭",
];
const startMove = () => {
  let timer = setTimeout(() => {
    if (text.number === 5) {
      text.number = 0;
    } else {
      text.number++;
    }
    startMove();
  }, 3000);
};
startMove();
const gobuyit = (item) => {
  store.$state.goodoneimg=[];
  store.$state.showgoodsone = item;
  store.$state.goodoneimg.push(item.img01) ;
  store.$state.goodoneimg.push(item.img02) ;
  store.$state.goodoneimg.push(item.img03) ;
};
const classification = (which) => {
  text.isclick=true;
  text.showlist = [];
  for (var i = 0; i < store.$state.goodslist.length; i++) {
    if (store.$state.goodslist[i].description == which) {
      text.showlist.push(store.$state.goodslist[i]);
      text.description = false;
    }
    if (which == 6) {
      text.showlist.push(store.$state.goodslist[i]);
      text.description = false;
    }
  }
  if (text.showlist.length == 0) {
    text.description = true;
  }
};
service.post("/goodslist").then((response) => {
  store.$state.goodshave6 = [];
  store.$state.goodslist = response.data.goodslist;
  for (var i = 0; num != 6; i++) {
    random = Math.floor(Math.random() * store.$state.goodslist.length);
    //如果随机数和上一个相同，就重新生成随机数
    for (var j = 0; j < shownum.length; ) {
      if (shownum[j] == random) {
        random = Math.floor(Math.random() * store.$state.goodslist.length);
        j = 0;
      } else {
        j++;
      }
    }
    shownum.push(random);
    store.$state.goodshave6.push(store.$state.goodslist[random]);
    num++;
  }
});


//判断浏览器是否支持SSE
if (window.EventSource) {
  var source = new EventSource(
    "http://localhost:8080/sse/subscribe?id=" + store.$state.uuid
  );

  //响应消息-实现方式1
  // source.onmessage = function (event) {
  //     text = document.getElementById('result').innerText;
  //     text += '\n' + event.data;
  //     document.getElementById('result').innerText = text;
  // };

  //响应消息-实现方式2，后续都依赖这个进行传输
  source.addEventListener(
    "message",
    function (e) {
      console.log(e.data);
    },
    false
  );

  //响应open事件,第一次连接成功时触发
  source.addEventListener(
    "open",
    function (e) {
      console.log("连接打开.");
    },
    false
  );

  // 响应close事件，主动关闭EventSource
  //后端关闭SSE会执行error事件，在error事件中关闭SSE不友好，后端在关闭SSE发送close
  // 事件以友好的关闭SSE
  source.addEventListener(
    "close",
    function (e) {
      source.close();
      console.log(e);
      console.log("数据接收完毕,关闭EventSource");
    },
    false
  );

  //响应error事件
  source.addEventListener(
    "error",
    function (e) {
      if (e.readyState == EventSource.CLOSED) {
        console.log("连接关闭");
      } else {
        console.log(e);
      }
    },
    false
  );
} else {
  console.log("你的浏览器不支持SSE");
}
const send = () => {
  service
    .get("/sse/pushall?content=" + store.$state.account + ":" + cxk.value)
    .then((response) => {});
  cxk.value = "";
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
