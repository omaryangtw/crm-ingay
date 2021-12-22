<template>
  <div class="bg-gray-100">
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modal"
        class="fixed inset-0 w-screen h-screen bg-gray-500 bg-opacity-50"
        @click="modal = false"
      >
        <div
          class="z-50 relative top-20 w-80 mx-auto rounded-md bg-white"
          @click.stop
        >
          <div class="w-full h-2/12 p-4 rounded-tl-md rounded-tr-md bg-red-500">
            <h2 class="text-xl text-gray-50">確定刪除{{ client.name }}？</h2>
          </div>
          <div class="p-4 text-lg">
            <p>這個動作將會刪除 {{ client.name }} 的整筆資料</p>
            <div class="mt-8 flex justify-between">
              <button
                @click="remove"
                class="px-4 py-2 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                刪除
              </button>
              <button
                @click="modal = false"
                class="px-4 py-2 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-gray-500 hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="max-w-screen-lg m-auto pt-24 min-h-screen">
      <div class="flex justify-between">
        <div class="flex items-baseline">
          <svg
            v-show="client.sex === '男'"
            class="h-8 w-8"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 9c1.29 0 2.5.41 3.47 1.11L17.58 5H13V3h8v8h-2V6.41l-5.11 5.09c.7 1 1.11 2.2 1.11 3.5a6 6 0 0 1-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6m0 2a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4z"
              fill="#3B82F6"
            />
          </svg>
          <svg
            v-show="client.sex === '女'"
            class="h-8 w-8"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4a6 6 0 0 1 6 6c0 2.97-2.16 5.44-5 5.92V18h2v2h-2v2h-2v-2H9v-2h2v-2.08c-2.84-.48-5-2.95-5-5.92a6 6 0 0 1 6-6m0 2a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4z"
              fill="#EF4444"
            />
          </svg>
          <h3
            class="text-3xl font-medium"
            :class="{ 'text-red-600': client.isDead }"
          >
            {{ client.name }}
          </h3>
          <span v-show="client.householdadmin"
            ><svg class="h-8 w-8" viewBox="0 0 20 20">
              <path
                d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"
              ></path></svg
          ></span>
          <div id="status" class="ml-2">
            <span
              class="p-1 m-1 rounded-lg"
              :class="[client.canCall ? 'bg-green-300' : 'bg-red-300']"
            >
              {{ client.canCall ? '可' : '不可' }}電聯
            </span>
            <span
              class="p-1 m-1 rounded-lg"
              :class="[client.canMail ? 'bg-green-300' : 'bg-red-300']"
            >
              {{ client.canMail ? '可' : '不可' }}郵寄
            </span>
            <span
              v-if="client.disabledStatus"
              class="p-1 m-1 rounded-lg text-white"
              :class="{
                'bg-red-300': client?.disabledStatus === '輕度',
                'bg-red-500': client?.disabledStatus === '中度',
                'bg-red-700': client?.disabledStatus === '重度',
                'bg-red-900': client?.disabledStatus === '極重度',
              }"
            >
              {{
                client.disabledStatus === '輕度'
                  ? '輕度身心障礙'
                  : client.disabledStatus === '中度'
                  ? '中度身心障礙'
                  : client.disabledStatus === '重度'
                  ? '中度身心障礙'
                  : client.disabledStatus === '極重度'
                  ? '極重度身心障礙'
                  : ''
              }}
            </span>
            <span
              v-if="client.incomeStatus"
              class="p-1 m-1 rounded-lg text-white"
              :class="{
                'bg-red-300': client?.incomeStatus === '中低收老人',
                'bg-red-500': client?.incomeStatus === '中低收入戶',
                'bg-red-700': client?.incomeStatus === '低收入戶',
                'bg-yellow-500': client?.incomeStatus === '經濟困難',
                'bg-yellow-400': client?.incomeStatus === '邊緣戶',
              }"
            >
              {{
                client.incomeStatus === '中低收老人'
                  ? '中低收老人'
                  : client.incomeStatus === '中低收入戶'
                  ? '中低收入戶'
                  : client.incomeStatus === '低收入戶'
                  ? '低收入戶'
                  : client.incomeStatus === '經濟困難'
                  ? '經濟困難'
                  : client.incomeStatus === '邊緣戶'
                  ? '邊緣戶'
                  : ''
              }}
            </span>
          </div>
        </div>

        <div class="">
          <button
            @click="edit"
            class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            編輯
          </button>
          <button
            @click="modal = true"
            class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            刪除
          </button>
        </div>
      </div>

      <div class="shadow overflow-hidden">
        <div class="grid grid-cols-4">
          <div>
            <router-link :to="{ path: `/client/${$route.params.clientId}` }"
              >資料</router-link
            >
          </div>
          <div>
            <router-link
              :to="{ path: `/client/${$route.params.clientId}/cases` }"
              >服務案件</router-link
            >
          </div>
          <div>
            <router-link
              :to="{ path: `/client/${$route.params.clientId}/family` }"
              >家人 ({{ client?.Family?.length }})
            </router-link>
          </div>
        </div>
        <div>
          <router-view :client="client"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from '../../services/ClientService';

export default {
  name: 'Client',
  components: {},
  data() {
    return {
      client: {
        id: '',
      },
      // modal for confirm remove
      modal: false,
    };
  },
  methods: {
    edit() {
      this.$router.push(`/client/${this.$route.params.clientId}/edit`);
    },
    async remove() {
      try {
        await ClientService.remove(this.$route.params.clientId);
        this.$router.push('/clients');
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.client = (await ClientService.get(this.$route.params.clientId)).data;
  },
  computed: {
    age: function () {
      return 2021 - parseInt(this.client.birthday);
    },
  },
};
</script>

<style></style>
