<template>
  <div class="flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"
      />
    </svg>
    <input
      type="text"
      name="search"
      id="search"
      v-model="search"
      placeholder="姓名、電話、地址、備註…"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import ClientServices from '../services/ClientService.js';
export default {
  name: 'Search',
  data() {
    return {
      clients: null,
      search: '',
    };
  },
  watch: {
    search: debounce(async function () {
      const route = {};
      if (this.search !== '') {
        route.query = {
          search: this.search,
        };
      }
      this.$router.push(route);
    }, 500),

    '$route.query.search': {
      immediate: true,
      handler(value) {
        this.search = value;
      },
    },
  },
  async mounted() {
    this.clients = (await ClientServices.index()).data;
  },
};
</script>

<style></style>
