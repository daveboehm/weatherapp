<template>
  <div id="app">
    <router-view/>
    <label>
      <input type="text" v-model="searchLocation.city" />
      <button @click="onCitySearch">City Search</button>
    </label>
    <hr>
    
    <!-- <p>Current Temperate at this computer's location: {{currentWeather.data.currently.temperature || 'Loading'}}</p> -->
    <ul class="searchedCity">
      <li class="cityInformation">
        <p>{{searchResults.city}}</p>
        <p>{{searchResults.temperature}}</p>
        <p>{{searchResults.chanceOfRain}}</p>
        <button class="button" @click="onCityTrack">Track this City's Weather</button>
      </li>
    </ul>

    <ul class="trackedCities">
      <li v-for="(city,i) in trackedWeather" :key="i" class="cityInformation">
        <p>{{i}}</p>
        <p>{{city.city}}</p>
        <p>{{city.temperature}}</p>
        <p>{{city.chanceOfRain}}</p>
      </li>
    </ul>
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
      currentWeather: {
        data: {
          currently: {
            temperature: undefined
          }
        }
      },

      // The tracked cities per user's local Storage
      trackedWeather: [],
      
      // Placeholder for current location and local weather stats
      userLocation: {
        city: '',
        lat: '',
        lng: '',
        temperature: '',
        chanceOfRain: ''
      },

      // Placeholder for searched city's weather and stats
      searchLocation: {
        city: '',
        coords: {},
        temperature: '',
        chanceOfRain: ''
      },
      searchResults: {
        city: '',
        coords: {},
        temperature: '',
        chanceOfRain: ''
      },
    }
  },
  methods: {
    getWeather(coords) {
      Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coords.lat},${coords.lng}`).then(weather => {
        this.searchResults.city = weather.data.currently.city;
        this.searchResults.temperature = weather.data.currently.temperature;
        this.searchResults.chanceOfRain = weather.data.currently.chanceOfRain;
        });
    },
    getCurrentLocationWeather() {
      navigator.geolocation.getCurrentPosition( data => {
        let location = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        }
        Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${location.lat},${location.lng}`).then(weather => {
          this.currentWeather = weather;
        });
      });
    },
    onCitySearch() {
      let that = this;
      return new Promise( (resolve, reject) => {
        Geocoder.geocode(that.searchLocation.city, function ( err, data ) {
          that.searchLocation.city = data.results[0].formatted_address;
          that.searchLocation.coords = data.results[0].geometry.location;
          resolve();
        });
      }).then(() => {
        this.getWeather(this.searchLocation.coords);
      });
    },
    onCityTrack($event) {
      let ls = window.localStorage;
      this.trackedWeather.push(this.searchLocation);
      ls.setItem('trackedWeather', JSON.stringify(this.trackedWeather));
    }
  },
  beforeMount() {
    let hasTrackedCitiesInLocalStorage = window.localStorage.getItem('trackedWeather');
    if (hasTrackedCitiesInLocalStorage) {
      this.trackedWeather = JSON.parse(hasTrackedCitiesInLocalStorage);
      return;
    } else {
      return new Promise( (resolve, reject) => {
        this.getCurrentLocationWeather();
        resolve();
      });
      
    }

  }
  
};
</script>

<style lang="scss">

.cityInformation {
  padding: 20px;
  margin: 20px;
  border: 1px solid #d9d9d9; 
}


</style>
