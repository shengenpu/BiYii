<template>
  <div v-if="showinfor.showin" class="information">
    <div class="informationbody">
      <el-form-item label="昵称" @click="cgaccount" style="margin-left: 30px;">
        <input
          class="idacc"
          maxlength="4"
          :placeholder="store.$state.account"
          v-model="showinfor.newaccount"
          size="normal"
        />
      </el-form-item>
      <el-form-item label="性别" style="margin-left: 30px;">
        <el-radio-group v-model="showinfor.resource">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="2">保密</el-radio>
        </el-radio-group>
        
      </el-form-item>
      
      <el-form-item label="个性签名">
        <input
          class="idacc"
          maxlength="30"
          :placeholder="store.$state.signature"
          v-model="showinfor.signature"
          size="normal"
        />
      </el-form-item>
      <el-form-item label="收件地址">
        <el-cascader
          size="normal"
          :options="options"
          v-model="showinfor.newaddress"
          :placeholder="store.$state.address"
          @change="handleChange"
          clearable
          filterable
        >
        </el-cascader>
        <el-form-item label="手机号码" style="margin-left: 50px">
          <input style="width: 230px" class="idacc" maxlength="11"  :placeholder="store.$state.phone" v-model="showinfor.phone" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="详细地址" size="normal">
        <textarea name="" id="" cols="90" rows="8" v-model="showinfor.newfull" class="texrarea" :placeholder="store.$state.fulladdress"></textarea>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100px; margin-left: 300px" @click="submitinformation"
          >提交</el-button
        >
        <el-button style="width: 100px" @click="showinformation"
          >取消</el-button
        >
      </el-form-item>
    </div>
  </div>

  <div class="elcard">
    <div style="">
      <p
      v-if="gosit.sit"
      style="
        position: absolute;
        color: gainsboro;
        z-index: 2;
        margin-top: 100px;
        pointer-events: none;
        margin-left: 80px;
      "
    >
      修改头像
    </p>
      <img
        :src="store.$state.avatar"
        @mouseenter="showsit"
        @mouseout="outsit"
        id="inavatar"
        @click="toggleShow"
      />
      <p class="idac">{{ store.$state.account }}</p>

      <div
        style="
          width: 100%;
          height: 100px;
          border-radius: 5px;
          background-color: gainsboro;
        "
      ></div>
      <p style="margin-left: 195px;margin-top: 25px">{{ store.$state.signature }}</p>
      <el-button
        style="margin-left: 805px;"
        type="primary"
        size="default"
        @click="showinformation()"
        >修改信息</el-button
      >
    </div>
    

    <my-upload
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      v-model="uploadit.show"
      :width="200"
      :params="uploadit.params"
      :height="200"
      img-format="png"
      :size="size"
      langType="zh"
      :noRotate="false"
      field="file"
      :headers="header"
      :url="uploadit.urlUpdate"
    ></my-upload>
  </div>
</template>
<script setup>
import "babel-polyfill"; // es6 shim
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import myUpload from "vue-image-crop-upload";
import service from "../utils/request";
import { regionDataPlus } from "element-china-area-data";
import useStore from "../gopinia.js";
import {CodeToText} from 'element-china-area-data'
const store = useStore();

const showinfor = reactive({//垃圾堆，啥没用的都放在这里
  newaccount: "",//新的昵称
  newbirth:'',//新的生日
  signature:'',//新的个性签名
  newaddress:'',//新的地址
  phone:'',//新的手机号码
  newfull:'',//新的详细地址
  acin: false,//是否显示输入框
  showin: false,//是否需要修改
  resource: store.$state.gender,//新的性别
});
const options = regionDataPlus;
const selectedOptions = ref([]);
const handleChange = (value) => {
  let area = "";
      switch (value.length) {
        case 1:
          area += CodeToText[value[0]]+ "/";
          break;
        case 2:
          area += CodeToText[value[0]] + "/" + CodeToText[value[1]]+ "/";
          break;
        case 3:
          area +=
            CodeToText[value[0]] +
            "/" +
            CodeToText[value[1]] +
            "/" +
            CodeToText[value[2]]+ "/";
          break;
        default:
          break;
      } 
      showinfor.newaddress=area;
      store.$state.address=area;
};
const gosit = reactive({
  sit: false,
});
const uploadit = reactive({
  imgDataUrl: "",
  show: false,
  size: 2.1,
  imageUrl: "",
  params: {
    account: "",
  },
  urlUpdate: "http://localhost:8080/upload",
});
var header = {
  token: window.localStorage.getItem("token"),
};
const toggleShow = () => {
  uploadit.show = !uploadit.show;
};
const showinformation = () => {
  showinfor.showin = !showinfor.showin;
  showinfor.newaccount="";
  showinfor.newbirth="";
  showinfor.signature="";
  showinfor.newaddress="";
  showinfor.phone="";
  showinfor.newfull="";
  

};
const cropSuccess = (imgDataUrl, field) => {
  console.log("-------- crop success --------");
  uploadit.show = false;
  uploadit.params.account = store.$state.account;
  uploadit.imgDataUrl = imgDataUrl;
  store.$state.avatar = imgDataUrl;
  location.reload();
};
const showsit = () => {
  gosit.sit = true;
};
const outsit = () => {
  gosit.sit = false;
};
const cgaccount = () => {
  showinfor.acin = true;
};
const submitinformation=()=>{
  console.log(showinfor.newaddress)
  let myParams = new URLSearchParams();
  myParams.append("uuid", store.$state.uuid);
  myParams.append("account", showinfor.newaccount);
  myParams.append("gender", showinfor.resource);
  myParams.append("phone", showinfor.phone);
  myParams.append("address", showinfor.newaddress);
  myParams.append("fulladdress", showinfor.newfull);
  myParams.append("signature", showinfor.signature);
  service
    .post("/upload/information", myParams, {
      headers: { token: window.localStorage.getItem("token") },
    })
    .then((response) => {
      if (response.data.code == 200) {
        store.$state.account = response.data.data.account;
        store.$state.signature = response.data.data.signature;
        store.$state.address = response.data.data.address;
        store.$state.phone = response.data.data.phone;
        store.$state.fulladdress = response.data.data.fulladdress;
        store.$state.gender = response.data.data.gender;
        showinfor.showin = false;
        
      }
    });
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
