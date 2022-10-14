<template>
  <article class="tile is-child notification">
    <div class="content">
      <p class="title">Entradas do sistema</p>
      <p class="subtitle">Utilize a unidade de medida indicada nos campos</p>
      <div class="content">
        <HalfWaveRectifier v-if="circuitName === getRectifierType" @HalfWaveResult="getResult" @clear="getClear"/>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {RectifierEnum} from "@/objects/CircuitEnum";
import HalfWaveRectifier from "@/components/InputForms/HalfWaveRectifier.vue";
import Result from "@/objects/Result";

export default defineComponent({
  name: "FormInput",
  emits: ["result", "clear"],
  components: {HalfWaveRectifier},
  props: {
    circuitName: {} as PropType<string>
  },
  computed: {
    getRectifierType() : string {
      if (this.circuitName === RectifierEnum.HalfWave) return RectifierEnum.HalfWave
      return ''
    }
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