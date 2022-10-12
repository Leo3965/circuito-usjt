<template>
  <article class="tile is-child notification">
    <p class="title">{{ imageComponent.title }}</p>
    <p class="subtitle">Esquema do circuito:</p>
    <figure class="image is-4by3">
      <img height="640px" width="480px" :src="getImage">
    </figure>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import IImageComponent from "@/objects/IImageComponent";

export default defineComponent({
  name: "ImageBox",
  props: {
    imageComponent: Object as PropType<IImageComponent>
  },
  computed: {
    getImage() {
      return require(`@/assets/${this.imageComponent?.imageName}`)
    }
  }
})
</script>

<style scoped>

</style>