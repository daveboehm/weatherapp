// import Vue from 'vue'
// import Vuex from 'vuex'
// import Axios from 'axios'
// import Promise from 'bluebird'
// import Geocoder from 'geocoder'



// const state = {
//     currentLocation: {
//         lat: 30.415969699999998,
//         lon: -97.72068770000001
//     },
//     currentWeather__today: '',
//     citySearch: ''
// };
// const mutations = {
//     setCurrentLocation(state, obj) {
        
//     },
//     setCurrentTemperature(state, data) {
//         state.currentWeather__today = data.currently.temperature;
//     }
// };

// const actions = {
//     setCurrentWeather__today({state, commit}) {
//         return new Promise((resolve, reject) => {
//             commit('setCurrentLocation');
            
//             resolve();
//         });
//     },
//     getCitySearch({state, commit}, val) {
//         return new Promise( (resolve, reject) =>{
//             console.log(state.citySearch)
//             Geocoder.geocode(state.citySearch, function(err, data) {
//                 console.log(data)
//             })
//             resolve();
//         })
//     }
// };

// const getters = {};

// Vue.use(Vuex);
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// });





