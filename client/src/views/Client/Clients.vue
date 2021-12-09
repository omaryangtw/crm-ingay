<template>
  <div class="min-h-screen pt-24 bg-gray-100">
    <div class="max-w-screen-lg mx-auto flex justify-between">
      <Search></Search>
      <button
        @click="$router.push('/client/create')"
        class="px-2 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        新增
      </button>
    </div>
    <div class="max-w-screen-lg mx-auto bg-gray-500">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col">姓名</th>
            <th scope="col">族群</th>
            <th scope="col">生日</th>
            <th scope="col">手機</th>
            <th scope="col">電話</th>
            <th scope="col">地址</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="client in clients" :key="client.id">
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <div class="ml-4">
                  <div
                    class="text-md font-medium text-gray-900"
                    :class="{ 'text-red-600': client.isDead }"
                  >
                    <div class="flex">
                      <router-link
                        :to="{
                          name: 'client',
                          params: { clientId: client.id },
                        }"
                        >{{ client.name }}</router-link
                      >
                      <span
                        v-if="client.birthday && !client.isDead"
                        class="text-yellow-500 font-bold"
                      >
                        ({{ age(client.birthday) }})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <span class="text-md text-gray-900">
                {{ client.group }}
              </span>
              <span v-if="client.plainMountain" class="text-md text-gray-500">
                ({{ client.plainMountain }})
              </span>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <span class="text-md text-gray-500">
                {{ client.birthday }}
              </span>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-md text-gray-900">
                {{ client.mobile }}
              </div>
              <div class="text-md text-gray-500">
                {{ client.mobileAlt }}
              </div>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-md text-gray-900">
                {{ client.phone }}
              </div>
              <div class="text-md text-gray-500">
                {{ client.phoneAlt }}
              </div>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-md text-gray-900">
                {{ client.dist }}{{ client.vill }}{{ client.addr }}
              </div>
              <div class="text-md text-gray-500">
                {{ client.distAlt }}{{ client.villAlt }}{{ client.addrAlt }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClientServices from '../../services/ClientService.js';
import Search from '../../components/SearchClient.vue';
export default {
  name: 'clients',
  components: { Search },
  meta: {
    needLogin: true,
  },
  data() {
    return {
      clients: null,
      search: '',
    };
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.clients = (await ClientServices.index(value)).data;
      },
    },
  },
  computed: {},
  methods: {
    edit(clientId) {
      this.$router.push(`/clients/${clientId}/edit`);
    },
    age(birthday) {
      if (birthday) {
        return 2021 - parseInt(birthday);
      }
    },
  },
};
</script>

<style></style>
