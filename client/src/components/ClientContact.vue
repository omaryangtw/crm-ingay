<template>
  <div v-for="contact in contacts" :key="contact.id" class="border p-4">
    <div class="flex justify-between">
      <div class="self-end">承辦人: {{ contact.personInCharge }}</div>
    </div>
    <div class="flex text-sm text-gray-500 space-x-4">
      <div>
        日期:
        {{ new Date(contact.date).toISOString().slice(0, 10) }}
      </div>
    </div>

    <h2 class="pt-6">紀錄:</h2>
    <div class="whitespace-pre-line">
      {{ contact.record }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    client: Object,
  },
  data() {
    return {
      contacts: null,
    };
  },
  mounted() {
    this.contacts = this.client.Contacts;
    this.contacts.sort((a, b) => new Date(b.date) - new Date(a.date));
  },
};
</script>

<style></style>
