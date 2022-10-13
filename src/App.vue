<template>
  <Header/>
  <Hero/>
  <Circuit/>
  <Testimonials/>
  <Footer/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
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
</style>
