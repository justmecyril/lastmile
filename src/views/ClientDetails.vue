<template>
  <div class="max-w-screen-xl px-4 py-10 mx-auto">
    <div
      v-if="statusMsg || errorMsg"
      class="p-4 mb-10 rounded-md shadow-md bg-indigo-purple"
    >
      <p class="text-at-indigo-purple">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <div v-if="dataLoaded">
      <!-- Client Details -->
      <div
        class="relative flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey"
      >
        <div v-if="user" class="absolute flex left-2 top-2 gap-x-2">
          <div
            @click="editMode"
            class="flex items-center justify-center rounded-full shadow cursor-pointer w-7 h-7 bg-at-purple"
          >
            <img class="w-auto h-3" src="@/assets/images/w-pencil.svg" />
          </div>
          <div
            @click="deleteClient"
            class="flex items-center justify-center rounded-full shadow cursor-pointer h-7 w-7 bg-at-purple"
          >
            <img class="w-auto h-3" src="@/assets/images/w-trash.svg" />
          </div>
        </div>
        <img
          v-if="data.service === 'Internet'"
          class="w-auto h-24"
          src="@/assets/images/internet.svg"
        />
        <img v-else class="w-auto h-24" src="@/assets/images/wan.svg" />
        <span
          class="px-5 py-1 mt-6 text-xs text-white rounded-lg shadow-md bg-at-purple"
          >{{ data.service }}</span
        >

        <div class="w-1/2 mt-6">
          <input
            v-if="edit"
            type="text"
            class="w-full p-2 text-center text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
            v-model="data.clientName"
          />

          <h1
            v-else
            class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
          >
            <span class="inline-block w-2 h-2 mr-2 rounded-full bg-"></span>
            {{ data.clientName }}
          </h1>
        </div>

        <div class="w-1/2 mt-6 ">
          <input
            v-if="edit"
            type="text"
            class="w-full p-2 text-center text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
            v-model="data.address"
          />

          <h1
            v-else
            class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
          >
            {{ data.address }}
          </h1>
        </div>
        <div class="w-1/2 mt-6 ">
          <input
            v-if="edit"
            type="text"
            class="w-full p-2 text-center text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
            v-model="data.contactPerson"
          />
          <h1
            v-else
            class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
          >
            {{ data.contactPerson }}
          </h1>
        </div>

        <div class="flex">
          <div class="inline-block w-full mt-6 mr-6">
            <input
              v-if="edit"
              type="text"
              class="w-full p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
              v-model="data.contactEmail"
            />
            <h1
              v-else
              class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
            >
              {{ data.contactEmail }}
            </h1>
          </div>
          <div class="inline-block w-full mt-6 mr-6">
            <input
              v-if="edit"
              type="text"
              class="w-full p-2 ml-1 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
              v-model="data.contact"
            />
            <h1
              v-else
              class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
            >
              {{ data.contact }}
            </h1>
          </div>
        </div>
        <div class="flex">
          <div class="inline-block w-full mt-6 mr-6">
            <select
              v-if="edit"
              type="text"
              class="w-full p-2 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
              v-model="data.paymentTerms"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quartely">Quartely</option>
            </select>
            <h1
              v-else
              class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
            >
              {{ data.paymentTerms }}
            </h1>
          </div>
          <div class="inline-block w-full mt-6">
            <select
              v-if="edit"
              type="text"
              class="w-full p-2 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
              v-model="data.paymentMode"
            >
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Transfer">Transfer</option>
            </select>
            <h1
              v-else
              class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-at-purple"
            >
              {{ data.paymentMode }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Sites -->
      <div class="flex flex-col p-8 mt-10 rounded-md item-center bg-light-grey">
        <!-- Internet Service -->
        <div
          v-if="data.service === 'Internet'"
          class="flex flex-col w-full gap-y-4"
        >
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
            v-for="(item, index) in data.sites"
            :key="index"
          >
            <div class="flex flex-col flex-2 md:w-1/3">
              <label
                for="siteName"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Site Name</label
              >
              <input
                v-if="edit"
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteName"
              />
              <p v-else>{{ item.siteName }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="contractor"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Contractor</label
              >
              <select
                v-if="edit"
                class="p-2 text-gray-500 focus:outline-none"
                id="contractor"
                required
                v-model="item.contractor"
              >
                <option value="Csquared">Csquared</option>
                <option value="Vodafone">Vodafone</option>
                <option value="E-connecta">E-connecta</option>
              </select>
              <p v-else>{{ item.contractor }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="activationDate"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Activation Date</label
              >
              <input
                v-if="edit"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="date"
                id="activationDate"
                name="activationDate"
                min="2000-01-01"
                max="3000-12-31"
                v-model="item.activationDate"
              />
              <p v-else>{{ item.activationDate }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="siteCode"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Site Code</label
              >
              <input
                v-if="edit"
                type="text"
                id="siteCode"
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteCode"
              />
              <p v-else>{{ item.siteCode }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="bandwidth"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Bandwith</label
              >
              <select
                v-if="edit"
                class="p-2 text-gray-500 focus:outline-none"
                id="bandwidth"
                required
                v-model="item.bandwidth"
              >
                <option value="2Mbps">2Mbps</option>
                <option value="5Mbps">5Mbps</option>
                <option value="10Mbps">10Mbps</option>
                <option value="25Mbps">25Mbps</option>
                <option value="50Mbps">50Mbps</option>
                <option value="100Mbps">100Mbps</option>
              </select>
              <p v-else>{{ item.bandwidth }}</p>
            </div>
            <img
              @click="deleteSite(item.id)"
              v-if="edit"
              src="@/assets/images/b-trash.svg"
              class="absolute w-auto h-4 cursor-pointer -left-5"
            />
          </div>
          <button
            @click="addSite"
            v-if="edit"
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-at-indigo-purple"
          >
            Add Site
          </button>
        </div>

        <!-- Wan & Internet Service -->
        <div v-else class="flex flex-col w-full gap-y-4">
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
            v-for="(item, index) in data.sites"
            :key="index"
          >
            <div class="flex flex-col flex-2 md:w-1/3">
              <label
                for="siteName"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Site Name</label
              >
              <input
                v-if="edit"
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteName"
              />
              <p v-else>{{ item.siteName }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="contractor"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Contractor</label
              >
              <select
                v-if="edit"
                class="p-2 text-gray-500 focus:outline-none"
                id="contractor"
                required
                v-model="item.contractor"
              >
                <option value="Csquared">Csquared</option>
                <option value="Vodafone">Vodafone</option>
                <option value="E-connecta">E-connecta</option>
              </select>
              <p v-else>{{ item.contractor }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="activationDate"
                class="mb-1 font-bold ext-sm text-at-indigo-purple"
                >Activation Date</label
              >
              <input
                v-if="edit"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="date"
                id="activationDate"
                name="activationDate"
                min="2000-01-01"
                max="3000-12-31"
                v-model="item.activationDate"
              />
              <p v-else>{{ item.activationDate }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="siteCode"
                class="mb-1 text-sm font-bold text-at-indigo-purple"
                >Site Code</label
              >
              <input
                v-if="edit"
                type="text"
                id="siteCode"
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteCode"
              />
              <p v-else>{{ item.siteCode }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="bandwidth"
                class="mb-1 font-bold ext-sm text-at-indigo-purple"
                >Bandwith</label
              >
              <select
                v-if="edit"
                class="p-2 text-gray-500 focus:outline-none"
                id="bandwidth"
                required
                v-model="item.bandwidth"
              >
                <option value="2Mbps">2Mbps</option>
                <option value="5Mbps">5Mbps</option>
                <option value="10Mbps">10Mbps</option>
                <option value="25Mbps">25Mbps</option>
                <option value="50Mbps">50Mbps</option>
                <option value="100Mbps">100Mbps</option>
              </select>
              <p v-else>{{ item.bandwidth }}</p>
            </div>
            <div class="flex flex-col flex-2 ">
              <label
                for="bandwidth"
                class="mb-1 font-bold ext-sm text-at-indigo-purple"
                >Service</label
              >
              <select
                v-if="edit"
                class="p-2 text-gray-500 focus:outline-none"
                id="service"
                required
                v-model="item.service"
              >
                <option value="Internet">Internet</option>
                <option value="Wan">Wan</option>
              </select>
              <p v-else>{{ item.service }}</p>
            </div>
            <img
              @click="deleteSite(item.id)"
              v-if="edit"
              src="@/assets/images/b-trash.svg"
              class="absolute w-auto h-4 cursor-pointer -left-5"
            />
          </div>
          <button
            v-if="edit"
            @click="addSite"
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-indigo-purple"
          >
            Add Site
          </button>
        </div>
      </div>

      <!-- Update -->
      <button
        @click="updateClient"
        v-if="edit || isPending"
        type="button"
        class="self-start px-6 py-2 mt-10 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-indigo-purple"
      >
        Update Client
      </button>
      <button
        v-if="isPending"
        disabled
        type="button"
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
      >
        <svg
          role="status"
          class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Updating...
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "@/supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from "@/store/index";
import { uid } from "uid";
export default {
  name: "ClientView",
  setup() {
    // Create data
    const isPending = ref(false);
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => store.state.user);

    //Get current Id of route
    const currentId = route.params.clientId;

    // Get Client data
    const getData = async () => {
      try {
        isPending.value = true;
        const { data: lastmile, error } = await supabase
          .from("lastmile")
          .select("*")
          .eq("id", currentId);
        isPending.value = false;
        if (error) throw error;
        data.value = lastmile[0];
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
        isPending.value = false;
      }
    };

    getData();

    // Delete Client
    const deleteClient = async () => {
      try {
        const { error } = await supabase
          .from("lastmile")
          .delete()
          .eq("id", currentId);
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = "Error: ${error.message}";
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    //Edit mode
    const edit = ref(null);

    const editMode = () => {
      edit.value = !edit.value;
    };

    //Add site
    const addSite = () => {
      if (data.value.service === "Internet") {
        data.value.sites.push({
          id: uid(),
          siteName: "",
          contractor: "",
          activationDate: "",
          siteCode: "",
          bandwidth: "",
        });
        return;
      }
      data.value.sites.push({
        id: uid(),
        siteName: "",
        contractor: "",
        activationDate: "",
        siteCode: "",
        service: "",
        bandwidth: "",
      });
    };

    // Delete Site
    const deleteSite = (id) => {
      if (data.value.sites.length > 1) {
        data.value.sites = data.value.sites.filter((site) => site.id !== id);
        return;
      }
      errorMsg.value = "Error: Cannot remove, need to at least have one site";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    };

    //Update Client
    const updateClient = async () => {
      try {
        const { error } = await supabase
          .from("lastmile")
          .update({
            clientName: data.value.clientName,
            address: data.value.address,
            contactPerson: data.value.contactPerson,
            contactEmail: data.value.contactEmail,
            contact: data.value.contact,
            paymentTerms: data.value.paymentTerms,
            paymentMode: data.value.paymentMode,
            service: data.value.service,
            sites: data.value.sites,
          })
          .eq("id", currentId);
        if (error) throw error;
        edit.value = false;
        statusMsg.value = "Success: Client updated!";

        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    return {
      data,
      dataLoaded,
      edit,
      editMode,
      user,
      errorMsg,
      statusMsg,
      deleteClient,
      addSite,
      route,
      deleteSite,
      updateClient,
    };
  },
};
</script>
