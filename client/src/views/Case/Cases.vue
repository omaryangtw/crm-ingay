<template>
  <div class="min-h-screen pt-24 bg-gray-100">
    <Search></Search>
    <div class="max-w-screen-lg mx-auto bg-gray-500">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="text-left">
            <th scope="col">案件名稱</th>
            <th scope="col">狀態</th>
            <th scope="col">類型</th>
            <th scope="col">夥伴</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="serviceCase in cases" :key="serviceCase.id">
            <td class="py-2 whitespace-nowrap">
              <div class="text-md font-medium text-gray-900">
                <div class="flex">
                  <router-link
                    :to="{
                      name: 'case',
                      params: { caseId: serviceCase.id },
                    }"
                    >{{ serviceCase.name }}</router-link
                  >
                </div>
              </div>
            </td>
            <td class="py-2 whitespace-nowrap">
              <span
                class="text-md text-gray-900"
                :class="{ 'text-red-500': serviceCase?.status === '處理中' }"
              >
                {{ serviceCase?.status }}
              </span>
            </td>
            <td class="py-2 whitespace-nowrap">
              <span class="text-md text-gray-500">
                {{ serviceCase?.typesMinor }}
              </span>
            </td>
            <td class="py-2 whitespace-nowrap">
              <div class="text-md text-gray-900">
                {{ serviceCase?.personInCharge }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CaseServices from '../../services/CaseService.js';
import Search from '../../components/SearchCase.vue';
export default {
  name: 'cases',
  components: { Search },
  meta: {
    needLogin: true,
  },
  data() {
    return {
      cases: null,
      search: '',
    };
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.cases = (await CaseServices.index(value)).data;
      },
    },
  },
  methods: {
    edit(caseId) {
      this.$router.push(`/case/${caseId}/edit`);
    },
  },
};
</script>

<style></style>
