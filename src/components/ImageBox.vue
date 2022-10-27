<template>
  <article v-if="imageComponent.imageName" class="tile is-child notification">
    <p class="title">{{ imageComponent.title }}</p>
    <div class="content">
      <blockquote v-if="imageComponent.content">{{ imageComponent.content }}</blockquote>
    </div>
    <figure class="image is-4by3">
      <img alt="Circuit image" height="640px" width="480px" :src="getImage">
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