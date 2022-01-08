<template>
  <div>
    <div class="print-div" id="print_area">
      <p class="serial">案件編號:{{ case_?.id }}</p>
      <h1 class="pheader">Ingay穎艾達利辦公室服務案件</h1>

      <div class="pflex">
        <p class="pcell">日期</p>
        <p class="pcell">
          {{ case_?.createdAt ? (case_?.createdAt).substr(0, 10) : null }}
        </p>
        <p class="pcell">類別</p>
        <p class="pcell">{{ case_?.typesMajor }} / {{ case_?.typesMinor }}</p>
        <p class="pcell">承辦人</p>
        <p class="pcell">{{ case_?.personInCharge }}</p>
      </div>
      <div class="pflex">
        <p class="pcell">姓名</p>
        <p class="pcell">{{ client?.name }}</p>
        <p class="pcell">族別</p>
        <p class="pcell">{{ client?.group }} / {{ client?.plainMountain }}</p>
        <p class="pcell">手機</p>
        <p class="pcell">{{ client?.mobile }} {{ client?.phone }}</p>
      </div>
      <div class="pflex">
        <p class="pcell">性別</p>
        <p class="pcell">{{ client?.sex }}</p>
        <p class="pcell">身分證字號</p>
        <p class="pcell">{{ client?.IDN }}</p>
        <p class="pcell">生日</p>
        <p class="pcell">{{ client?.birthday }}</p>
      </div>
      <div class="pflex">
        <p class="pcell">地址</p>
        <p class="pcell-addr">
          {{ client?.city }}{{ client?.dist }}{{ client?.vill
          }}{{ client?.addr }}
        </p>
      </div>
      <div class="pflex">
        <p class="pcell">關係人</p>
        <p class="pcell-addr"></p>
      </div>
      <div class="pflex">
        <p class="pcell">案件狀況</p>
        <p class="pcell-note">{{ case_?.note }}</p>
      </div>
      <div class="pflex">
        <p class="pcell">處理紀錄</p>
        <p class="pcell-note">{{ case_?.handle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import printJS from 'print-js';
export default {
  props: {
    case_: Object,
    client: Object,
  },
  methods: {
    print() {
      printJS({
        printable: 'print_area',
        type: 'html',
        targetStyles: ['*'],
        font_size: '16px',
      });
    },
  },
};
const Strings = {};
Strings.orEmpty = function (entity) {
  return entity || '';
};
</script>

<style>
.print-div {
  font-size: larger;
  text-align: center;
}
.serial {
  text-decoration: underline;
  text-align: end;
}
.pheader {
  font-weight: 900;
  padding: 15px 0px;
}
.pflex {
  display: flex;
  justify-content: center;
}
.pcell {
  width: 16%;
  min-height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}
.pblock {
  width: 16%;
  min-height: 50px;
  border: 1px solid black;
  font-size: 16px;
  font-weight: 700;
}
.pcell-addr {
  width: 80%;
  min-height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 5px;
  font-weight: 600;
}
.pcell-note {
  width: 80%;
  min-height: 300px;
  border: 1px solid black;
  white-space: pre-line;
  display: flex;
  padding: 5px;
  text-align: start;
  font-weight: 600;
}
</style>
