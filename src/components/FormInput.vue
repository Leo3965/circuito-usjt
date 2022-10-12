<template>
  <article class="tile is-child notification">
    <div class="content">
      <p class="title">Entradas do sistema</p>
      <p class="subtitle">Utilize a unidade de medida indicada nos campos</p>
      <div class="content">

        <div class="field" v-for="(input, index) in getInputFields" :key="index">
          <label class="label">{{ input.title }}</label>
          <div class="control">

            <input v-if="!(input.type === 'select')" class="input system-inputs" :type="input.type"
                   :placeholder="input.placeholder">

            <div v-if="input.type === 'select'" class="select system-inputs">
              <select>
                <option v-for="(diode, i) in input.children" :key="i">{{ diode }}</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="getInputFields.length > 0" class="field is-grouped">
          <div class="control">
            <button @click="handleCalc" class="button is-dark">Calcular</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Limpar</button>
          </div>
        </div>

        <!--        <div class="field">-->
        <!--          <label class="label">Subject</label>-->
        <!--          <div class="control">-->
        <!--            <div class="select">-->

        <!--              <select v-for="(dType, i) in input.children" :key="i">-->
        <!--                <option>{{ dType }}</option>-->
        <!--                <option>{{ dType }}</option>-->
        <!--              </select>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->


        <!--        <div class="field">-->
        <!--          <label class="label">Tensão do Primário</label>-->
        <!--          <div class="control">-->
        <!--            <input class="input" type="text" placeholder="Text input">-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="field">-->
        <!--          <label class="label">N1</label>-->
        <!--          <div class="control has-icons-left has-icons-right">-->
        <!--            <input class="input is-success" type="text" placeholder="Text input" value="Leonardo">-->
        <!--            <span class="icon is-small is-left"><i class="fas fa-user"></i></span>-->
        <!--            <span class="icon is-small is-right"><i class="fas fa-check"></i></span>-->
        <!--          </div>-->
        <!--          <p class="help is-success">Quem não tem as manha, não entra não! hehe</p>-->
        <!--        </div>-->

        <!--        <div class="field">-->
        <!--          <label class="label">N2</label>-->
        <!--          <div class="control has-icons-left has-icons-right">-->
        <!--            <input class="input is-danger" type="email" placeholder="Email input" value="hello@">-->
        <!--            <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>-->
        <!--            <span class="icon is-small is-right"><i class="fas fa-exclamation-triangle"></i></span>-->
        <!--          </div>-->
        <!--          <p class="help is-danger">N2 errado coloca outra coisa ai!</p>-->
        <!--        </div>-->

        <!--        <div class="field">-->
        <!--          <label class="label">Message</label>-->
        <!--          <div class="control">-->
        <!--            <textarea class="textarea" placeholder="Escreva!!"></textarea>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="field">-->
        <!--          <div class="control">-->
        <!--            <label class="checkbox">-->
        <!--              <input type="checkbox">-->
        <!--              I agree to the <a href="#">terms and conditions</a>-->
        <!--            </label>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="field">-->
        <!--          <div class="control">-->
        <!--            <label class="radio">-->
        <!--              <input type="radio" name="question">-->
        <!--              Yes-->
        <!--            </label>-->
        <!--            <label class="radio">-->
        <!--              <input type="radio" name="question">-->
        <!--              No-->
        <!--            </label>-->
        <!--          </div>-->
        <!--        </div>-->


      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import IInput, {inputType} from "@/objects/IInput";

export default defineComponent({
  name: "FormInput",
  props: {
    circuitName: Object as PropType<string>
  },
  computed: {
    getInputFields(): IInput[] {
      return this.buildInputs(this.circuitName);
    }
  },
  methods: {
    buildInputs(circuit: string | undefined) {
      switch (circuit) {
        case "Retificador de meia onda":
          return [
            {title: "Tensão Eficaz No Primário (V1)", type: inputType.number, placeholder: "Volts"},
            {title: "N1", type: inputType.number, placeholder: "N1"},
            {title: "N2", type: inputType.number, placeholder: "N2"},
            {title: "Tipo de Diodo", type: inputType.select, children: ["Silício", "Bronio"], placeholder: "Diodo"},
            {title: "Resistência (rl)", type: inputType.number, placeholder: "Ohms"},
            {title: "Frequência Do Primário (f1)", type: inputType.number, placeholder: "Hz"},
            {title: "C", type: inputType.number, placeholder: "µF"},
          ] as IInput[];

        default:
          return [] as IInput[];
      }
    },
    handleCalc() {
      const inputs = document.querySelectorAll('.system-inputs') as NodeList;
      inputs.forEach(i => {
        const input = i as HTMLInputElement;
        if (input.classList.contains('select')) console.log(input.textContent);
        console.log(input, input.value);
      });
    }
  }
})
</script>

<style scoped>

</style>