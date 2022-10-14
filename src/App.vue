<template>
  <div class="app-container">
    <Header/>
    <RouterView></RouterView>
    <Circuit/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";
import Hero from "@/views/Hero.vue";
import Circuit from "@/components/Circuit.vue";
import Testimonials from "@/components/Testimonials.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  components: {
    Footer,
    Testimonials,
    Hero,
    Circuit,
    Header
  },
});
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
