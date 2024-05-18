import { RouteRecordRaw, createMemoryHistory, createRouter } from "vue-router";

import HomeView from '../views/homeView/HomeView.vue'
import Me from '../views/me/Me.vue'
import Message from '../views/message/Message.vue'
import Shop from "../views/shop/Shop.vue";

const routes:Array<RouteRecordRaw> = [
    {name:"home", path:"/",component: HomeView},
    { name:"me", path:"/me",component: Me},
    {name:"message", path:"/message", component: Message},
    { name:"shop",path:"/shop", component: Shop},


    // me
    // 懒加载
    {
        path:"/me/for-update",
        component: ()=>import('../views/me/children/ForUpdate.vue')
    },
    {
        path:"/me/visitor",
        component: ()=>import('../views/me/children/Visitor.vue')
    },
    {
        path:"/me/edit-userinfo",
        component: ()=>import('../views/me/children/EditUserinfo.vue')
    }
]
    
const router = createRouter({
    history:createMemoryHistory(),
    routes
})

export default router