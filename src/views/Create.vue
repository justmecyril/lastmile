<template>
  <div class="max-w-screen-xl px-4 py-10 mx-auto">
    <!-- Status Message/ Error Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="p-4 mb-10 rounded-md shadow-lg bg-light-grey"
    >
      <p class="text-at-indigo-purple">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Create -->
    <div class="flex items-start p-8 rounded-md shadow-lg bg-light-grey">
      <!-- Form -->
      <form @submit.prevent="addClient" class="flex flex-col w-full gap-y-5">
        <h1 class="text-2xl text-at-indigo-purple">Setup New Client</h1>

        <div class="flex flex-col">
          <label for="clientName" class="mb-1 text-sm text-at-indigo-purple"
            >Client Name</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="clientName"
            v-model="clientName"
          />
        </div>
        <div class="flex flex-col">
          <label for="address" class="mb-1 text-sm text-at-indigo-purple"
            >Address</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="address"
            v-model="address"
          />
        </div>
        <div class="flex flex-col">
          <label for="contactPerson" class="mb-1 text-sm text-at-indigo-purple"
            >Contact Person</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="contactPerson"
            v-model="contactPerson"
          />
        </div>
        <div class="flex flex-col">
          <label for="contactEmail" class="mb-1 text-sm text-at-indigo-purple"
            >Contact Email</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="contactEmail"
            v-model="contactEmail"
          />
        </div>
        <div class="flex flex-col ">
          <label for="contact" class="mb-1 text-sm text-at-indigo-purple"
            >Contact</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="contact"
            v-model="contact"
          />
        </div>
        <div class="flex flex-col ">
          <label for="paymentTerms" class="mb-1 text-sm text-at-indigo-purple"
            >Payment Terms</label
          >
          <select
            class="p-2 text-gray-500 focus:outline-none"
            id="paymentTerms"
            required
            v-model="paymentTerms"
          >
            <option value="">Select Payment Term</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="paymentMode" class="mb-1 text-sm text-at-indigo-purple"
            >Payment Mode</label
          >
          <select
            class="p-2 text-gray-500 focus:outline-none"
            id="paymentMode"
            required
            v-model="paymentMode"
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="service" class="mb-1 text-sm text-at-indigo-purple"
            >Type of Service</label
          >
          <select
            class="p-2 text-gray-500 focus:outline-none"
            id="service"
            required
            v-model="service"
          >
            <option value="">Select Type of Service</option>
            <option value="Internet">Internet</option>
            <option value="Wan/Internet">Wan & Internet</option>
          </select>
        </div>

        <!-- Internet/Wan Sites Inputs -->
        <div v-if="service === 'Wan/Internet'" class="flex flex-col gap-y-4">
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
            v-for="(item, index) in siteList"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="siteName" class="mb-1 text-sm text-at-light-green"
                >Site Name</label
              >
              <input
                type="text"
                required
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteName"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="contractor" class="mb-1 text-sm text-at-light-green"
                >Contractor</label
              >
              <select
                class="p-2 text-gray-500 focus:outline-none"
                id="contractor"
                required
                v-model="item.contractor"
              >
                <option value="Csquared">Csquared</option>
                <option value="Vodafone">Vodafone</option>
                <option value="E-connecta">E-connecta</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label
                for="activationDate"
                class="mb-1 text-sm text-at-indigo-purple"
                >Activation Date</label
              >
              <input
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="date"
                id="activationDate"
                name="activationDate"
                min="2000-01-01"
                max="3000-12-31"
                v-model="item.activationDate"
              />
            </div>
            <div class="flex flex-col flex-1 ">
              <label for="siteCode" class="mb-1 text-sm text-at-indigo-purple"
                >Site Code</label
              >
              <input
                type="text"
                required
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteCode"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="service" class="mb-1 text-sm text-at-indigo-purple"
                >Service</label
              >
              <select
                class="p-2 text-gray-500 focus:outline-none"
                id="service"
                required
                v-model="item.service"
              >
                <option value="Internet">Internet</option>
                <option value="Wan">Wan</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="bandwidth" class="mb-1 text-sm text-at-indigo-purple"
                >Bandwidth</label
              >
              <select
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
            </div>
            <img
              @click="deleteSite(item.id)"
              src="@/assets/images/b-trash.svg"
              class="absolute w-auto h-4 cursor-pointer -left-5"
              alt=""
            />
          </div>
          <button
            @click="addSite"
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-indigo-purple"
          >
            Add Site
          </button>
        </div>

        <!-- Internet Sites Inputs -->
        <div v-if="service === 'Internet'" class="flex flex-col gap-y-4">
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
            v-for="(item, index) in siteList"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="siteName" class="mb-1 text-sm text-at-indigo-purple"
                >Site Name</label
              >
              <input
                type="text"
                required
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteName"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="contractor" class="mb-1 text-sm text-at-indigo-purple"
                >Contractor</label
              >
              <select
                class="p-2 text-gray-500 focus:outline-none"
                id="contractor"
                required
                v-model="item.contractor"
              >
                <option value="Csquared">Csquared</option>
                <option value="Vodafone">Vodafone</option>
                <option value="E-connecta">E-connecta</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label
                for="activationDate"
                class="mb-1 text-sm text-at-indigo-purple"
                >Activation Date</label
              >
              <input
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="date"
                id="activationDate"
                name="activationDate"
                min="2000-01-01"
                max="3000-12-31"
                v-model="item.activationDate"
              />
            </div>
            <div class="flex flex-col flex-1 ">
              <label for="siteCode" class="mb-1 text-sm text-at-indigo-purple"
                >Site Code</label
              >
              <input
                type="text"
                required
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-model="item.siteCode"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="bandwidth" class="mb-1 text-sm text-at-indigo-purple"
                >Bandwidth</label
              >
              <select
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
            </div>
            <img
              @click="deleteSite(item.id)"
              src="@/assets/images/b-trash.svg"
              class="absolute w-auto h-4 cursor-pointer -left-5"
              alt=""
            />
          </div>
          <button
            @click="addSite"
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-indigo-purple"
          >
            Add Site
          </button>
        </div>
        <button
          v-if="isPending"
          type="submit"
          class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-indigo-purple hover:border-at-indigo-purple hover:bg-white hover:text-at-indigo-purple"
        >
          Add Client
        </button>
        <button
          v-if="isPending"
          disabled
          type="button"
          class="self-start px-6 py-2 mt-6 text-sm duration-200 bg-white border-2 border-transparent border-solid rounded-sm text-at-indigo-purple"
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
          Saving...
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "@/supabase/init";
import { uid } from "uid";
export default {
  setup() {
    //Create data
    const isPending = ref(false);
    const clientName = ref("");
    const address = ref("");
    const contactPerson = ref("");
    const contactEmail = ref("");
    const contact = ref("");
    const paymentTerms = ref("");
    const paymentMode = ref("");
    const service = ref("select-service");
    const siteList = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    //Add Site
    const addSite = () => {
      if (service.value === "Internet") {
        siteList.value.push({
          id: uid(),
          siteName: "",
          contractor: "",
          activationDate: "",
          siteCode: "",
          bandwidth: "",
        });
        return;
      }
      siteList.value.push({
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
      if (siteList.value.length > 1) {
        siteList.value = siteList.value.filter((site) => site.id !== id);
        return;
      }
      errorMsg.value = "Error: Cannot remove, need to at least have one site";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    };

    // Listens for changing of service type input
    const serviceChange = () => {
      siteList.value = [];
      addSite();
    };

    //Add Client
    const addClient = async () => {
      try {
        isPending.value = true;
        const { error } = await supabase.from("lastmile").insert([
          {
            clientName: clientName.value,
            address: address.value,
            contactPerson: contactPerson.value,
            contactEmail: contactEmail.value,
            contact: contact.value,
            paymentTerms: paymentTerms.value,
            paymentMode: paymentMode.value,
            service: service.value,
            sites: siteList.value,
          },
        ]);
        isPending.value = false;
        if (error) throw error;
        statusMsg.value = "Success: Client Added!";
        clientName.value = null;
        address.value = null;
        contactPerson.value = null;
        contactEmail.value = null;
        contact.value = null;
        paymentTerms.value = "Select Payment Term";
        paymentMode.value = "Select Payment Mode";
        service.value = "Select Type of Service";
        siteList.value = [];
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
        isPending.value = false;
      }
    };

    return {
      clientName,
      address,
      contactPerson,
      contactEmail,
      contact,
      paymentTerms,
      paymentMode,
      service,
      siteList,
      statusMsg,
      errorMsg,
      addSite,
      serviceChange,
      deleteSite,
      addClient,
    };
  },
};
</script>

<style></style>
