<template>
  <header class="text-white bg-at-indigo-purple">
    <nav
      class="container flex flex-col items-center gap-4 px-4 py-5 sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <img class="w-20" src="../assets/images/logo.png" alt="" />
        <router-link class="cursor-pointer" :to="{ name: 'Home' }"
          >LastMile</router-link
        >
      </div>
      <ul class="flex justify-end flex-1 gap-x-10">
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Create' }"
          >Create</router-link
        >
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store/index";
import { computed } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);

    // Setup ref to the router
    const router = useRouter();

    //Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Login" });
    };

    return { logout, user };
  },
};
</script>
