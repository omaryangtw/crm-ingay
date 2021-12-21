<template>
  <div>
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
        <div>
          最後更新日期:
          {{ new Date(serviceCase.updatedAt).toISOString().slice(0, 10) }}
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
import CaseService from '../services/CaseService';
export default {
  data() {
    return {
      cases: null,
    };
  },
  async mounted() {
    this.cases = (
      await CaseService.byClient(this.$route.params.clientId)
    ).data.Cases;
    this.cases = this.cases.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
};
</script>

<style></style>
