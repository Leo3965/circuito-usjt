<template>
  <article class="tile is-child">
    <article class="panel is-info">
      <p class="panel-heading">
        Selecione o tipo de circuito
      </p>
      <p id="circuit-links" class="panel-tabs" @click="handleCircuitList">
        <a class="is-active">Retificadores</a>
        <a>Circuitos</a>
        <a>Todos</a>
      </p>
      <!-- Search Bar -->
      <!--      <div class="panel-block">-->
      <!--        <p class="control has-icons-left">-->
      <!--          <input class="input is-info" type="text" placeholder="Procurar">-->
      <!--          <span class="icon is-left"><i class="fas fa-search" aria-hidden="true"></i></span>-->
      <!--        </p>-->
      <!--      </div>-->


      <a @click="handleCircuit" class="panel-block is-active" v-for="circuit in getActiveList" :key="circuit">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
        {{ circuit }}
      </a>

    </article>
  </article>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import IImageComponent from "@/objects/IImageComponent";
import {RectifierEnum} from "@/objects/CircuitEnum";

export default defineComponent({
  name: "FormCircuit",
  emits: ["imageComponent"],
  data() {
    return {
      activeList: 'Retificadores',
      circuits: ['Circuito 1', 'Circuito 2', 'Circuito 3'],
      rectifiers: [RectifierEnum.HalfWave, 'Retificador 2', 'Retificador 3'],
    }
  },
  computed: {
    getActiveList(): string[] {
      switch (this.activeList) {
        case 'Todos':
          return [...this.circuits, ...this.rectifiers];
        case 'Retificadores':
          return this.rectifiers;
        case 'Circuitos':
          return this.circuits;
        default:
          return [];
      }
    }
  },
  methods: {
    handleCircuitList(event: Event) {
      const link = event.target as HTMLAnchorElement;
      if (link.classList.contains('is-active')) return

      const parentLinks = document.querySelector('#circuit-links');
      const links = parentLinks?.children as HTMLCollection;
      for (let l of links) {
        l.classList.remove('is-active');
      }
      this.activeList = link.innerText;
      link.classList.toggle('is-active');
    },
    handleCircuit(event: Event) {
      const link = event.target as HTMLAnchorElement;
      const imageComponent = this.buildImageComponent(link.innerText);
      this.$emit("imageComponent", imageComponent);
    },

    buildImageComponent(title: string) {
      let image;

      switch (title) {
        case RectifierEnum.HalfWave:
          image = "retificador.png";
          break;
        default:
          image = "640x480.png";
      }

      const ic: IImageComponent = {
        title: title,
        imageName: image
      }

      return ic;
    }
  }
})
</script>

<style scoped>

</style>