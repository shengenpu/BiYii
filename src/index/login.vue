<template>
  <el-container class="el-container" style="min-height: 100vh">
    <el-header id="header">
      <div style="width: 1500px">
        <img src="../img/favicon.jpg" alt="" class="logoimg" />
        <ul>
          <li style="margin-left: 250px">
            <router-link to="/index" class="routerstyle">首页</router-link>
          </li>
          <li>大厅</li>
          <li>建议</li>
        </ul>
        <div class="seardiv">
          <el-input
            v-model="input"
            placeholder="请输入您要搜索的商品"
            class="search"
          />
          <el-icon id="gosearch"><Search /></el-icon>
        </div>
        <router-link
          to="/idle"
          class="routerstyle"
          style="margin-left: 120px; color: white"
        >
          <strong>出闲置</strong>
        </router-link>
        <div v-if="state.loginstate" class="mine">
          <router-link to="/mine"
            ><img
              :src="store.$state.avatar"
              title="个人空间"
              srcset=""
              id="avatar"
              @error="imgerror" /></router-link
          ><router-link to="/mine"
            ><el-dropdown class="router1">
              <span class="el-dropdown-link">
                {{ store.$state.account }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><router-link
                      to="/mine"
                      class="router1"
                      style="line-height: 25px"
                      >个人空间</router-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item @click="logout"
                    ><router-link
                      to="/"
                      class="router1"
                      style="line-height: 25px"
                      >退出登录</router-link
                    ></el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown></router-link
          >
        </div>
        <div v-else="" class="demo" @click="login">登录</div>
      </div>
    </el-header>
    <el-main>
      <!-- 这里的v-if控制整个登录弹窗的显示与不显示 -->
      <div
        v-if="isshow.showlogin"
        id="mask"
        @touchmove.prevent
        @mousewheel.prevent
      >
        <div id="login">
          <!-- 这里的v-if控制整个登录内容的显示与不显示 -->
          <div v-if="gologin.islogin">
            <img src="../img/login.jpg" alt="" class="imglo" />
            <div class="demo1">
              <img src="../img/favicon.jpg" alt="" class="logo" />
              <p style="line-height: 2px; font-size: 20px">
                &nbsp;笔忆BiYi | login
              </p>
              <div id="demo2">
                <p>
                  <label for="">账号&nbsp;&nbsp;</label
                  ><el-input
                    v-model="loginfrom.account"
                    type="text"
                    placeholder="请输入账号"
                    size="default"
                    clearable
                    @change=""
                    class="come"
                  ></el-input>
                </p>
                <p>
                  <label for="">密码&nbsp;&nbsp;</label>
                  <el-input
                    v-model="loginfrom.pwd"
                    placeholder="请输入密码"
                    type="password"
                    size="default"
                    show-password
                    @change=""
                    class="come"
                  ></el-input>
                </p>
              </div>
              <div style="margin-top: 25px">
                <!-- 鼠标点击注册切换到注册的内容，且登录内容消失 -->
                <el-button
                  type="default"
                  size="default"
                  @click="register"
                  style="width: 200px; height: 40px; margin-left: 5px"
                  >还没有账号？</el-button
                >
                <el-button
                  type="primary"
                  size="default"
                  @click="loginup"
                  style="width: 200px; height: 40px"
                  >登录</el-button
                >
              </div>
            </div>
            <!-- 关闭弹窗,与第七行的显示弹窗对应 -->
            <div @click="overlogin" style="cursor: pointer">
              <el-icon
                size="25"
                style="right: 15px; top: 15px; position: absolute; z-index: 1"
              >
                <close />
              </el-icon>
            </div>
          </div>
          <!-- 登录内容到此结束 -->
          <!-- 条件正确,通过响应式登录消失,注册显示 -->
          <div v-else="goregister.isregister">
            <div id="register">
              <img src="../img/favicon.jpg" alt="" class="logo" />
              <p style="line-height: 2px; font-size: 20px">
                &nbsp;笔忆BiYi | register
              </p>

              <div id="demo3">
                <div id="demo4">
                  <p>
                    <label for="">账号&nbsp;&nbsp;</label>
                    <el-input
                      v-model="registerfrom.reaccount"
                      placeholder="请输入注册账号"
                      type="text"
                      size="default"
                      clearable
                      @change=""
                      class="come"
                    ></el-input>
                  </p>
                  <p>
                    <label for="">密码&nbsp;&nbsp;</label>
                    <el-input
                      v-model="registerfrom.repwd"
                      placeholder="请输入注册密码"
                      type="password"
                      size="default"
                      show-password
                      @change=""
                      class="come"
                    ></el-input>
                  </p>
                  <p>
                    <el-input
                      v-model="registerfrom.arepwd"
                      placeholder="确认密码"
                      type="password"
                      size="default"
                      show-password
                      @change=""
                      class="arepwd"
                    ></el-input>
                  </p>
                </div>
                <div style="margin-top: 25px; margin-left: 10px">
                  <!-- 鼠标点击注册切换到注册的内容，且登录内容消失 -->
                  <el-button
                    type="primary"
                    size="default"
                    style="width: 200px; height: 40px"
                    @click="registerup"
                    >注册</el-button
                  >
                  <el-button
                    type="default"
                    size="default"
                    @click="login"
                    style="width: 200px; height: 40px; margin-left: 5px"
                    >已有账号?</el-button
                  >
                  <div @click="overlogin" style="cursor: pointer">
                    <el-icon
                      size="25"
                      style="
                        right: 15px;
                        top: 15px;
                        position: absolute;
                        z-index: 1;
                      "
                    >
                      <close />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>

            <img src="../img/register.jpg" alt="" class="imgre" />
          </div>
        </div>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer id="footer"
      >关于我们&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;笔忆BiYi——笔蒂I&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;帮助中心</el-footer
    >
  </el-container>
</template>
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import service from "../utils/request.js";
import live2d from "live2d-vue3";
import "live2d-vue3/dist/live2d-vue3.css";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import useStore from "../gopinia.js";
import axios, { AxiosHeaders } from "axios";
const store = useStore();

const loginfrom = reactive({
  account: "", //账号
  pwd: "", //密码
});
const registerfrom = reactive({
  reaccount: "", //注册账号
  repwd: "", //注册密码
  arepwd: "", //确认密码
});
const state = reactive({
  loginstate: store.$state.islogin,
});
const isshow = reactive({
  showlogin: false,
});
const gologin = reactive({
  islogin: true,
});
const goregister = reactive({
  isregister: false,
});
const register = () => {
  gologin.islogin = false;
  goregister.isregister = true;
};
const login = () => {
  isshow.showlogin = true;
  gologin.islogin = true;
  goregister.isregister = false;
};
const overlogin = () => {
  isshow.showlogin = false;
};
const showavatar = () => {
  let myParams = new URLSearchParams();
  myParams.append("account", store.$state.account);
  service
    .post("/showavatar", myParams, {
      headers: { token: window.localStorage.getItem("token") },
    })
    .then((response) => {
      store.$state.avatar = "data:image/png;base64," + response.data.base64;
    });
};

const loginup = () => {
  let myParams = new URLSearchParams();
  myParams.append("account", loginfrom.account);
  myParams.append("pwd", loginfrom.pwd);
  service.post("/login", myParams).then((response) => {
    if (response.data.code == 200) {
      window.localStorage.setItem("token", response.data.token);
      store.$state.account = loginfrom.account;
      store.$state.password = loginfrom.pwd;
      store.$state.uuid = response.data.user.uuid;
      store.$state.account = response.data.user.account;
      if (
        response.data.user.signature == "" ||
        response.data.user.signature == null
      ) {
        store.$state.signature = "编辑个签，展示我的独特态度！";
      } else {
        store.$state.signature = response.data.user.signature;
      }
      store.$state.address = response.data.user.address;
      if (response.data.user.phone == "" || response.data.user.phone == null) {
        store.$state.phone = "请输入手机号码";
      } else {
        store.$state.phone = response.data.user.phone;
      }
      store.$state.fulladdress = response.data.user.fulladdress;
      store.$state.gender = response.data.user.gender;
      store.$state.islogin = true;
      showavatar();
      isshow.showlogin = false;
      state.loginstate = true;
      ElMessage({
        message: "登录成功！",
        type: "success",
      });
    } else {
      ElMessage.error("账号或密码错误~");
    }
  });
};
const registerup = () => {
  let myParams = new URLSearchParams();
  myParams.append("reaccount", registerfrom.reaccount);
  myParams.append("repwd", registerfrom.repwd);
  if (registerfrom.reaccount.length>0) {
    if (registerfrom.repwd.length >= 6 && registerfrom.arepwd.length >= 6) {
      if (registerfrom.repwd == registerfrom.arepwd) {
        service.post("/register", myParams).then((response) => {
          if (response.data.code == 200) {
            ElMessage({
              message: "注册成功！",
              type: "success",
            });
          } else if (response.data.code == 500) {
            ElMessage.error("账号已存在~");
          }
        });
      } else {
        ElMessage({
          message: "两次输入密码不一致！",
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: "密码长度不得小于6位！",
        type: "warning",
      });
    }
  }else{
    ElMessage({
      message: "用户名不能为空！",
      type: "warning",
    });
  }
};
const logout = () => {
  window.localStorage.clear();
  location.reload();
};
const imgerror = () => {
  store.$state.avatar =
    "data:image/jpeg;base64,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";
};
</script>
