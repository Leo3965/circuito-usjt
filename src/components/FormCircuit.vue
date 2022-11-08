<template>
  <article class="tile is-child">
    <article class="panel is-info">
      <p class="panel-heading">
        Selecione o tipo de circuito
      </p>
      <p id="circuit-links" class="panel-tabs" @click="handleCircuitList">
        <a class="is-active">Todos</a>
        <a>Retificadores</a>
        <a>Circuitos</a>
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
import IImageComponent from "@/objects/interface/IImageComponent";
import {CircuitEnum} from "@/objects/enum/CircuitEnum";
import {RectifierEnum} from "@/objects/enum/RectifierEnum";

export default defineComponent({
  name: "FormCircuit",
  emits: ["imageComponent"],
  data() {
    return {
      activeList: 'Todos',
      circuits: [CircuitEnum.CircuitWithSixResistances],
      rectifiers: [RectifierEnum.CenterTape, RectifierEnum.HalfWave, RectifierEnum.FullWave],
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

    buildImageComponent(title: string): IImageComponent {
      let image;
      let content;

      switch (title) {
        case CircuitEnum.CircuitWithSixResistances:
          image = "circuit-with-six-resistencies.png";
          content = "";
          break;

        case RectifierEnum.FullWave:
          image = "FullWave.jpg";
          content = "Retificador de ponte é o retificador que utiliza 4 diodos conectados de tal forma que faz com que a corrente passe sempre no mesmo sentido na carga.\n" +
              "O arranjo de diodos é feito da seguinte maneira, em cada ponta do transformador é conectado 2 diodos, sendo um ligado pelo anodo e o outro pelo catodo, já na " +
              "carga, em uma extremidade é conectada a dois diodos sendo ambos catodos e na outra extremidade ambos anodos, como mostra a figura.";
          break;

        case RectifierEnum.CenterTape:
          image = "retificador.png";
          content = "Retificador de onda completa com Center Tape é o retificador que utiliza dois diodos e uma conexão no transformador denominada Center Tape, quando passa uma corrente alternada, " +
              "gera-se uma diferença de potencial no transformador e no Center Tape, que varia conforme a tensão muda entre positiva e negativa, em conjunto ao funcionamento do diodo que só permite a " +
              "passagem de corrente em um único sentido, esse retificador retifica tanto a parte positiva, quanto a parte negativa da onda, aproveitando toda a onda.\n" +
              "Como o potencial entre as pontas do transformador e o Center Tape é a metade do potencial total, a tenção que chega na carga corresponde à metade da tensão total."
          break;

        case RectifierEnum.HalfWave:
          image = "640x480.png";
          content = "Retificador de meia onda é o retificador que funciona a partir de um único diodo, que permite a passagem da corrente em apenas um sentido. \n" +
              "Este retificador aproveita apenas uma das partes da onda de tensão, ou a positiva, ou a negativa.";
          break;

        default:
          image = "640x480.png";
          content = "";
      }

      return {
        title: title,
        imageName: image,
        content: content
      } as IImageComponent;
    }
  }
})
</script>

<style scoped>

</style>