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
          <div class="col-span-3">
            <label for="date" class="block font-semibold text-gray-700"
              >日期</label
            >
            <input
              type="date"
              id="date"
              v-model="serviceCase.date"
              class="w-full border-gray-300 rounded-md"
            />
          </div>
          <div class="col-span-3">
            <label for="" class="block text-lg font-semibold text-gray-700"
              >類型</label
            >
            <select
              name="typesMajor"
              v-model="serviceCase.typesMajor"
              class="w-full border border-gray-300 rounded-md"
            >
              <option v-for="(item, index) in list" :key="item.id">
                {{ index }}
              </option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="" class="block text-lg font-semibold text-gray-700"
              >子類型</label
            >
            <select
              name=""
              v-model="serviceCase.typesMinor"
              class="w-full border border-gray-300 rounded-md"
            >
              <option
                v-for="option in list[serviceCase?.typesMajor]"
                :key="option.id"
              >
                {{ option.title }}
              </option>
            </select>
          </div>

          <div class="col-span-2">
            <label
              for="employee"
              class="block text-lg font-semibold text-gray-700"
              >夥伴</label
            >
            <select
              name=""
              v-model="serviceCase.personInCharge"
              class="w-full border border-gray-300 rounded-md"
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
          <div class="col-span-2">
            <label
              for="status"
              class="block text-lg font-semibold text-gray-700"
              >狀態</label
            >
            <select
              id="status"
              v-model="serviceCase.status"
              name="status"
              class="w-full border-gray-300 rounded-md"
            >
              <option>處理中</option>
              <option>結案</option>
            </select>
          </div>
          <div class="col-span-12">
            <label
              for="record"
              class="block text-lg font-semibold text-gray-700"
              >紀錄</label
            >

            <textarea
              class="w-full border-gray-300 rounded-md"
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
              class="w-full border-gray-300 rounded-md"
              v-model="serviceCase.handle"
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
          </div>
        </div>
        <button
          @click="create"
          class="mt-2 p-2 rounded text-white bg-green-500 hover:bg-green-400"
        >
          &plus; 增加
        </button>
      </div>
    </div>

    <div
      v-for="(serviceCase, index) in cases"
      :key="serviceCase.id"
      class="border p-4 text-lg"
    >
      <div class="flex justify-between items-center align-center">
        <div
          v-if="editIndex !== index"
          :class="{
            'bg-red-300': serviceCase?.status === '處理中',
            'bg-green-300': serviceCase?.status === '結案',
          }"
          class="px-1.5 py-0.5 rounded-lg"
        >
          {{ serviceCase.status }}
        </div>
        <div v-if="editIndex === index" class="col-span-2">
          <label for="status" class="block font-semibold text-gray-700"
            >狀態</label
          >
          <select
            id="status"
            v-model="serviceCase.status"
            name="status"
            class="w-full border-gray-300 rounded-md"
          >
            <option>處理中</option>
            <option>結案</option>
          </select>
        </div>
        <div v-if="editIndex !== index" class="py-0.5">
          {{ serviceCase.typesMinor }}
        </div>
        <div v-if="editIndex === index" class="col-span-3">
          <label for="" class="block font-semibold text-gray-700">類型</label>
          <select
            name="typesMajor"
            v-model="serviceCase.typesMajor"
            class="w-full border border-gray-300 rounded-md"
          >
            <option v-for="(item, index) in list" :key="item.id">
              {{ index }}
            </option>
          </select>
        </div>

        <div v-if="editIndex === index" class="col-span-2">
          <label for="" class="block font-semibold text-gray-700">子類型</label>
          <select
            name=""
            v-model="serviceCase.typesMinor"
            class="w-full border border-gray-300 rounded-md"
          >
            <option
              v-for="option in list[serviceCase?.typesMajor]"
              :key="option.id"
            >
              {{ option.title }}
            </option>
          </select>
        </div>
        <div v-if="editIndex !== index">
          承辦人: {{ serviceCase.personInCharge }}
        </div>

        <div v-if="editIndex === index" class="col-span-2">
          <label for="employee" class="block font-semibold text-gray-700"
            >夥伴</label
          >
          <select
            name=""
            v-model="serviceCase.personInCharge"
            class="w-full border border-gray-300 rounded-md"
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

        <div>
          <button
            @click="print(index)"
            class="mx-2 px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            列印
          </button>
          <button
            v-if="editIndex !== index"
            class="mx-2 px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            @click="editIndex = index"
          >
            編輯
          </button>
          <button
            v-if="editIndex === index"
            class="mx-2 px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-green-500 hover:bg-green-600"
            @click="update(index)"
          >
            儲存
          </button>
          <button
            @click="remove(index)"
            class="mx-2 px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            刪除
          </button>
        </div>
      </div>
      <div class="flex text-sm text-gray-500 space-x-4">
        <div>
          案件日期:
          {{ new Date(serviceCase.createdAt).toISOString().slice(0, 10) }}
        </div>
      </div>

      <h2 class="pt-4 font-semibold">紀錄:</h2>
      <div v-if="editIndex !== index" class="whitespace-pre-line">
        {{ serviceCase.note }}
      </div>
      <textarea
        v-if="editIndex === index"
        v-model="serviceCase.note"
        class="w-full"
      ></textarea>

      <h2 class="pt-4 font-semibold">處理進度:</h2>
      <div v-if="editIndex !== index" class="whitespace-pre-line">
        {{ serviceCase.handle }}
      </div>
      <textarea
        v-if="editIndex === index"
        v-model="serviceCase.handle"
        class="w-full"
      ></textarea>
    </div>
    <PrintCase
      ref="childComponent"
      :case_="printcase"
      :client="client"
      v-show="false"
    />
  </div>
