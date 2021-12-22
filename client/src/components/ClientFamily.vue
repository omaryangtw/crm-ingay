<template>
  <div>
    <div v-for="(family, index) in families" :key="index">
      {{ family.name }} ( {{ family?.ClientClients?.relationship }} )
      <button @click="remove(family)">&times;</button>
    </div>
    <h2 v-if="!families?.length">--無家人--</h2>
    <hr />
    <div>
      <h2>增加家人</h2>
      <div class="inline-flex" style="width: 300px">成員</div>
      <div class="inline-flex" style="width: 300px">關係</div>

      <div class="w-screen-xs" style="height: 500px">
        <Vselect
          label="name"
          :options="clients"
          v-model="target"
          class="inline-flex"
        />
        <Vselect
          :options="familylist"
          v-model="relationship"
          class="inline-flex"
        />
        <button @click="create">&plus;</button>
      </div>
    </div>
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

<style>
.vs__dropdown-toggle {
  min-width: 300px;
}
</style>
