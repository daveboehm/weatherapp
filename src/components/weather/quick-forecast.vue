<template>
    <section class="quickForecast">
            <header class="cityText">{{cityText}} <span class="currentTemp">{{currentTemp}}</span></header>
            <ul class="fiveDayForecast">
                <li class="forecast__day" v-for="(day, idx) in fiveDayForecast" :key="idx">
                    <p class="forecast__dayOfWeek" :class="weatherIcon">{{day.dayOfWeek}}</p>
                    <p class="forecast__highLowTemp">{{day.highTemp}} / {{day.lowTemp}}</p>
                    <p class="chanceOfRain">{{day.chanceOfRain}} %</p>
                </li>
            </ul>
    </section>
</template>

<script>
export default {
    name: 'QuickForecast',
    props: {
        cityText: {
            type: String,
            required: true
        },
        currentTemp: {
            type: Number,
            required: true
        },
        fiveDayForecast: {
            type: Array,
            required: true
        }
    },
    data: () => {

    },
    methods: {

    }
}
</script>

<style lang="scss">
    .quickForecast {
        border: 1px solid #d9d9d9;
        margin: 10px;
        padding: 20px;
    }
    .cityText {
        margin: 0;
        padding: 0;
        font-family: Avenir, sans-serif;
        font-size: 15px;
        font-weight: lighter;
        color: #888;
        text-transform: uppercase;
    }
</style>

