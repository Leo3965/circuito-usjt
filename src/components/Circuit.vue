<template>
  <section class="section is-small">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">

        <div class="tile">
          <div class="tile is-parent is-vertical">

            <FormCircuit @imageComponent="getImageComponent"/>

            <ImageBox :image-component="imageComponent"/>
          </div>


          <div class="tile is-parent">
            <FormInput v-if="imageComponent.title" :circuit-name="imageComponent.title" @result="getResult"
                       @clear="getClear"/>
          </div>
        </div>

        <div class="tile is-parent">
          <ResultBox :result="result"/>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import FormCircuit from "@/components/FormCircuit.vue";
import ImageBox from "@/components/ImageBox.vue";
import IImageComponent from "@/objects/interface/IImageComponent";
import FormInput from "@/components/FormInput.vue";
import ResultBox from "@/components/ResultBox.vue";
import Result from "@/objects/model/Result";

export default defineComponent({
  name: "Circuit",
  data() {
    return {
      imageComponent: {
        title: "",
        imageName: "",
      } as IImageComponent,
      result: {} as Result
    }
  },
  components: {ResultBox, FormInput, ImageBox, FormCircuit},
  methods: {
    getImageComponent(ic: IImageComponent) {
      this.imageComponent = ic;
    },
    getResult(result: Result) {
      this.result = result;
    },
    getClear(clear: boolean) {
      if (clear) this.result = new Result();
    }
  }

})
</script>

<style scoped>
</style>