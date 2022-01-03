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
    <div v-for="(family, index) in families" :key="index">
      {{ family.name }} ( {{ family?.ClientClients?.relationship }} )
      <button @click="remove(family)">&times;</button>
    </div>
    <h2 v-if="!families?.length" class="p-4">--無家人--</h2>
  </div>
</template>

<script>
import FamilyService from '../services/FamilyService';
import ClientService from '../services/ClientService';
import Vselect from 'vue-select';
import 'vue-select/dist/vue-select.css';
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
      // TODO: store this list into config file
      // TODO: filter by gender
      familylist: [
        '配偶',
        '同居人',
        '父',
        '母',
        '子',
        '女',
        '兄',
        '弟',
        '姊',
        '妹',
        '祖父',
        '祖母',
        '孫子',
        '孫女',
        '岳父',
        '岳母',
        '叔',
        '伯',
        '姑',
        '舅',
        '外甥女',
        '姨',
      ],
      relationship: null,
      target: null,
    };
  },
  async mounted() {
    this.families = this.client?.Family;
    // TODO: Use store instead of api call for better performance
    this.clients = (await ClientService.indexAll()).data;
  },
  methods: {
    async remove(him) {
      try {
        // request to remove the relationship
        await FamilyService.remove(this.client.id, him.id);
        // remove the family member from page
        this.families = this.families.filter((family) => family.id !== him.id);
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

<style></style>
