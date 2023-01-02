import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../index/login.vue";
import Mine from "../index/mine.vue";
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children:[
      {path:'/mine',name:'mine',component:Mine,
      meta:{
        title:'个人主页',
      },
    },
    ]
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token || to.path == "/") {
    next();
  } else {
    next("/");
  }
});
export default router;
