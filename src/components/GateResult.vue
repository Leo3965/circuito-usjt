<template>
  <article v-if="hasResult" class="tile is-child notification is-dark">
    <p class="title">Resultado</p>
    <p class="subtitle">{{ this.gateResult.title }}</p>
    <div class="content">
      <table>
        <thead>
        <tr>
          <th class="table-head">A</th>
          <th class="table-head">B</th>
          <th class="table-head">Saida</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result, index) in getResults" :key="index">
          <td>{{ result.a }}</td>
          <td>{{ result.b }}</td>
          <td>{{ result.out }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import GateResult from "@/objects/model/GateResult"

export default defineComponent({
  name: "GateResult",
  props: {
    gateResult: {} as PropType<GateResult>
  },
  computed: {
    hasResult() {
      if (this.gateResult) return this.gateResult?.values?.length > 0;
      return false
    },
    getResults() {
      return this.gateResult?.values;
    }
  },
  methods: {}
})
</script>

<style scoped>
.table-head {
  color: #FFFFFF;
}
</style>