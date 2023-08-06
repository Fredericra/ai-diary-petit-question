import { createRouter,createWebHistory } from "vue-router";
import Access from "../Page/Acces.vue";
import Home from "../Page/Home.vue";
import About from "../Page/About.vue";
import Reponse from "../Page/Reponse.vue";
import Foud from "../Page/PageNout.vue";
const routes = [
    {
        path:"/",
        component:Home,
        name:"home"
    },
    {
        path:"/jeux",
        component:Access,
        name:"access"
    },
    {
        path:"/reponse",
        component:Reponse,
        name:"reponse"
    },
    {
        path:"/about",
        component:About,
        name:"about"
    },
    {
        path:"/:catchAll(.*)*",
        name:"rien",
        component:Foud
    }
];
const  router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;