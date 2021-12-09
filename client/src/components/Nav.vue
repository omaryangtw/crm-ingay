<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-screen-lg mx-auto">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center">
            <div class="flex space-x-4">
              <router-link
                class="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-bold"
                :to="{ name: 'Home' }"
                >首頁</router-link
              >
              <router-link
                class="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-bold"
                :to="{ name: 'Clients' }"
                >族人</router-link
              >
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <router-link
              class="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-bold"
              v-if="!this.$store.state.isUserLoggedIn"
              :to="{ name: 'Register' }"
              >註冊</router-link
            >
            <router-link
              class="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-bold"
              v-if="!this.$store.state.isUserLoggedIn"
              :to="{ name: 'Login' }"
              >登入</router-link
            >
            <span
              v-if="this.$store.state.isUserLoggedIn"
              class="text-gray-100"
              >{{ this.$store.state.user.email }}</span
            >
            <button
              class="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-bold"
              @click="logout"
              v-if="this.$store.state.isUserLoggedIn"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Nav',
  methods: {
    ...mapActions(['setToken', 'setUser']),
    logout() {
      this.setToken(null);
      this.setUser(null);
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
