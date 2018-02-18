<template>
<div>
  <div>Weather Details for {{$router.currentRoute.params.cityname}}</div>
  <div>{{$router.currentRoute.params.deets}}</div>
  </div>
</template>

<script>
export default {
  name: 'weather-details', 
  methods: {

  }
}
</script>
