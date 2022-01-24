<template>
  <div v-if="dataLoaded" class="container px-4 mt-10">
    <!-- No Data -->
    <div v-if="data.length === 0" class="flex flex-col items-center w-full">
      <h1 class="text-2xl">No Data found...</h1>
      <router-link
        class="px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        :to="{ name: 'Create' }"
        >Add Client</router-link
      >
    </div>

    <!-- Data -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <router-link
        class="flex flex-col items-center p-8 shadow-md cursor-pointer f fle-col bg-light-grey"
        :to="{ name: 'ClientDetails', params: { clientId: client.id} }"
        v-for="(client, index) in data"
        :key="index"
      >
        <!-- Internet Img -->
        <img
          v-if="client.service === 'Internet'"
          src="@/assets/images/internet.svg"
          class="w-auto h-24"
        />

        <!-- Wan and Internet Img -->
        <img v-else src="@/assets/images/wan.svg" /> 

        <p
          class="px-3 py-1 mt-6 text-sm text-white rounded-lg shadow-md bg-at-light-green"
        >
          {{ client.service }}
        </p>

        <h1 class="mt-8 mb-2 text-xl text-center text-at-light-green">
          {{ client.clientName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
export default {
  name: "home",
  components: {},
  setup() {
    // Create data / vars
    const data = ref([]);
    const dataLoaded = ref(null);

    //Get data
    const getData = async () => {
      try {
        const { data: lastmile, error } = await supabase
          .from("lastmile")
          .select("*");
        if (error) throw error;
        data.value = lastmile;
        dataLoaded.value = true;
      } catch (error) {
        console.warn(error.message);
      }
    };

    //Run data function
    getData();

    return { data, dataLoaded };
  },
};
</script>
