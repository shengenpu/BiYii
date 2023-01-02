<template>
  <el-card style="width: 1000px; margin: 0 auto">
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 280px;
      "
    >
      <el-button class="btn" @click="toggleShow" type="primary"
        >设置头像</el-button
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
  </el-card>
</template>
<script setup>
import "babel-polyfill"; // es6 shim
import { reactive } from "vue";
import myUpload from "vue-image-crop-upload";
import service from "../utils/request";
import useStore from "../gopinia.js";
import useRouter from "../router/index.js";
const store = useStore();
const that=this;
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
// const cropSuccess=(uploadit.imgDataUrl)=>{

// };
const cropSuccess = (imgDataUrl, field) => {
  console.log("-------- crop success --------");
  uploadit.show = false;
  uploadit.params.account = store.$state.account;
  uploadit.imgDataUrl = imgDataUrl;
  store.$state.avatar=imgDataUrl;
  location.reload();
};
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
