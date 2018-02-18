import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:cityname',
      name: 'cityforecast',
      component: () => import('../components/map-container')
    },
    {
      path: '/:cityname/weather-details',
      name: 'weather-details',
      component: () => import('../pages/weather-details'),
    }
  ]
})
