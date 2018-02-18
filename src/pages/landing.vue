<template>
    <div>
        <div v-if="!isLoading">
            <section class="section">
                <form @submit="submitForm" class="citySearchForm">
                    <input placeholder="Search..."
                        type="search"
                        icon="magnify"
                        v-model="citySearchInput" />
                    <button class="" type="submit">Search</button>
                </form>
            </section>
            <section class="section" v-show="citySearchedFor">
                <map-container :city="citySearch" @resolved="resultsReturned" />
            </section>  

            <!-- <section class="section">
                <div v-for="(day,i) in forecastDays" :key="i" class="forecastDay">
                    <header>
                        <h1>{{day.dayOfWeek}}</h1>
                        <h2>{{day.date}}</h2>
                    </header>
                    <div class="weatherStatsContainer weatherStats--horizontal">
                        <div class="weather__highTemp">
                            {{highTemp}}
                        </div>
                        <div class="weather__lowTemp">
                            {{lowTemp}}
                        </div>
                        <div class="weather__rainChance">
                            {{rainChance}}
                        </div>
                        <div class="weather__gotoHourly">
                            {{routerGoToHourly}}
                        </div>
                    </div>
                </div>
            </section> -->
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
    import Promise from "bluebird";
    import MapContainer from '../components/map-container';
    export default {
        components: {
            'map-container': MapContainer
        },
        data() {
            return {
                isLoading: true,
                citySearchedFor: false,
                citySearchInput: '',
                citySearch: ''
            }
        },
        beforeMount() {
            // get current location
            // set lat lon googlemap coords
        },
        mounted() {
            // initiate weather fetch call inside promise
            // set finishedLoading to true
            this.isLoading = false;
        },
        methods: {
            submitForm($event) {
                $event.preventDefault();
                this.citySearch = this.citySearchInput;
            },
            resultsReturned(val) {
                if (val) this.citySearchedFor = true;
            }
        }
    };
</script>

<style lang="scss">
    html, body {
        margin: 0;
        padding: 0;
    }
    * {
        font-family: "Arvo";
        box-sizing: border-box;
    }
    .section {
        display: block;
        width: auto;
        max-width: 100%;
        padding: 10px;
        clear: both;
    }
    .citySearchForm {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border: 1px solid #eee;
        input, button {
            padding: 10px;
        }
        input {
            flex-grow: 1;
        }
        button {
            border: none;
            border-left: 1px solid #eee;
            background-color: #fff;
        }
    }
</style>
