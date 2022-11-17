<template>
  <article class="tile is-child notification">
    <p class="title">Circuito lógico</p>
    <p class="subtitle">Modifique a(s) entrada(s) e veja o resultado</p>
    <div class="content">
      <div class="tile">
        <!-- Entradas -->
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification is-transparent">
            <p class="title">Entrada(s)</p>
            <p class="subtitle">Porta do tipo {{ this.imageComponent.title }}</p>
            <div class="content">
              <!-- Content -->
              <div class="control gate-content">
                <label class="radio gate-input">
                  <span class="label">A</span>
                  <input id="a" :onclick="calResult" v-model="inputA" class="big-ratio" type="checkbox">
<!--                  <label for="a">{{ inputA }}</label>-->
                </label>
                <label v-if="showB" class="radio gate-input">
                  <span class="label">B</span>
                  <input id="b" :onclick="calResult" v-model="inputB" class="big-ratio" type="checkbox">
<!--                  <label for="b">{{ inputB }}</label>-->
                </label>
              </div>
            </div>
          </article>
        </div>

        <!-- Porta -->
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <figure class="image is-4by3">
              <img alt="gate" height="640px" width="480px" :src="getImage"/>
            </figure>
          </article>
        </div>

        <!-- Saida -->
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <figure class="image is-4by3">
              <img alt="out" height="640px" width="480px" :src="resultImage"/>
            </figure>
          </article>
        </div>

      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import IImageComponent from "@/objects/interface/IImageComponent";
import {GateEnum} from "@/objects/enum/GateEnum";
import GateResult, {GateValue} from "@/objects/model/GateResult";

export default defineComponent({
  name: "GateComponent",
  emits: ["gateResult"],
  data() {
    return {
      hasTwoInputs: false,
      inputA: false,
      inputB: false,
      resultImage: require(`@/assets/led.png`)
    }
  },
  props: {
    imageComponent: Object as PropType<IImageComponent>
  },
  computed: {
    getImage() {
      return require(`@/assets/${this.imageComponent?.imageName}`);
    },
    showB() {
      return !(this.imageComponent?.title == GateEnum.NOT)
    }
  },
  methods: {
    calResult(e: Event): void {
      const result = new GateResult();
      result.title = 'Tabela Verdade';

      const id = e.target?.id;
      if (id === 'a') this.inputA = !this.inputA
      if (id === 'b') this.inputB = !this.inputB

      if (this.imageComponent?.title == GateEnum.NOT) {
        if (this.inputA) {
          this.resultImage = require(`@/assets/led.png`);
        } else {
          this.resultImage = require(`@/assets/led-on.png`);
        }
        result.addValue(new GateValue('0', 'X', '1'));
        result.addValue(new GateValue('0', 'X', '1'));
        result.addValue(new GateValue('1', 'X', '0'));
        result.addValue(new GateValue('1', 'X', '0'));
      }

      if (this.imageComponent?.title == GateEnum.AND) {
        if (this.inputA && this.inputB) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '0'));
        result.addValue(new GateValue('0', '1', '0'));
        result.addValue(new GateValue('1', '0', '0'));
        result.addValue(new GateValue('1', '1', '1'));
      }

      if (this.imageComponent?.title == GateEnum.OR) {
        if (this.inputA || this.inputB) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '0'));
        result.addValue(new GateValue('0', '1', '1'));
        result.addValue(new GateValue('1', '0', '1'));
        result.addValue(new GateValue('1', '1', '1'));
      }

      if (this.imageComponent?.title == GateEnum.NAND) {
        if (!(this.inputA && this.inputB)) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '1'));
        result.addValue(new GateValue('0', '1', '1'));
        result.addValue(new GateValue('1', '0', '1'));
        result.addValue(new GateValue('1', '1', '0'));
      }

      if (this.imageComponent?.title == GateEnum.NOR) {
        if (!(this.inputA || this.inputB)) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '1'));
        result.addValue(new GateValue('0', '1', '0'));
        result.addValue(new GateValue('1', '0', '0'));
        result.addValue(new GateValue('1', '1', '0'));
      }

      if (this.imageComponent?.title == GateEnum.XOR) {
        if ((this.inputA !== this.inputB)) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '0'));
        result.addValue(new GateValue('0', '1', '1'));
        result.addValue(new GateValue('1', '0', '1'));
        result.addValue(new GateValue('1', '1', '0'));
      }

      if (this.imageComponent?.title == GateEnum.NXOR) {
        if (this.inputA === this.inputB) {
          this.resultImage = require(`@/assets/led-on.png`);
        } else {
          this.resultImage = require(`@/assets/led.png`);
        }
        result.addValue(new GateValue('0', '0', '1'));
        result.addValue(new GateValue('0', '1', '0'));
        result.addValue(new GateValue('1', '0', '0'));
        result.addValue(new GateValue('1', '1', '1'));
      }

      this.$emit('gateResult', result);
    }
  }
})
</script>

<style scoped>
.gate-content {
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  gap: 4rem;
  align-items: flex-start;
}

.gate-input {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.big-ratio {
  transform: scale(2);
}
</style>