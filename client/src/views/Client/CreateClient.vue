<template>
  <div class="bg-gray-100 h-screen pt-24">
    <div class="max-w-screen-lg m-auto">
      <div class="flex justify-between">
        <div class="flex items-baseline">
          <svg
            v-show="client.sex === 'male'"
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
            v-show="client.sex === 'female'"
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
              <span v-html="client.canCall ? '可' : '不可'"></span>電聯
            </span>
            <span
              class="p-1 m-1 rounded-lg"
              :class="[client.canMail ? 'bg-green-300' : 'bg-red-300']"
            >
              <span v-html="client.canMail ? '可' : '不可'"></span>郵寄
            </span>
            <span
              v-if="client.disabledStatus"
              class="p-1 m-1 rounded-lg text-white"
              :class="{
                'bg-red-300': client?.disabledStatus === 'light',
                'bg-red-500': client?.disabledStatus === 'mid',
                'bg-red-700': client?.disabledStatus === 'heavy',
              }"
            >
              {{
                client.disabledStatus === 'light'
                  ? '輕度身心障礙'
                  : client.disabledStatus === 'mid'
                  ? '中度身心障礙'
                  : client.disabledStatus === 'heavy'
                  ? '重度身心障礙'
                  : ''
              }}
            </span>
            <span
              v-if="client.incomeStatus"
              class="p-1 m-1 rounded-lg text-white"
              :class="{
                'bg-red-300': client?.incomeStatus === 'mid-low-elderly',
                'bg-red-500': client?.incomeStatus === 'mid-low',
                'bg-red-700': client?.incomeStatus === 'low',
              }"
            >
              {{
                client.incomeStatus === 'mid-low-elderly'
                  ? '中低收老人'
                  : client.incomeStatus === 'mid-low'
                  ? '中低收入戶'
                  : client.incomeStatus === 'low'
                  ? '低收入戶'
                  : ''
              }}
            </span>
          </div>
        </div>

        <div class="">
          <button
            @click="create"
            class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            儲存
          </button>
          <button
            @click="this.$router.go(-1)"
            class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            離開但不儲存
          </button>
        </div>
      </div>

      <div class="shadow overflow-hidden">
        <div class="px-4 py-5 bg-gray-100">
          <div class="grid grid-cols-12 gap-x-6 gap-y-1">
            <div class="col-span-3">
              <label for="name" class="font-semibold text-gray-900">姓名</label>
              <input
                type="text"
                id="name"
                class="font-medium text-gray-900 w-11/12"
                v-model="client.name"
              />
            </div>
            <div class="col-span-3">
              <label for="nameAlt" class="font-semibold text-gray-900"
                >族名</label
              >
              <input
                type="text"
                id="nameAlt"
                class="font-medium text-gray-900 w-11/12"
                v-model="client.nameAlt"
              />
            </div>

            <div class="col-span-3">
              <label for="IDN" class="font-semibold text-gray-900">性別</label>
              <select
                id="sex"
                name="sex"
                v-model="client.sex"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>

            <div class="col-span-3">
              <label for="householdadmin" class="font-semibold text-gray-900"
                >戶長</label
              >
              <span class="flex">
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="client.householdadmin"
                  class="block h-5 w-5"
                />
                <label for="checkbox">{{
                  client.householdadmin ? '戶長' : '不是戶長'
                }}</label>
              </span>
            </div>

            <div class="col-span-3">
              <label for="birthday" class="font-semibold text-gray-900"
                >生日</label
              >
              <input
                type="date"
                id="birthday"
                class="font-medium text-gray-900 w-11/12"
                v-model="client.birthday"
              />
            </div>

            <div class="col-span-3">
              <label for="age" class="font-semibold text-gray-900">年紀</label>
              <div class="flex">
                <span v-if="age" class="font-semibold text-gray-900"
                  >{{ age }}
                </span>

                <span v-if="age" class="font-semibold text-gray-900">歲 </span>
              </div>
            </div>

            <div class="col-span-6">
              <label for="IDN" class="font-semibold text-gray-900"
                >身分證號</label
              >
              <input
                type="text"
                name="IDN"
                v-model="client.IDN"
                id="IDN"
                class="w-full"
              />
            </div>
            <div class="col-span-3">
              <label for="group" class="font-semibold text-gray-900"
                >族別</label
              >
              <input
                type="text"
                name="group"
                v-model="client.group"
                id="group"
                class="w-full"
              />
            </div>
            <div class="col-span-3">
              <label for="plainMountain" class="font-semibold text-gray-900"
                >平原/山原</label
              >
              <select
                id="plainMountain"
                name="plainMountain"
                v-model="client.plainMountain"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option value="平原">平原</option>
                <option value="山原">山原</option>
              </select>
            </div>
            <div class="col-span-6">
              <label for="tribe" class="font-semibold text-gray-900"
                >部落</label
              >
              <input
                type="text"
                name="tribe"
                id="tribe"
                v-model="client.tribe"
                class="w-full"
              />
            </div>

            <div class="hidden col-span-12" aria-hidden="true">
              <div class="py-3">
                <div class="border-t border-gray-400"></div>
              </div>
            </div>

            <div class="col-span-3">
              <label for="mobile" class="font-semibold text-gray-900"
                >電話聯繫</label
              >
              <select
                name="canCall"
                v-model="client.canCall"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option :value="true">可以</option>
                <option :value="false">不可以</option>
              </select>
            </div>

            <div class="col-span-3">
              <label for="mobileNote" class="font-semibold text-gray-900"
                >郵寄</label
              >
              <select
                name="canMail"
                v-model="client.canMail"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option :value="true">可以</option>
                <option :value="false">不可以</option>
              </select>
            </div>

            <div class="col-span-3">
              <label for="disabledStatus" class="font-semibold text-gray-900"
                >身心障礙</label
              >
              <select
                name="disabledStatus"
                v-model="client.disabledStatus"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option value="light">輕度身心障礙</option>
                <option value="mid">中度身心障礙</option>
                <option value="heavy">重度身心障礙</option>
                <option value="ultra-heavy">極重度身心障礙</option>
              </select>
            </div>

            <div class="col-span-3">
              <label for="incomeStatus" class="font-semibold text-gray-900"
                >低收入戶</label
              >
              <select
                name="incomeStatus"
                v-model="client.incomeStatus"
                class="w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none"
              >
                <option value="low">低收入戶</option>
                <option value="mid-low">中低收入戶</option>
                <option value="mid-low-elderly">中低收老人</option>
              </select>
            </div>

            <div class="col-span-3">
              <label for="disabledStatus" class="font-semibold text-gray-900"
                >手機1</label
              >
              <input
                type="text"
                name="mobile"
                id="mobile"
                v-model="client.mobile"
                class="w-full"
              />
            </div>

            <div class="col-span-3">
              <label for="mobileNote" class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                type="text"
                name="mobileNote"
                id="mobileNote"
                v-model="client.mobileNote"
                class="w-full"
              />
            </div>
            <div class="col-span-3">
              <label for="mobileAlt" class="font-semibold text-gray-900"
                >手機2</label
              >
              <input
                type="text"
                name="mobileAlt"
                id="mobileAlt"
                v-model="client.mobileAlt"
                class="w-full"
              />
            </div>

            <div class="col-span-3">
              <label for="mobileAltNote" class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                type="text"
                name="mobileAltNote"
                id="mobileAltNote"
                v-model="client.mobileAltNote"
                class="w-full"
              />
            </div>
            <div class="col-span-3">
              <label for="phone" class="font-semibold text-gray-900"
                >家用1</label
              >
              <input
                type="text"
                name="phone"
                id="phone"
                v-model="client.phone"
                class="w-full"
              />
            </div>

            <div class="col-span-3">
              <label for="phoneNote" class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                type="text"
                name="phoneNote"
                id="phoneNote"
                v-model="client.phoneNote"
                class="w-full"
              />
            </div>
            <div class="col-span-3">
              <label for="phoneAlt" class="font-semibold text-gray-900"
                >家用2</label
              >
              <input
                type="text"
                name="phoneAlt"
                id="phoneAlt"
                v-model="client.phoneAlt"
                class="w-full"
              />
            </div>

            <div class="col-span-3">
              <label for="phoneAltNote" class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                type="text"
                name="phoneAltNote"
                id="phoneAltNote"
                v-model="client.phoneAltNote"
                class="w-full"
              />
            </div>

            <div class="hidden col-span-12" aria-hidden="true">
              <div class="py-3">
                <div class="border-t border-gray-400"></div>
              </div>
            </div>

            <div class="col-span-2">
              <label for="city" class="font-semibold text-gray-900">縣市</label>
              <input
                type="text"
                name="city"
                id="city"
                v-model="client.city"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label for="dist" class="font-semibold text-gray-900">區</label>
              <input
                type="text"
                name="dist"
                id="dist"
                v-model="client.dist"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label for="vill" class="font-semibold text-gray-900">里</label>
              <input
                type="text"
                name="vill"
                id="vill"
                v-model="client.vill"
                class="w-full"
              />
            </div>

            <div class="col-span-4">
              <label for="addr" class="font-semibold text-gray-900">地址</label>
              <input
                type="text"
                name="addr"
                id="addr"
                v-model="client.addr"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label for="addrNote" class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                type="text"
                name="addrNote"
                id="addrNote"
                v-model="client.addrNote"
                class="w-full"
              />
            </div>

            <div class="col-span-2">
              <label
                v-if="client.addr"
                for="cityAlt"
                class="font-semibold text-gray-900"
                >縣市</label
              >
              <input
                v-if="client.addr"
                type="text"
                name="cityAlt"
                id="cityAlt"
                v-model="client.cityAlt"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label
                v-if="client.addr"
                for="distAlt"
                class="font-semibold text-gray-900"
                >區</label
              >
              <input
                v-if="client.addr"
                type="text"
                name="distAlt"
                id="distAlt"
                v-model="client.distAlt"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label
                v-if="client.addr"
                for="villAlt"
                class="font-semibold text-gray-900"
                >里</label
              >
              <input
                v-if="client.addr"
                type="text"
                name="villAlt"
                id="villAlt"
                v-model="client.villAlt"
                class="w-full"
              />
            </div>

            <div class="col-span-4">
              <label
                v-if="client.addr"
                for="addrAlt"
                class="font-semibold text-gray-900"
                >地址</label
              >
              <input
                v-if="client.addr"
                type="text"
                name="addrAlt"
                id="addrAlt"
                v-model="client.addrAlt"
                class="w-full"
              />
            </div>
            <div class="col-span-2">
              <label
                v-if="client.addr"
                for="addrAltNote"
                class="font-semibold text-gray-900"
                >備註</label
              >
              <input
                v-if="client.addr"
                type="text"
                name="addrAltNote"
                id="addrAltNote"
                v-model="client.addrAltNote"
                class="w-full"
              />
            </div>

            <div class="col-span-12">
              <label for="note" class="font-semibold text-gray-900">註記</label>
              <textarea
                type="text"
                name="note"
                id="note"
                v-model="client.note"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from '../../services/ClientService';
