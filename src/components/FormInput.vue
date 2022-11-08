<template>
  <article class="tile is-child notification">
    <div class="content">
      <p class="title">Entradas do sistema</p>
      <p class="subtitle">Utilize a unidade de medida indicada nos campos</p>
      <div class="content">
        <CenterTapeRectifier v-if="circuitName === center" @CenterTapeResult="getResult" @clear="getClear"/>
        <CircuitSixResistances v-if="circuitName === sixResistance" @result="getResult" @clear="getClear"/>
        <HalfWaveRectifier v-if="circuitName === hafWave" @HalfWaveResult="getResult" @clear="getClear"/>
        <FullWaveRectifier v-if="circuitName === fullWave" @FullWaveRectifierResult="getResult" @clear="getClear"/>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {CircuitEnum} from "@/objects/enum/CircuitEnum";
import {RectifierEnum} from "@/objects/enum/RectifierEnum";
import Result from "@/objects/model/Result";
import CenterTapeRectifier from "@/components/InputForms/CenterTapeRectifier.vue";
import CircuitSixResistances from "@/components/InputForms/CircuitSixResistances.vue";
import HalfWaveRectifier from "@/components/InputForms/HalfWaveRectifier.vue";
import FullWaveRectifier from "@/components/InputForms/FullWaveRectifier.vue";

export default defineComponent({
  name: "FormInput",
  data() {
    return {
      fullWave: RectifierEnum.FullWave,
      hafWave: RectifierEnum.HalfWave,
      center: RectifierEnum.CenterTape,
      sixResistance: CircuitEnum.CircuitWithSixResistances
    }
  },
  emits: ["result", "clear"],
  components: {FullWaveRectifier, HalfWaveRectifier, CircuitSixResistances, CenterTapeRectifier},
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