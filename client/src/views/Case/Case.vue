<template>
  <div class="bg-gray-100 h-screen pt-24">
    <div class="max-w-screen-lg m-auto text-lg">
      <h2 class="text-xl">{{ serviceCase.name }}</h2>
      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-1">
          <div class="shadow overflow-hidden">
            <div class="px-4 py-5 grid grid-cols-2 gap-6">
              <div class="sm:col-span-1">
                <label class="block font-semibold text-gray-700">族人</label>
                <router-link
                  :to="{
                    name: 'client',
                    params: { clientId: serviceCase?.ClientId || 1 },
                  }"
                  >{{ client.name }}</router-link
                >
              </div>

              <div class="col-span-1 sm:col-span-1">
                <label for="date" class="block font-semibold text-gray-700"
                  >日期</label
                >
                {{ serviceCase?.createdAt?.substr(0, 10) }}
              </div>

              <div class="sm:col-span-1">
                <label
                  for="typesMajor"
                  class="block font-semibold text-gray-700"
                  >案件類型</label
                >
                <input
                  :value="serviceCase.typesMajor"
                  disabled
                  type="text"
                  name="date"
                  id="date"
                />
              </div>

              <div class="sm:col-span-1">
                <label
                  for="typesMinor"
                  class="block font-semibold text-gray-700"
                  >子類型</label
                >
                <input
                  :value="serviceCase.typesMinor"
                  disabled
                  type="text"
                  name="date"
                  id="date"
                />
              </div>
              <div class="col-span-1">
                <label for="status" class="block font-semibold text-gray-700"
                  >狀態</label
                >
                <select
                  disabled
                  id="status"
                  name="status"
                  v-model="serviceCase.status"
                  class="block w-full border"
                >
                  <option>處理中</option>
                  <option>結案</option>
                </select>
              </div>
              <div class="col-span-1">
                <label
                  for="personInCharge"
                  class="block font-semibold text-gray-700"
                  >承辦人</label
                >
                <input
                  disabled
                  type="text"
                  name="personInCharge"
                  id="personInCharge"
                  v-model="serviceCase.personInCharge"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="shadow overflow-hidden">
            <div class="px-4 py-5 grid grid-cols-2 gap-6">
              <div class="col-span-1">
                <label for="relation1" class="block font-semibold text-gray-700"
                  >關係人</label
                >
                <input
                  disabled
                  type="text"
                  name="relation1"
                  id="relation1"
                  v-model="serviceCase.relation1"
                />
              </div>
              <div class="col-span-1">
                <label for="contact1" class="block font-semibold text-gray-700"
                  >電話</label
                >
                <input
                  disabled
                  type="text"
                  name="contact1"
                  id="contact1"
                  v-model="serviceCase.contact1"
                />
              </div>
              <div class="col-span-1">
                <label for="relation2" class="block font-semibold text-gray-700"
                  >關係人</label
                >
                <input
                  disabled
                  type="text"
                  name="relation2"
                  id="relation2"
                  v-model="serviceCase.relation2"
                />
              </div>
              <div class="col-span-1">
                <label for="contact2" class="block font-semibold text-gray-700"
                  >電話</label
                >
                <input
                  disabled
                  type="text"
                  name="contact2"
                  id="contact2"
                  v-model="serviceCase.contact2"
                />
              </div>
              <div class="col-span-1">
                <label for="relation3" class="block font-semibold text-gray-700"
                  >關係人</label
                >
                <input
                  disabled
                  type="text"
                  name="relation3"
                  id="relation3"
                  v-model="serviceCase.relation3"
                />
              </div>
              <div class="col-span-1">
                <label for="contact3" class="block font-semibold text-gray-700"
                  >電話</label
                >
                <input
                  disabled
                  type="text"
                  name="contact3"
                  id="contact3"
                  v-model="serviceCase.contact3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shadow overflow-hidden">
        <div class="p-6">
          <label class="block my-4 font-semibold">案件狀況</label>
          <span class="whitespace-pre-wrap">
            {{ serviceCase?.note }}
          </span>
          <label class="block my-4 font-semibold">處理紀錄</label>
          <span class="whitespace-pre-wrap">
            {{ serviceCase?.handle }}
          </span>
        </div>
      </div>
      <!--       <div class="px-4 py-3 text-right">
        <button
          @click="remove"
          class="mx-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          刪除
        </button>
        <button
          @click="print"
          class="mx-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-semibold rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          列印
        </button>
        <button
          @click="edit"
          class="mx-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          編輯
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import CaseService from '../../services/CaseService';
import ClientService from '../../services/ClientService';
export default {
  name: 'Case',
  data() {
    return {
      serviceCase: {},
      client: {},
    };
  },
  methods: {
    edit() {
      this.$router.push(`/case/${this.caseId}/edit`);
    },
    print() {
      this.childPrint++;
    },
    async remove() {
      try {
        await CaseService.remove(this.caseId);
        this.$router.push('/case');
      } catch (err) {
        console.log(err);
      }
    },
  },

  async mounted() {
    this.caseId = this.$route.params.caseId;
    this.serviceCase = (await CaseService.get(this.caseId)).data;
    this.client = (await ClientService.get(this.serviceCase.ClientId)).data;
  },
};
</script>

<style></style>
