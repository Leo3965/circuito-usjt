<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label class="label" for="nomeDoProjeto">
          Nome do projeto
        </label>
        <input
            class="input"
            type="text"
            v-model="nomeDoProjeto"
            id="nomeDoProjeto"
        >
        <div class="field">
          <button class="button" type="submit">
            Salvar
          </button>
        </div>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{projeto.id}}</td>
        <td>{{projeto.nome}}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import IProjeto from "@/objects/IProjeto";

export default defineComponent({
  name: `Projetos`,
  data() {
    return {
      nomeDoProjeto: '',
      projetos: [] as IProjeto[]
    }
  },
  methods: {
    salvar(): void {

      const projeto: IProjeto = {
        nome: this.nomeDoProjeto,
        id: new Date().toISOString()
      }

      this.projetos.push(projeto)
      this.nomeDoProjeto = ''
    }
  }
})
</script>

<style scoped>

.projetos {
  padding: 1.25rem;
}

</style>