<template>
  <div>
    <div class="p-4">
      <button
        @click="createPanel = !createPanel"
        class="p-2 rounded text-white bg-blue-500 hover:bg-blue-400"
      >
        &plus; 新增通聯記錄
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
              v-model="contact.date"
              class="mt-1 block w-full rounded-md"
            />
          </div>
          <div class="col-span-3 sm:col-span-3">
            <label
              for="contactTyle"
              class="block text-lg font-semibold text-gray-700"
              >類型</label
            >
            <select
              name="contactTyle"
              v-model="contact.contactType"
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
          </div>
          <div class="col-span-2 sm:col-span-2">
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
                v-model="contact.isSuccess"
                class="text-indigo-600 border-gray-300 rounded form-checkbox h-5 w-5"
              />
            </div>
          </div>
          <div class="col-span-3 sm:col-span-3">
            <label
              for="employee"
              class="block text-lg font-semibold text-gray-700"
              >夥伴</label
            >
            <select
              name="contactTyle"
              v-model="contact.personInCharge"
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
              v-model="contact.record"
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div class="col-span-2 p-5"></div>
        </div>
        <button
          @click="create"
          class="p-2 rounded text-white bg-green-500 hover:bg-green-400"
        >
          &plus; 增加
        </button>
      </div>
    </div>
    <div
      v-for="(contact, index) in contacts"
      :key="contact.id"
      class="border p-4"
    >
      <div class="flex justify-between">
        <div class="self-end">
          <span
            v-if="!contact.isSuccess"
            class="py-px px-1 bg-red-500 text-white rounded-full"
            >&times;</span
          >
          承辦人: {{ contact.personInCharge }}
        </div>
        <button
          @click="remove(index)"
          class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          刪除
        </button>
      </div>
      <div class="flex text-sm text-gray-500 space-x-4">
        <div>
          日期:
          {{ new Date(contact.date).toISOString().slice(0, 10) }}
        </div>
      </div>

      <h2 class="pt-6">
        紀錄:
        <button
          v-if="editIndex !== index"
          class="bg-yellow-100 shadow-lg"
          @click="editIndex = index"
        >
          編輯
        </button>
        <button
          v-if="editIndex === index"
          class="bg-yellow-100 shadow-lg"
          @click="update(index)"
        >
          儲存
        </button>
      </h2>
      <div v-if="editIndex !== index" class="whitespace-pre-line">
        {{ contact.record }}
      </div>
      <textarea
        v-if="editIndex === index"
        v-model="contact.record"
        class="w-full"
      ></textarea>
    </div>
  </div>
</template>

<script>
import ContactService from '../services/ContactService';

export default {
  props: {
    client: Object,
  },
  data() {
    return {
      contacts: null,
      editIndex: -1,
      // toggle create panel
      createPanel: false,
      // object for new contact record
      contact: {
        date: null,
        contactType: null,
        isSuccess: false,
        record: null,
        personInCharge: null,
      },
      // TODO: place lists into config file
      contactTypes: ['撥出', '來電', '親訪', '簡訊'],
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
  mounted() {
    this.contacts = this.client?.Contacts;
    if (this.contacts) {
      // TODO: contacts will be cleared upon refresh
    }
    this.contacts?.sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  methods: {
    async update(index) {
      try {
        console.log(this.contacts[index]);
        const res = await ContactService.update(this.contacts[index]);
        console.log(res);
        this.editIndex = -1;
      } catch (err) {
        console.log(err);
      }
    },
    async create() {
      try {
        const res = (
          await ContactService.create({
            clientId: this.client.id,
            contact: this.contact,
          })
        ).data;
        console.log(res);
        // optimistic update
        this.contacts.push(res);
        // close create panel
        this.createPanel = false;
      } catch (err) {
        console.log(err);
      }
    },
    async remove(index) {
      try {
        await ContactService.remove(this.client.id, this.contacts[index]?.id);

        // optimistic update
        this.contacts.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