</template>

<script>
import CaseService from '../services/CaseService';
import PrintCase from '../components/PrintCase.vue';
export default {
  props: {
    client: Object,
  },
  components: {
    PrintCase,
  },
  data() {
    return {
      cases: null,
      printcase: null,
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
      editIndex: -1,
      childPrint: 0,
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
      list: {
        一般: [
          { id: '1', title: '一般' },
          { id: '2', title: '求職' },
          { id: '3', title: '陳情' },
          { id: '4', title: '施政建議' },
        ],
        法律: [
          { id: '1', title: '債務' },
          { id: '2', title: '勞資' },
          { id: '3', title: '車禍' },
          { id: '4', title: '家事' },
          { id: '5', title: '繼承' },
          { id: '6', title: '諮詢' },
          { id: '7', title: '非訟' },
          { id: '8', title: '刑事' },
        ],
        急難救助: [
          { id: '1', title: '生活扶助' },
          { id: '2', title: '死亡救助' },
          { id: '3', title: '急難紓困' },
          { id: '4', title: '重大災害' },
          { id: '5', title: '醫療補助' },
        ],
      },
    };
  },
  async mounted() {
    this.cases = this.client?.Cases;
    this.cases = this.cases?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
  methods: {
    async create() {
      try {
        const res = (
          await CaseService.create({
            serviceCase: this.serviceCase,
            clientId: this.$route.params.clientId,
          })
        ).data;
        this.cases.unshift(res);
        this.serviceCase = Object.assign({
          date: null,
          status: null,
          typesMajor: null,
          typesMinor: null,
          //TODO: fill name with store data
          personInCharge: null,
          note: '',
          handle: '',
        });
        this.createPanel = false;
      } catch (err) {
        console.log(err);
      }
    },
    async remove(index) {
      try {
        await CaseService.remove(this.cases[index]?.id);

        // optimistic update
        this.cases.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    },
    async update(index) {
      try {
        CaseService.put(this.cases[index]);

        this.editIndex = -1;
      } catch (err) {
        console.log(err);
      }
    },
    print(index) {
      this.printcase = Object.assign(this.cases[index]);
      this.$nextTick(function () {
        this.$refs.childComponent.print();
      });
    },
  },
};
</script>

<style></style>
