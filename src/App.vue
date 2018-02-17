<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>
import Axios from "axios";
import Geocoder from "geocoder";
import Promise from "bluebird";
const DARK_SKY_API_KEY = "acac1384f16e2dccd6b5813d915b0ae8";
import QuickForecast from "./components/weather/quick-forecast.vue";



export default {
  name: "App",
  // components: {
  //   "quick-forecast": QuickForecast
  // },
  data() {
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
        city: "",
        lat: "",
        lng: "",
        temperature: "",
        chanceOfRain: ""
      },

      // Placeholder for searched city's weather and stats
      searchLocation: {
        city: "",
        coords: {},
        temperature: "",
        chanceOfRain: ""
      },
      searchResults: {
        city: "",
        coords: {},
        temperature: "",
        chanceOfRain: ""
      }
    };
  },
  methods: {
    getWeather(coords) {
      Axios.get(
        `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coords.lat},${
          coords.lng
        }`
      ).then(weather => {
        this.searchResults.city = weather.data.currently.city;
        this.searchResults.temperature = weather.data.currently.temperature;
        this.searchResults.chanceOfRain = weather.data.currently.chanceOfRain;
      });
    },
    getCurrentLocationWeather() {
      navigator.geolocation.getCurrentPosition(data => {
        let location = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        };
        Axios.get(
          `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${
            location.lat
          },${location.lng}`
        ).then(weather => {
          this.currentWeather = weather;
        });
      });
    },
    onCitySearch() {
      let that = this;
      return new Promise((resolve, reject) => {
        Geocoder.geocode(that.searchLocation.city, function(err, data) {
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
      ls.setItem("trackedWeather", JSON.stringify(this.trackedWeather));
    },
    loadTrackedCityWeather() {
      this.trackedWeather.map( (city, idx) => {

        Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${city.coords.lat},${city.coords.lng}`).then(weather => {
          this.trackedWeather[idx].fiveDayForecast = weather.data.daily.data;
        })
      });
    }
  },
  beforeMount() {
    let hasTrackedCitiesInLocalStorage = window.localStorage.getItem(
      "trackedWeather"
    );
    if (hasTrackedCitiesInLocalStorage) {
      this.trackedWeather = JSON.parse(hasTrackedCitiesInLocalStorage);
      this.loadTrackedCityWeather();
      return;
    } else {
      return new Promise((resolve, reject) => {
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
