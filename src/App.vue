<template>
  <div id="app">
    <router-view/>
    <p>{{currentWeather__today}}</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(['currentLocation', 'currentWeather__today'])
  },
  methods: {
    ...mapActions(['setCurrentWeather__today']),
    ...mapMutations(['setCurrentLocation'])
  },
  beforeMount() {
    this.setCurrentLocation();
  },
  mounted() {
    this.setCurrentWeather__today();
    // console.log('get location here')
  }
  
};
</script>

<style lang="scss">


</style>
