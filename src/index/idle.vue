<template>
  <div class="goods" style="margin-top: 60px">
    <el-form label-width="80px" style="margin-top: 30px">
      <el-form-item label="商品名称" class="bodymarg">
        <el-input
          v-model="goodset.name"
          :maxlength="8"
          class="goodinput"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" class="bodymarg">
        <ImgCutter
          @cutDown="cutDown"
          style="margin-right: 10px"
          v-if="goodset.imgCutter"
          cutWidth="400"
          cutHeight="300"
          sizeChange="false"
        >
          <button>选择图片</button>
        </ImgCutter>
        <div class="container" @click="deleteit01">
          <img
            :src="goodset.goodimg.img01"
            alt=""
            class="imgcutter"
            @mouseenter="showit01"
            @mouseout="showit01"
          />
          <button class="btn" v-if="goodset.showicon01">删除</button>
        </div>

        <div class="container" @click="deleteit02">
          <img
            :src="goodset.goodimg.img02"
            @mouseenter="showit02"
            @mouseout="showit02"
            style="margin-left: 10px"
            class="imgcutter"
          />
          <button class="btn" v-if="goodset.showicon02">删除</button>
        </div>
        <div class="container" @click="deleteit03">
          <img
            :src="goodset.goodimg.img03"
            @mouseenter="showit03"
            @mouseout="showit03"
            style="margin-left: 10px"
            class="imgcutter"
          />
          <button class="btn" v-if="goodset.showicon03">删除</button>
        </div>
      </el-form-item>

      <el-form-item label="商品类型" class="bodymarg">
        <el-radio-group v-model="goodset.description">
          <el-radio :label="0">数码</el-radio>
          <el-radio :label="1">日常</el-radio>
          <el-radio :label="2">玩具</el-radio>
          <el-radio :label="3">服饰</el-radio>
          <el-radio :label="4">图书</el-radio>
          <el-radio :label="5">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品详情" class="bodymarg">
        <el-input
          class="textarea"
          type="textarea"
          :rows="7"
          placeholder="请输入内容"
          v-model="goodset.detailed"
          maxlength="70"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" class="bodymarg">
        <el-input-number
          v-model="goodset.price"
          :min="0"
          :step="0.5"
          :precision="2"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品库存" class="bodymarg">
        <el-input-number
          v-model="goodset.store"
          :min="0"
          label="请输入数量"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit"
          style="width: 10em; margin-left: 300px"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useStore from "../gopinia.js";
import ImgCutter from "vue-img-cutter";
import { ElMessage } from "element-plus";
import service from "../utils/request.js";
var i = 1; //用来记录图片数量
var img1 = ref("");
var img2 = ref("");
var img3 = ref("");
const store = useStore();
const uploadHeaders = reactive({
  token: window.localStorage.getItem("token"),
});
const goodset = reactive({
  imgCutter: true,
  inputNum: 0,
  showicon01: false,
  showicon02: false,
  showicon03: false,
  maxNum: 300, //最大上传数量
  goodsid: "", //商品id
  name: "", //商品名称
  goodimg: {}, //商品图片
  price: 0.0, //商品价格
  description: 0, //商品类型
  detailed: "", //商品详情
  store: 0, //商品库存
  goods: {},
});
const deleteit01 = () => {
  goodset.goodimg.img01 = goodset.goodimg.img02;
  goodset.goodimg.img02 = goodset.goodimg.img03;
  goodset.goodimg.img03 = "";
  img1 = goodset.goodimg.img01;
  img2 = goodset.goodimg.img02;
  i -= 1;
  goodset.imgCutter = true;
};
const deleteit02 = () => {
  goodset.goodimg.img02 = goodset.goodimg.img03;
  goodset.goodimg.img03 = "";
  img2 = goodset.goodimg.img02;
  img3 = goodset.goodimg.img03;
  i -= 1;
  goodset.imgCutter = true;
};
const deleteit03 = () => {
  goodset.goodimg.img03 = "";
  --i;
  goodset.imgCutter = true;
};
const showit01 = () => {
  goodset.showicon01 = !goodset.showicon01;
};
const showit02 = () => {
  goodset.showicon02 = !goodset.showicon02;
};
const showit03 = () => {
  goodset.showicon03 = !goodset.showicon03;
};
const cutDown = (file) => {
  switch (i) {
    case 1:
      img1 = file.dataURL;
      i++;
      break;
    case 2:
      img2 = file.dataURL;
      i++;
      break;
    case 3:
      img3 = file.dataURL;
      i++;
      if (i > 3) {
        goodset.imgCutter = false;
      }
      break;
  }
  goodset.goodimg = {
    img01: img1,
    img02: img2,
    img03: img3,
  };
  JSON.stringify(goodset.goodimg);
};
const GetNumber = (e) => {
  goodset.inputNum = e.detail.cursor;
};
const submit = () => {
  if (
    goodset.name != "" &&
    goodset.price != 0.0 &&
    goodset.goodimg.img03 != "" &&
    goodset.detailed != "" &&
    goodset.store != 0
  ) {
    var time = new Date().getTime();
    goodset.goodsid = time + store.$state.uuid;
    goodset.goods = {
      goodsid: goodset.goodsid,
      name: goodset.name,
      goodimg: goodset.goodimg,
      price: goodset.price,
      description: goodset.description,
      detailed: goodset.detailed,
      store: goodset.store,
    };
    //let fd=new FormData();
    service
      .post("/uploadgoods", JSON.stringify(goodset.goods), {
        headers: {
          token: window.localStorage.getItem("token"),
          "Content-Type": "application/json;",
        },
      })
      .then((response) => {});

    location.reload();
  } else {
    ElMessage({
      message: "信息不完整！",
      type: "warning",
    });
  }
};
</script>
<style scoped>
.container {
  position: relative;
}
/* 设置按钮样式并将其放置在容器/图像的中间 */
.container .btn {
  position: absolute;
  width: 72px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(171, 75, 75);
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  pointer-events: none;
}
</style>
