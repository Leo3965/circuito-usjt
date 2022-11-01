<template>
  <article class="tile is-child notification">
    <div class="content">
      <p class="title">Entradas do sistema</p>
      <p class="subtitle">Utilize a unidade de medida indicada nos campos</p>
      <div class="content">
        <CenterTapeRectifier v-if="circuitName === center" @CenterTapeResult="getResult" @clear="getClear"/>
        <CircuitSixResistances v-if="circuitName === sixResistance" @result="getResult" @clear="getClear"/>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {CircuitEnum} from "@/objects/CircuitEnum";
import CenterTapeRectifier from "@/components/InputForms/CenterTapeRectifier.vue";
import Result from "@/objects/Result";
import CircuitSixResistances from "@/components/InputForms/CircuitSixResistances.vue";
import {RectifierEnum} from "@/objects/RectifierEnum";

export default defineComponent({
  name: "FormInput",
  data() {
    return {
      hafWave: RectifierEnum.HalfWave,
      center: RectifierEnum.CenterTape,
      sixResistance: CircuitEnum.CircuitWithSixResistances
    }
  },
  emits: ["result", "clear"],
  components: {CircuitSixResistances, CenterTapeRectifier},
  props: {
    circuitName: {} as PropType<string>
  },
  methods: {
    getResult(result: Result) {
      this.$emit("result", result);
    },
    getClear(clear: boolean) {
      this.$emit("clear", clear);
    }
  }
})
</script>

<style scoped>

</style>