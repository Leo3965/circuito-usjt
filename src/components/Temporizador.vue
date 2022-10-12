<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span class="icon">
                <img src="../assets/play-outline.svg">
            </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <img src="../assets/stop-outline.svg">
            </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Cronometro from "@/components/Cronometro.vue";

export default defineComponent({
  name: `Temporizador`,
  emits: ['aoTemporizadorFinalizado'],
  components: {Cronometro},
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  methods: {
    iniciar(): void {
      this.cronometroRodando = !this.cronometroRodando
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++
      }, 1000)
    },

    finalizar(): void {
      this.cronometroRodando = !this.cronometroRodando
      clearInterval(this.cronometro)
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    }

  }
})
</script>

<style scoped>
</style>