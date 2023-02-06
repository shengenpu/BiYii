import { defineStore } from "pinia"
export default defineStore('main',{
    //数据仓库
    state:()=>{
        return{
            uuid:'',
            account:'',
            password:'',
            islogin:false,
            avatar:'',
            gender:'',
            phone:'',
            address:'',
            fulladdress:'',
            signature:'',
            goodsid:'',
            goodslist:{},
            goodshave6:[],
            showgoodsone:{},
            goodoneimg:[],
            orderlist:[]
        }
    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        // 修改为 sessionStorage，默认为 localStorage
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['uuid','account','password','islogin','avatar','gender','phone','address','fulladdress','signature','goodoneimg','showgoodsone'],
      },
    getters:{

    },
    actions: {

    }
});
