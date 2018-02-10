<template>
  <div id="app">
    <router-view/>
    <label>
      <input type="text" v-model="searchLocation.city" />
      <button @click="onCitySearch()">City Search</button>
    </label>
    <p>Current Temperate at this computer's location: {{currentWeather.data.currently.temperature || 'Loading'}}</p>
    <ul class="searchedCity">
      <li class="cityInformation">
        <p>{{searchLocation.city}}</p>
        <p>{{searchLocation.temperature}}</p>
        <p>{{searchLocation.chanceOfRain}}</p>
        <button class="button" @click="onCityTrack">Track this City's Weather</button>
      </li>
    </ul>
    <ul class="trackedCities">
      <li v-for="(city,i) in trackedWeather" :key="i" class="cityInformation">
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
      trackedWeather: [
        {
          city: 'Austin, TX',
          temperature: '54 F',
          chanceOfRain: '27%'
        }, {
          city: 'Madison, WI',
          temperature: '11 F',
          chanceOfRain: '0.5%'
        }
      ],
      
      // Placeholder for current location and local weather stats
      userLocation: {
        city: '',
        lat: '',
        lon: '',
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
    }
  },
  methods: {
    getWeather(coords) {
      console.log(coords)
      Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coords.lat},${coords.lon}`).then(weather => {
        this.searchLocation.temperature = weather.currently.temperature;
      });
    },
    getCurrentLocationWeather() {
      navigator.geolocation.getCurrentPosition( data => {
        let location = {
          lat: data.coords.latitude,
          lon: data.coords.longitude
        }
        Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${location.lat},${location.lon}`).then(weather => {
          this.currentWeather = weather;
          console.log(weather)
        });
      });
    },
    onCitySearch($event) {
      return new Promise( (resolve, reject) => {
        Geocoder.geocode(this.searchLocation.city, function ( err, data ) {
          this.searchLocation.city = data.results[0].formatted_address;
          this.searchLocation.coords = data.results[0].geometry.location;
        });
        this.getWeather(this.searchLocation.coords)
      });
    },
    getCityCoords() {
      return new Promise( (resolve, reject) => {
        Geocoder.geocode(this.city, (err, data) => {
          this.city = data.results[0].formatted_address;
          this.lat = data.results[0].geometry.location.lat;
          this.lon = data.results[0].geometry.location.lon;
          
        });
      }).then( () => {
        this.getWeather(this.userLocation);
      })
      
    },
    getWeather(location) {
      console.log(location);
      
    },
    onCityTrack($event) {
      console.log('set this shit to local storage');
    }
  },
  beforeMount() {
    return new Promise( (resolve, reject) => {
      this.getCurrentLocationWeather();
      resolve();
    });
  }
  
};
</script>

<style lang="scss">

.trackedCity {
  padding: 20px;
  margin: 20px;
  border: 1px solid #d9d9d9; 
}


</style>
