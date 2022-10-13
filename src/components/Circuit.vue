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
            <FormInput :circuit-name="imageComponent.title"/>
          </div>
        </div>

        <div class="tile is-parent">
          <ResultBox/>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import FormCircuit from "@/components/FormCircuit.vue";
import ImageBox from "@/components/ImageBox.vue";
import IImageComponent from "@/objects/IImageComponent";
import FormInput from "@/components/FormInput.vue";
import ResultBox from "@/components/ResultBox.vue";

export default defineComponent({
  name: "Circuit",
  data() {
    return {
      imageComponent: {
        title: "Imagem Do Circuito",
        imageName: "640x480.png",
      } as IImageComponent
    }
  },
  components: {ResultBox, FormInput, ImageBox, FormCircuit},
  methods: {
    getImageComponent(ic: IImageComponent) {
      this.imageComponent = ic;
    }
  }

})
</script>

<style scoped>

</style>