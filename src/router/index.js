import { createRouter, createWebHashHistory} from "vue-router";

// ✔ 실제 존재하는 파일만 import
import HomeComponent from "@/components/Home/Home.vue";
import AuthContainer from "@/components/login/AuthContainer.vue";
import Popular from "@/components/Popular/Popular.vue";
import Search from "@/components/Search/Search.vue";
import Wishlist from "@/components/Wishlist/Wishlist.vue";

const routes = [
    {
        path: "/signin",
        name: "signin",
        component: AuthContainer,
    },
    {
        path: "/",
        name: "home",
        component: HomeComponent,
    },
    {
        path: "/popular",
        component: Popular
    },
    {
        path: "/search",
        name: "search",
        component: Search
    },
    {
        path: "/wishlist",
        component: Wishlist
    }
];

// Router 생성
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//로그인 여부 확인 미들웨어
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("currentUser"); // 변경됨 🔥

    if (!isLoggedIn && to.path !== "/signin") {
        next("/signin");
    } else {
        next();
    }
});


export default router;