<template>
  <section class="hero is-medium is-info">
    <div class="hero-body">

      <div class="columns">
        <div class="column">
          <p class="title">
            Projeto A3
          </p>
          <p class="subtitle">
            Universidade São Judas - 13/10/2022
          </p>
        </div>
        <div class="column is-three-quarters">
          <Testimonials/>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Testimonials from "@/components/Testimonials";

export default {
  name: "About",
  components: {Testimonials}
}
</script>

<style scoped>

</style>