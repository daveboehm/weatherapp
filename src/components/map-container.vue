<template>
    <div class="cityDisplay">
        <header class="cityDisplay__header">
            <h1 class="cityDisplay__h1">{{cityData.city}}</h1>
        </header>
        <div class="cityDisplayContainer" v-if="cityData.coords.lat != undefined">
            <div class="googleMapContainer">
                <gmap-map
                    :center="cityData.coords"
                    :zoom="7"
                    style="width: 100%; height: 250px;">
                    <gmap-marker
                        :position="cityData.coords"
                        :clickable="true"
                        :draggable="true">
                    </gmap-marker>
                </gmap-map>
            </div>
            <ul class="weatherStatsContainer">
                <li v-for="(day,i) in forecast" :key="i" class="weatherStat">
                    <header class="cityDisplay__header">
                        <h2 class="cityDisplay__h2">{{day.dayOfWeek}}</h2>
                    </header>
                    <div class="weatherStat__block">
                        <div class="weatherStat__item weather__highTemp">
                            {{day.highTemp}} Degrees F
                        </div>
                        <div class="weatherStat__item weather__lowTemp">
                            {{day.lowTemp}} Degrees F
                        </div>
                        <div class="weatherStat__item weather__rainChance">
                            {{day.rainChance}} %
                        </div>
                        <div class="weatherStat__item weather__gotoHourly">
                            go to hourly forecast
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Axios from "axios";
    import Geocoder from "geocoder";
    import Promise from 'bluebird';
    import moment from 'moment';
    const DARK_SKY_API_KEY = "acac1384f16e2dccd6b5813d915b0ae8";

    export default {
        name: 'map-container',
        props: {
            city: {
                type: String,
                required: true
            }
        },
        watch: {
            city: function(newValue, oldValue) {
                this.setResults(newValue);
            }
        },
        data() {
            return {
                cityData: {
                    city: '',
                    coords: {
                        lat: undefined,
                        lng: undefined
                    },
                    dateToday: moment().format('MMMM Do YYYY'),
                    routeHourly: '/'
                },
                forecast: []
            }
        },
        methods: {
            setResults(val) {
                // Return City Name and Lat/Lng
                return new Promise( (resolve, reject) => {
                    Geocoder.geocode(val, (err, data) => {
                        if (err) return reject(err);
                        this.cityData.city = data.results[0].formatted_address;
                        this.cityData.coords = data.results[0].geometry.location;
                        resolve();
                    });
                }).then( () => {
                // Fetch Today's Weather for Coords
                    Axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${this.cityData.coords.lat},${this.cityData.coords.lng}`).then(weather => {
                        _.map(weather.data.daily.data, (day, i) => {
                            this.forecast.push({
                                dayOfWeek: moment().add(i, 'days').format('MMMM Do YYYY'),
                                highTemp: day.apparentTemperatureHigh,
                                lowTemp: day.apparentTemperatureLow,
                                rainChance: day.precipProbability
                            });
                        });

                    }).then( () => {
                        this.$emit('resolved', true);
                    });
                });
            }
        }
    }
</script>

<style lang="scss">
    * {
        font-family: "Arvo";
        box-sizing: border-box;
    }
    .googleMap {
        width: 100vw;
        max-width: 100%;
        height: 300px;
    }
    .cityDisplay__header {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .cityDisplay__h1 {
        margin: 0;
    }
    .cityDisplay__h2 {
        margin: 0;
    }
    .cityDisplayContainer {
        display: block;
    }
    .googleMapContainer {
        width: 100%;
        max-width: 100%;
    }
    .weatherStatsContainer {
        margin: 0;
        padding: 0;
    }
    .weatherStat {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .weatherStat__block {
        display: flex;
        flex-direction: row;
        max-width: 100%;
        width: 100%;
    }
    .weatherStat__item {
        display: block;
        width: 100px;
        border: 1px solid #bbb;
        padding: 10px;
        background-color: red;

    }
</style>
