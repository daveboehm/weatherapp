import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const DARK_SKY_API_KEY = 'acac1384f16e2dccd6b5813d915b0ae8';

const state = {
    currentLocation: {
        lat: 30.415969699999998,
        lon: -97.72068770000001
    },
    currentWeather__today: ''
};
const mutations = {
    setCurrentLocation(state, obj) {
        let browserInfo = navigator.geolocation.getCurrentPosition( data => {
            console.log('d', data);
            state.currentLocation.lat = data.coords.latitude;
            state.currentLocation.lon = data.coords.longitude;
            // state.currentLocation.lat = data;
        })
    },
    setCurrentTemperature(state, data) {
        state.currentWeather__today = data.currently.temperature;
    }
};

const actions = {
    setCurrentWeather__today({state, commit}) {
        // console.log('1', `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${state.currentLocation.lat},${state.currentLocation.lon}`)
        // commit('setCurrentLocation');
        Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${state.currentLocation.lat},${state.currentLocation.lon}`).then( (weather) => {
            commit('setCurrentTemperature', weather.data);
        })
    }
};

const getters = {};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});





