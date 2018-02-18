<template>
    <div>
        <div v-if="!isLoading">
            <section class="section">
                <form @submit="submitForm" class="citySearchForm">
                    <input placeholder="Search..."
                        type="search"
                        v-model="citySearchInput" />
                    <button class="" type="submit">Search</button>
                </form>
            </section>
            <router-view></router-view>
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
                citySearchInput: ''
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
                this.$router.push({name: 'cityforecast', params: { cityname: this.citySearchInput }})
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
