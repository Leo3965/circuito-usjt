<template>
  <header>
    <h1>
      <img src="../assets/araras.png" class="logo" alt="logo da vue">
    </h1>
    <button class="button" @click="alterarTema">
      <img :src="iconePath" class="dark-mode-button" alt="dark mode button"/>
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
            </svg>
            <i class="fas fa-tasks">Tarefas</i>
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <i class="fas fa-project-diagram">Projetos</i>
          </router-link>
        </li>
      </ul>

    </nav>
  </header>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'BarraLateral1',
  emits: ['aoTemaAlterado'],
  data() {
    return {
      modoEscuro: false,
      iconePath: require(`../assets/sunny-outline.svg`)
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuro) {
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuro = !this.modoEscuro
      this.$emit('aoTemaAlterado', this.modoEscuro)
    },
    alterarIcone(): void {
      if (this.modoEscuro) {
        //this.iconePath = 'https://i.imgur.com/2RJTr2f.png'
        this.iconePath = require(`../assets/sunny-outline.svg`);
      } else {
        this.iconePath = 'https://i.imgur.com/ApvguGb.png'
      }
    }
  }
})
</script>

<style scoped>
/* Todo o estilo do componente */
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

h1 {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 85%;
  border-radius: 30px;
  margin-bottom: 1rem;
}

button {
  padding: 1.6rem 0.2rem 1.6rem 0.2rem;
  border-radius: 67%;
  background-color: var(--bg-primaria);
}

.dark-mode-button {
  width: 3rem;
  filter: ;
}

.panel li {
  margin: 8px 0;
}

.link {
  display: flex;
  align-items: center;
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}

.link > svg {
  margin: 2%;
  width: 10%;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
  }
}
</style>