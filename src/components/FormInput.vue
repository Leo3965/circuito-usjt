<template>
  <article class="tile is-child notification">
    <div class="content">
      <p class="title">Entradas do sistema</p>
      <p class="subtitle">Utilize a unidade de medida indicada nos campos</p>
      <div class="content">
        <HalfWaveRectifier/>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import HalfWaveRectifier from "@/components/InputForms/HalfWaveRectifier.vue";

export default defineComponent({
  name: "FormInput",
  components: {HalfWaveRectifier},
  props: {
    circuitName: Object as PropType<string>
  },
  computed: {},
  methods: {}
})
</script>

<style scoped>

</style>