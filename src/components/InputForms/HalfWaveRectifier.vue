<template>
  <div class="field">
    <label class="label">Tensão Eficaz No Primário (V1)</label>
    <div class="control">
      <input id="rhw-v1" class="input" type="number" placeholder="Volts">
    </div>
  </div>

  <div class="field">
    <label class="label">N1</label>
    <div class="control">
      <input id="rhw-n1" class="input" type="number" placeholder="N1">
    </div>
  </div>

  <div class="field">
    <label class="label">N2</label>
    <div class="control">
      <input id="rhw-n2" class="input" type="number" placeholder="N2">
    </div>
  </div>

  <div class="field">
    <label class="label">Tipo de Diodo</label>
    <div class="control">
      <div id="rhw-select-diode" class="select">
        <select id="rhw-diode" class="rhw-diode">
          <option value="none" selected disabled hidden>Selecione um diodo</option>
          <option value="silicon">Silicio</option>
          <option value="bronio">Bronio</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Resistência (rl)</label>
    <div class="control">
      <input id="rhw-resistance" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">Frequência Do Primário (f1)</label>
    <div class="control">
      <input id="rhw-frequency" class="input" type="number" placeholder="Hz">
    </div>
  </div>

  <div class="field">
    <label class="label">C</label>
    <div class="control">
      <input id="rhw-c" class="input" type="number" placeholder="µF">
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
import HalfWave from "@/objects/HalfWave";

export default defineComponent({
  name: "HalfWaveRectifier",
  emits: ["HalfWaveResult", "clear"],
  data() {
    return {
      halfWaveResult: {} as HalfWave,
    }
  },
  methods: {
    handleCalc() {
      const rectifierInputs = this.getInputs();
      if (this.checkInputs(rectifierInputs)) return

      this.removeWarning(rectifierInputs);
      this.halfWaveResult = new HalfWave(
          Number(rectifierInputs[0].value),
          Number(rectifierInputs[1].value),
          Number(rectifierInputs[2].value),
          rectifierInputs[3].value,
          Number(rectifierInputs[4].value),
          Number(rectifierInputs[5].value),
          Number(rectifierInputs[6].value),
      );

      const result = this.halfWaveResult.calcRectifier();
      this.$emit('HalfWaveResult', result);
    },
    handleClear() {
      const rectifierInputs = this.getInputs();
      this.removeWarning(rectifierInputs);
      rectifierInputs.forEach(e => {
        if (e.classList.contains('rhw-diode')) {
          e.value = 'none'
        } else {
          e.value = ''
        }
      });
      this.$emit('clear', true);
    },
    removeWarning(inputs: (HTMLInputElement | HTMLSelectElement)[]) {
      const errorMsg = document.querySelector('.help') as HTMLParagraphElement;
      if (errorMsg) errorMsg.remove();
      inputs.forEach(e => {
        e.classList.remove('is-danger');
        e.classList.remove('is-success');
      });
    },
    getInputs() {
      const v1 = document.querySelector('#rhw-v1') as HTMLInputElement;
      const n1 = document.querySelector('#rhw-n1') as HTMLInputElement;
      const n2 = document.querySelector('#rhw-n2') as HTMLInputElement;
      const diode = document.querySelector('#rhw-diode') as HTMLSelectElement;
      const resistance = document.querySelector('#rhw-resistance') as HTMLInputElement;
      const frequency = document.querySelector('#rhw-frequency') as HTMLInputElement;
      const c = document.querySelector('#rhw-c') as HTMLInputElement;

      return [v1, n1, n2, diode, resistance, frequency, c];
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
    }
  }
})
</script>

<style scoped>

</style>