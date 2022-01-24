import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register";
import Create from "@/views/Create";
import ClientDetails from "@/views/ClientDetails";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      auth: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create",
      auth: true
    },
  },
  {
    path: "/client-details/:clientId",
    name: "ClientDetails",
    component: ClientDetails,
    meta: {
      title: "ClientDetails",
      auth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Last Mile`;
  next();
});


//Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: 'Login' });
    return
  }
  next()
});

export default router;
