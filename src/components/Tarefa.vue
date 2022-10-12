<template>
  <Box>
    <div class="columns">

      <Box class="column is-7">{{tarefa.descricao || 'Tarefa sem descrição'}}</Box>

      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos"/>
      </div>

    </div>
  </Box>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import Cronometro from '@/components/Cronometro.vue'
import ITarefa from '@/objects/ITarefa'
import Box from '@/components/Box.vue'

export default defineComponent({
  name: `Tarefa`,
  components: {Box, Cronometro},
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})
</script>

<style scoped>
</style>