<template>
  <div class="field">
    <label class="label">Tensão Na Fonte</label>
    <div class="control">
      <input id="hwr-tf" class="input" type="number" placeholder="Volts">
    </div>
  </div>

  <div class="field">
    <label class="label">N1</label>
    <div class="control">
      <input id="hwr-n1" class="input" type="number" placeholder="N1">
    </div>
  </div>

  <div class="field">
    <label class="label">N2</label>
    <div class="control">
      <input id="hwr-n2" class="input" type="number" placeholder="N2">
    </div>
  </div>

  <div class="field">
    <label class="label">Frequência Na Fonte</label>
    <div class="control">
      <input id="hwr-f" class="input" type="number" placeholder="Hz">
    </div>
  </div>

  <div class="field">
    <label class="label">Tipo de Diodo</label>
    <div class="control">
      <div id="whr-diode" class="select">
        <select id="hwr-diode" class="rhw-diode">
          <option value="none" selected disabled hidden>Selecione um diodo</option>
          <option value="silicon">Silicio</option>
          <option value="germanio">Germânio</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Resistência Na Carga</label>
    <div class="control">
      <input id="hwr-r" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">C</label>
    <div class="control">
      <input id="hwr-c" class="input" type="number" placeholder="µF">
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button @click="handleCalc" class="button is-dark">Calcular</button>
    </div>
    <div class="control">
      <button @click="handleClear" class="button is-link is-light">Limpar</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import HalfWaveRectifier from "@/objects/model/HalfWaveRectifier";

export default defineComponent({
  name: "HalfWaveRectifier",
  emits: ["HalfWaveResult", "clear"],
  data() {
    return {
      HalfWaveResult: {} as HalfWaveRectifier,
    }
  },
  methods: {
    handleCalc() {
      const rectifierInputs = this.getInputs();
      if (this.checkInputs(rectifierInputs)) return

      this.removeWarning(rectifierInputs);
      this.HalfWaveResult = new HalfWaveRectifier(
          Number(rectifierInputs[0].value),
          Number(rectifierInputs[1].value),
          Number(rectifierInputs[2].value),
          Number(rectifierInputs[3].value),
          rectifierInputs[4].value,
          Number(rectifierInputs[5].value),
          Number(rectifierInputs[6].value),
      );

      const result = this.HalfWaveResult.calcRectifier();
      this.$emit('HalfWaveResult', result);
    },
    getInputs() {
      const v = document.querySelector('#hwr-tf') as HTMLInputElement;
      const n1 = document.querySelector('#hwr-n1') as HTMLInputElement;
      const n2 = document.querySelector('#hwr-n2') as HTMLInputElement;
      const f = document.querySelector('#hwr-f') as HTMLInputElement;
      const diode = document.querySelector('#hwr-diode') as HTMLSelectElement;
      const r = document.querySelector('#hwr-r') as HTMLInputElement;
      const c = document.querySelector('#hwr-c') as HTMLInputElement;

      return [v, n1, n2, f, diode, r, c];
    },
    checkInputs(inputs: (HTMLInputElement | HTMLSelectElement)[]): boolean {
      let error = false;
      inputs.forEach(i => {
        if (i.classList.contains('rhw-diode') && (i.value === 'none' || !i.value)) {
          const html = '<p class="help is-danger">Campo obrigatório</p>';
          const select = document.querySelector('#rhw-select-diode') as HTMLDivElement;
          select.insertAdjacentHTML('afterend', html);
          error = true;
        }

        if (Number(i.value) <= 0 && !(i.classList.contains('rhw-diode'))) {
          i.classList.add('is-danger')
          error = true;
        } else {
          i.classList.add('is-success')
        }
      });

      return error;
    },
    removeWarning(inputs: (HTMLInputElement | HTMLSelectElement)[]) {
      const errorMsg = document.querySelector('.help') as HTMLParagraphElement;
      if (errorMsg) errorMsg.remove();
      inputs.forEach(e => {
        e.classList.remove('is-danger');
        e.classList.remove('is-success');
      });
    },
    handleClear() {
      const rectifierInputs = this.getInputs();
      this.removeWarning(rectifierInputs);
      rectifierInputs.forEach(e => {
        if (e.classList.contains('hwr-diode')) {
          e.value = 'none'
        } else {
          e.value = ''
        }
      });
      this.$emit('clear', true);
    }
  }
});

</script>

<style scoped>

</style>