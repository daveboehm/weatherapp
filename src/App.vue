<template>
  <div id="app">
    <router-view/>
    <label>
      <input type="text" v-model="city" />
      <button @click="getCityCoords()">Get Weather</button>
    </label>
    <p>{{currentWeather.data.currently.temperature || 'Loading'}}</p>
  </div>
</template>

<script>
import Axios from 'axios';
import Geocoder from 'geocoder';
import Promise from 'bluebird';

const DARK_SKY_API_KEY = 'acac1384f16e2dccd6b5813d915b0ae8';

export default {
  name: "App",
  data () {
    return {
      location: {},
      city: '',
      currentWeather: {
        data: {
          currently: 0
        }
      }
    }
  },
  computed: {
    
  },
  methods: {
    getCityCoords() {
      Geocoder.geocode(this.city, (err, data) => {
          this.city = data.results[0].formatted_address;
          this.lat = data.results[0].geometry.location.lat;
          this.lon = data.results[0].geometry.location.lon;
          this.getWeather()
      });
    },
    getWeather(location) {
      console.log(location);
      
    }
  },
  beforeMount() {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition( data => {
        let location = {
          lat: data.coords.latitude,
          lon: data.coords.longitude
        }
        Axios.get(`https://api.darksky.net/forecast/acac1384f16e2dccd6b5813d915b0ae8/${location.lat},${location.lon}`).then( (weather) => {
          this.currentWeather = weather;
        });
      });
      
      resolve();
    });
    
  }
  
};
</script>

<style lang="scss">


</style>
