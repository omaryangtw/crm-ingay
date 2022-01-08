<template>
  <div class="px-4 py-5 bg-gray-100">
    <div class="space-y-4 text-xl">
      <div v-if="client.birthday">
        <label for="birthday" class="font-semibold block">生日</label>
        <span> {{ client.birthday }} </span>
        <span> ({{ age(client.birthday) }}歲) </span>
      </div>

      <div v-if="client.IDN">
        <label for="IDN" class="font-semibold block">身分證號</label>
        <span>{{ client.IDN }}</span>
      </div>
      <div v-if="client.group || client.plainMountain">
        <label for="group" class="font-semibold block">族別</label>
        <span> {{ client.group }} </span>
        <span v-if="client.plainMountain"> ({{ client.plainMountain }})</span>
        <div v-if="client.tribe"></div>
        <span> {{ client.tribe }} </span>
      </div>

      <div v-if="client.mobile">
        <label for="mobile" class="font-semibold block">手機1</label>
        <span> {{ client.mobile }} </span>
        <span v-if="client.mobileNote"> ({{ client.mobileNote }}) </span>
      </div>

      <div v-if="client.mobileAlt">
        <label for="mobileAlt" class="font-semibold block">手機2</label>
        <span> {{ client.mobileAlt }} </span>
        <span v-if="client.mobileAltNote"> ({{ client.mobileAltNote }}) </span>
      </div>

      <div v-if="client.phone">
        <label for="phone" class="font-semibold block">家用1</label>
        <span> {{ client.phone }} </span>
        <span v-if="client.phoneNote"> ({{ client.phoneNote }}) </span>
      </div>

      <div v-if="client.phoneAlt">
        <label for="phoneAlt" class="font-semibold block">家用2</label>
        <span> {{ client.phoneAlt }} </span>
        <span v-if="client.phoneAltNote"> ({{ client.phoneAltNote }}) </span>
      </div>

      <div v-if="client.addr">
        <label for="addr" class="font-semibold block">地址1</label>
        <span> {{ client.city }} </span>
        <span> {{ client.dist }} </span>
        <span> {{ client.vill }} </span>
        <span> {{ client.addr }} </span>
        <span v-if="client.addrNote"> ({{ client.addrNote }}) </span>
      </div>
      <div v-if="client.addrAlt">
        <label for="addrAlt" class="font-semibold block">地址1</label>
        <span> {{ client.cityAlt }} </span>
        <span> {{ client.distAlt }} </span>
        <span> {{ client.villAlt }} </span>
        <span> {{ client.addrAlt }} </span>
        <span v-if="client.addrAltNote"> ({{ client.addrAltNote }}) </span>
      </div>

      <div v-if="client.note">
        <label for="note" class="font-semibold block">註記</label>
        <span class="whitespace-pre-wrap">{{ client.note }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import age from '../lib/age';
export default {
  name: 'ClientInfo',
  props: {
    client: Object,
  },
  methods: {
    age,
  },
};
</script>

<style></style>
