<template>
  <article v-if="hasResult" class="tile is-child notification is-dark">
    <p class="title">Resultado</p>
    <p class="subtitle">=)</p>
    <div class="content">
      <table>
        <thead>
        <tr>
          <th class="table-head">Saída</th>
          <th class="table-head">Valor</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result, index) in getResults" :key="index">
          <td>{{ result.description }}</td>
          <td>{{ `${result.value} ${result.unit}` }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import Result from "@/objects/model/Result";

export default defineComponent({
  name: "ResultBox",
  props: {
    result: {} as PropType<Result>
  },
  computed: {
    hasResult() {
      if (this.result) return this.result?.values?.length > 0;
      return false
    },
    getResults() {
      return this.result?.values;
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