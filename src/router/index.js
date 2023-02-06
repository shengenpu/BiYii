import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../index/login.vue";
import Mine from "../index/mine.vue";
import { ElMessage } from "element-plus";
import tIndex from "../index/index.vue";
import idle from "../index/idle.vue";
import buyit from "../index/buyit.vue";
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "/index",
        name: "index",
        component: tIndex,
        meta: {
          title: "首页",
        },
      },
      {
        path: "/mine",
        name: "mine",
        component: Mine,
        meta: {
          title: "个人主页",
        },
      },
      {
        path: "/idle",
        name: "idle",
        component: idle,
        meta: {
          title: "出闲置",
        },
      },
      {
        path: "/buyit",
        name:"buyit",
        component:buyit,
        meta: {
          title: "商品详细",
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token || to.path == "/index") {
    next();
  } else {
    ElMessage({
      message: "未检测到登录状态...",
      type: "warning",
    });
    next("/index");
  }
});
export default router;
