<template>
  <div class="field">
    <label class="label">1ªFonte (fm1)</label>
    <div class="control">
      <input id="csr-f1" class="input" type="number" placeholder="Volts">
    </div>
  </div>

  <div class="field">
    <label class="label">1ªResistência 1ªMalha (r1m1)</label>
    <div class="control">
      <input id="csr-r1m1" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">2ªResistência 1ªMalha (r2m1)</label>
    <div class="control">
      <input id="csr-r2m1" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">3ªResistência 1ªMalha (r3m1)</label>
    <div class="control">
      <input id="csr-r3m1" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">Resistência entre as Malhas (r1m12)</label>
    <div class="control">
      <input id="csr-r1m12" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">2ªFonte (fm2)</label>
    <div class="control">
      <input id="csr-f2" class="input" type="number" placeholder="Volts">
    </div>
  </div>

  <div class="field">
    <label class="label">1ªResistência 2ªMalha (r1m2)</label>
    <div class="control">
      <input id="csr-r1m2" class="input" type="number" placeholder="Ohms">
    </div>
  </div>

  <div class="field">
    <label class="label">2ªResistência 2ªMalha (r2m2)</label>
    <div class="control">
      <input id="csr-r2m2" class="input" type="number" placeholder="Ohms">
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
import CircuitSixResistances from "@/objects/model/CircuitSixResistances";

export default defineComponent({
  name: "CircuitSixResistances",
  emits: ["result", "clear"],
  data() {
    return {
      sixResistanceResult: {} as CircuitSixResistances
    }
  },
  methods: {
    getInputs() {
      const f1 = document.querySelector('#csr-f1') as HTMLInputElement;
      const r1m1 = document.querySelector('#csr-r1m1') as HTMLInputElement;
      const r2m1 = document.querySelector('#csr-r2m1') as HTMLInputElement;
      const r3m1 = document.querySelector('#csr-r3m1') as HTMLInputElement;
      const r1m12 = document.querySelector('#csr-r1m12') as HTMLInputElement;
      const f2 = document.querySelector('#csr-f2') as HTMLInputElement;
      const r1m2 = document.querySelector('#csr-r1m2') as HTMLInputElement;
      const r2m2 = document.querySelector('#csr-r2m2') as HTMLInputElement;

      return [f1, r1m1, r2m1, r3m1, r1m12, f2, r1m2, r2m2];
    },
    handleClear() {
      const inputs = this.getInputs();
      this.removeWaring(inputs);
      inputs.forEach(i => {
        i.value = '';
      });
      this.$emit('clear', true);
    },
    removeWaring(inputs: (HTMLInputElement)[]) {
      inputs.forEach(i => {
        i.classList.remove('is-danger');
        i.classList.remove('is-success');
      });
    },
    handleCalc() {
      const inputs = this.getInputs();
      if (this.checkInputs(inputs)) return

      this.sixResistanceResult = new CircuitSixResistances(
          Number(inputs[0].value),
          Number(inputs[1].value),
          Number(inputs[2].value),
          Number(inputs[3].value),
          Number(inputs[4].value),
          Number(inputs[5].value),
          Number(inputs[6].value),
          Number(inputs[7].value)
      );
      const result = this.sixResistanceResult.calcCircuit();
      this.$emit('result', result);
    },
    checkInputs(inputs: (HTMLInputElement | HTMLSelectElement)[]): boolean {
      let error = false;
      inputs.forEach(i => {
        if ((Number(i.value) <= 0)) {
          i.classList.remove('is-success');
          i.classList.add('is-danger');
          error = true;
        } else {
          i.classList.remove('is-danger');
          i.classList.add('is-success');
        }
      });
      return error;
    }
  }
})
</script>

<style scoped>

</style>