export default {
  name: 'CreateClient',
  data() {
    return {
      client: {
        name: '',
        nameAlt: null,
        IDN: null,
        sex: 'male',
        birthday: null,
        isDead: false,
        incomeStatus: null,
        Status: null,
        group: null,
        tribe: null,
        plainMountain: null,
        canCall: true,
        phone: null,
        phoneNote: null,
        phoneAlt: null,
        phoneAltNote: null,
        mobile: null,
        mobileNote: null,
        mobileAlt: null,
        mobileAltNote: null,
        canMail: true,
        city: null,
        cityAlt: null,
        dist: null,
        distAlt: null,
        vill: null,
        villAlt: null,
        addr: null,
        addrAlt: null,
        addrNote: null,
        addrAltNote: null,
        note: null,
        householdadmin: false,
      },
      error: null,
      nameFilledUponSubmit: false,
      checked: false,
    };
  },
  methods: {
    async create() {
      try {
        if (this.client.name === '') {
          this.error = 'Name Required';
          this.nameFilledUponSubmit = true;
          return;
        }
        await ClientService.create(this.client);
        this.$router.push('/clients');
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    age() {
      if (this.client.birthday) {
        return (
          new Date(new Date() - new Date(this.client.birthday)).getFullYear() -
          1970
        );
      } else {
        return '';
      }
    },
  },
};
</script>

<style></style>
