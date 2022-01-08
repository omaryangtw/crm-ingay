<template>
  <div>
    <div class="p-4">
      <button
        @click="createPanel = !createPanel"
        class="p-2 rounded text-white bg-blue-500 hover:bg-blue-400"
      >
        &plus; 新增家人
      </button>
      <div v-if="createPanel" class="mt-4">
        <div class="w-screen-xs">
          <div class="w-1/4 my-2">
            <label for="">成員</label>
            <Vselect label="name" :options="clients" v-model="target" />
          </div>
          <div class="w-1/4 my-2">
            <label for="">關係</label>
            <Vselect :options="familylist" v-model="relationship" />
          </div>
          <button
            @click="create"
            class="p-2 rounded text-white bg-green-500 hover:bg-green-400"
          >
            &plus; 增加
          </button>
        </div>
      </div>
    </div>

    <hr />
    <div
      v-for="(family, index) in families"
      :key="index"
      class="p-4 flex justify-between"
    >
      {{ family.name }} ( {{ family?.ClientClients?.relationship }} )

      <button
        @click="remove(index)"
        class="px-2 py-1 inline-flex justify-center shadow-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
      >
        刪除
      </button>
    </div>
  </div>
</template>

<script>
import FamilyService from '../services/FamilyService';
import ClientService from '../services/ClientService';
import Vselect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { mapActions } from 'vuex';
import store from '../store';
import familylist from '../lib/relationships';
export default {
  props: {
    client: Object,
  },
  components: {
    Vselect,
  },
  data() {
    return {
      families: null,
      clients: [],
      createPanel: false,
      // TODO: filter by gender
      familylist: familylist,
      relationship: null,
      target: null,
    };
  },
  async mounted() {
    this.families = this.client?.Family;
    if (!store.state.clients?.length) {
      this.clients = (await ClientService.indexAll()).data;
      this.setClients(this.clients);
    } else {
      this.clients = store.state.clients;
    }
  },
  methods: {
    ...mapActions(['setClients']),
    async remove(index) {
      try {
        // request to remove the relationship
        await FamilyService.remove(this.client.id, this.families[index]?.id);
        // remove the family member from page
        this.families.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    },
    async create() {
      try {
        if (this.relationship === '' || this.target.name === '') {
          console.log('Fields Required');
          return;
        }
        await FamilyService.create({
          sourceId: this.client?.id,
          targetId: this.target?.id,
          relationship: this.relationship,
        });
        // optimistic request
        this.families.push({
          id: this.target?.id,
          name: this.target?.name,
          ClientClients: { relationship: this.relationship },
        });
        this.createPanel = false;
        // clear combobox
        this.target = null;
        this.relationship = null;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
input.vs__search {
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  border: 0;
}
</style>
