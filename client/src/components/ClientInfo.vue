<template>
  <div class="px-4 py-5 bg-gray-100">
    <div class="grid grid-cols-12 gap-x-6 gap-y-1">
      <div class="col-span-3">
        <label for="birthday" class="font-semibold text-gray-900">生日</label>
        <h4
          disabled
          type="date"
          id="birthday"
          class="font-medium text-gray-900 w-11/12 bg-gray-100"
          v-html="client.birthday"
        ></h4>
        <span> ({{ age(client.birthday) }}) </span>
      </div>

      <div class="col-span-3">
        <label for="age" class="font-semibold text-gray-900">年紀</label>
        <div class="flex">
          <span v-if="age" class="font-semibold text-gray-900"> </span>

          <span v-if="age" class="font-semibold text-gray-900">歲 </span>
        </div>
      </div>

      <div class="col-span-6">
        <label for="IDN" class="font-semibold text-gray-900">身分證號</label>
        <h4
          disabled
          type="text"
          name="IDN"
          v-html="client.IDN"
          id="IDN"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <label for="group" class="font-semibold text-gray-900">族別</label>
        <h4
          disabled
          type="text"
          name="group"
          v-html="client.group"
          id="group"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <label for="plainMountain" class="font-semibold text-gray-900"
          >平原/山原</label
        >
        <span class="block">
          {{ client.plainMountain }}
        </span>
      </div>
      <div class="col-span-6">
        <label for="tribe" class="font-semibold text-gray-900">部落</label>
        <h4
          disabled
          type="text"
          name="tribe"
          id="tribe"
          v-html="client.tribe"
          class="w-full"
        />
      </div>

      <div class="hidden col-span-12" aria-hidden="true">
        <div class="py-3">
          <div class="border-t border-gray-400"></div>
        </div>
      </div>

      <div class="col-span-3">
        <label for="mobile" class="font-semibold text-gray-900">手機1</label>
        <h4
          disabled
          type="text"
          name="mobile"
          id="mobile"
          v-html="client.mobile"
          class="w-full"
        />
      </div>

      <div class="col-span-3">
        <label for="mobileNote" class="font-semibold text-gray-900">備註</label>
        <h4
          disabled
          type="text"
          name="mobileNote"
          id="mobileNote"
          v-html="client.mobileNote"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <label for="mobileAlt" class="font-semibold text-gray-900">手機2</label>
        <h4
          disabled
          type="text"
          name="mobileAlt"
          id="mobileAlt"
          v-html="client.mobileAlt"
          class="w-full"
        />
      </div>

      <div class="col-span-3">
        <label for="mobileAltNote" class="font-semibold text-gray-900"
          >備註</label
        >
        <h4
          disabled
          type="text"
          name="mobileAltNote"
          id="mobileAltNote"
          v-html="client.mobileAltNote"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <label for="phone" class="font-semibold text-gray-900">家用1</label>
        <h4
          disabled
          type="text"
          name="phone"
          id="phone"
          v-html="client.phone"
          class="w-full"
        />
      </div>

      <div class="col-span-3">
        <label for="phoneNote" class="font-semibold text-gray-900">備註</label>
        <h4
          disabled
          type="text"
          name="phoneNote"
          id="phoneNote"
          v-html="client.phoneNote"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <label for="phoneAlt" class="font-semibold text-gray-900">家用2</label>
        <h4
          disabled
          type="text"
          name="phoneAlt"
          id="phoneAlt"
          v-html="client.phoneAlt"
          class="w-full"
        />
      </div>

      <div class="col-span-3">
        <label for="phoneAltNote" class="font-semibold text-gray-900"
          >備註</label
        >
        <h4
          disabled
          type="text"
          name="phoneAltNote"
          id="phoneAltNote"
          v-html="client.phoneAltNote"
          class="w-full"
        />
      </div>

      <div class="hidden col-span-12" aria-hidden="true">
        <div class="py-3">
          <div class="border-t border-gray-400"></div>
        </div>
      </div>

      <div class="col-span-2">
        <label for="city" class="font-semibold text-gray-900">縣市</label>
        <h4
          disabled
          type="text"
          name="city"
          id="city"
          v-html="client.city"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label for="dist" class="font-semibold text-gray-900">區</label>
        <h4
          disabled
          type="text"
          name="dist"
          id="dist"
          v-html="client.dist"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label for="vill" class="font-semibold text-gray-900">里</label>
        <h4
          disabled
          type="text"
          name="vill"
          id="vill"
          v-html="client.vill"
          class="w-full"
        />
      </div>

      <div class="col-span-4">
        <label for="addr" class="font-semibold text-gray-900">地址</label>
        <h4
          disabled
          type="text"
          name="addr"
          id="addr"
          v-html="client.addr"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label for="addrNote" class="font-semibold text-gray-900">備註</label>
        <h4
          disabled
          type="text"
          name="addrNote"
          id="addrNote"
          v-html="client.addrNote"
          class="w-full"
        />
      </div>

      <div class="col-span-2">
        <label
          v-if="client.addr"
          for="cityAlt"
          class="font-semibold text-gray-900"
          >縣市</label
        >
        <h4
          disabled
          v-if="client.addr"
          type="text"
          name="cityAlt"
          id="cityAlt"
          v-html="client.cityAlt"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label
          v-if="client.addr"
          for="distAlt"
          class="font-semibold text-gray-900"
          >區</label
        >
        <h4
          disabled
          v-if="client.addr"
          type="text"
          name="distAlt"
          id="distAlt"
          v-html="client.distAlt"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label
          v-if="client.addr"
          for="villAlt"
          class="font-semibold text-gray-900"
          >里</label
        >
        <h4
          disabled
          v-if="client.addr"
          type="text"
          name="villAlt"
          id="villAlt"
          v-html="client.villAlt"
          class="w-full"
        />
      </div>

      <div class="col-span-4">
        <label
          v-if="client.addr"
          for="addrAlt"
          class="font-semibold text-gray-900"
          >地址</label
        >
        <h4
          disabled
          v-if="client.addr"
          type="text"
          name="addrAlt"
          id="addrAlt"
          v-html="client.addrAlt"
          class="w-full"
        />
      </div>
      <div class="col-span-2">
        <label
          v-if="client.addr"
          for="addrAltNote"
          class="font-semibold text-gray-900"
          >備註</label
        >
        <h4
          disabled
          v-if="client.addr"
          type="text"
          name="addrAltNote"
          id="addrAltNote"
          v-html="client.addrAltNote"
          class="w-full"
        />
      </div>

      <div class="col-span-12">
        <label for="note" class="font-semibold text-gray-900">註記</label>
        <textarea
          disabled
          type="text"
          name="note"
          id="note"
          v-html="client.note"
          class="w-full"
        />
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
