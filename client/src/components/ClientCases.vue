<template>
  <div>
    <div class="p-4">
      <button
        @click="createPanel = !createPanel"
        class="p-2 rounded text-white bg-blue-500 hover:bg-blue-400"
      >
        &plus; 新增服務案件
      </button>
      <div v-if="createPanel">
        <div class="grid grid-cols-12 gap-x-6 gap-y-2">
          <div class="col-span-4 sm:col-span-4">
            <label for="date" class="block text-lg font-semibold text-gray-700"
              >日期</label
            >
            <input
              type="date"
              id="date"
              v-model="serviceCase.date"
              class="mt-1 block w-full rounded-md"
            />
          </div>
          <!--           <div class="col-span-3 sm:col-span-3">
            <label
              for=""
              class="block text-lg font-semibold text-gray-700"
              >類型</label
            >
            <select
              name=""
              
              v-model="serviceCase.typesMajor"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option
                v-for="contactType in contactTypes"
                :key="contactType"
                :value="contactType"
              >
                {{ contactType }}
              </option>
            </select>
          </div> -->
          <!--           <div class="col-span-2 sm:col-span-2">
            <label
              for="isSuccess"
              class="block text-lg font-semibold text-gray-700"
              >有效</label
            >
            <div class="flex align-middle mt-2">
              <input
                id="isSuccess"
                name="isSuccess"
                type="checkbox"
                v-model="serviceCase.isSuccess"
                class="text-indigo-600 border-gray-300 rounded form-checkbox h-5 w-5"
              />
            </div>
          </div> -->
          <div class="col-span-3 sm:col-span-3">
            <label
              for="employee"
              class="block text-lg font-semibold text-gray-700"
              >夥伴</label
            >
            <select
              name=""
              v-model="serviceCase.personInCharge"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option
                v-for="employee in employeeList"
                :key="employee"
                :value="employee"
              >
                {{ employee }}
              </option>
            </select>
          </div>
          <div class="col-span-10 sm:col-span-10">
            <label
              for="record"
              class="block text-lg font-semibold text-gray-700"
              >紀錄</label
            >

            <textarea
              class="mt-1 block w-full border-gray-300 rounded-md"
              v-model="serviceCase.note"
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
            <label
              for="record"
              class="block text-lg font-semibold text-gray-700"
              >處理進度</label
            >

            <textarea
              class="mt-1 block w-full border-gray-300 rounded-md"
              v-model="serviceCase.note"
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
          </div>
        </div>
        <button
          @click="create"
          class="p-2 rounded text-white bg-green-500 hover:bg-green-400"
        >
          &plus; 增加
        </button>
      </div>
    </div>

    <div v-for="serviceCase in cases" :key="serviceCase.id" class="border p-4">
      <div class="flex justify-between">
        <div
          :class="{
            'bg-red-300': serviceCase?.status === '處理中',
            'bg-green-300': serviceCase?.status === '結案',
          }"
          class="px-1.5 py-0.5 rounded-lg"
        >
          {{ serviceCase.status }}
        </div>
        <div class="py-0.5">{{ serviceCase.typesMinor }}</div>
        <div class="self-end">承辦人: {{ serviceCase.personInCharge }}</div>
      </div>
      <div class="flex text-sm text-gray-500 space-x-4">
        <div>
          案件日期:
          {{ new Date(serviceCase.createdAt).toISOString().slice(0, 10) }}
        </div>
      </div>

      <h2 class="pt-6">紀錄:</h2>
      <div class="whitespace-pre-line">
        {{ serviceCase.note }}
      </div>

      <h2 class="pt-6">處理進度:</h2>
      <div class="whitespace-pre-line">
        {{ serviceCase.handle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    client: Object,
  },
  data() {
    return {
      cases: null,
      createPanel: false,
      // Object for create a new service case
      serviceCase: {
        date: null,
        status: null,
        typesMajor: null,
        typesMinor: null,
        //TODO: fill name with store data
        personInCharge: null,
        note: '',
        handle: '',
      },
      employeeList: [
        'Kilang',
        'Nakaw',
        '立恩',
        '佳宜',
        'Ingay',
        '楊震',
        '志青',
        'Lising',
        '曉婷',
      ],
    };
  },
  async mounted() {
    this.cases = this.client?.Cases;
    this.cases = this.cases.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
};
</script>

<style></style>
