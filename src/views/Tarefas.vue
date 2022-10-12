<template>
  <Formulario @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje!
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Formulario from '@/components/Formulario.vue'
import Tarefa from '@/components/Tarefa.vue'
import ITarefa from '@/objects/ITarefa'
import Box from "@/components/Box.vue";

export default defineComponent({
  name: `Tarefas`,
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuro: false
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuro: boolean): void {
      this.modoEscuro = modoEscuro
    }
  },
  components: {
    Box,
    Tarefa,
    Formulario
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
