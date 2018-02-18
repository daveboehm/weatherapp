
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/landing'
import router from './router'
import moment from 'moment'
import * as VueGoogleMaps from 'vue2-google-maps'

(function () {
	Vue.config.productionTip = false
	Vue.use(moment)
	Vue.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyAFlTZgI5T0l9S7NbaU8H9qTQ9_xo5GLfY',
			libraries: 'places', // This is required if you use the Autocomplete plugin
			// OR: libraries: 'places,drawing'
			// OR: libraries: 'places,drawing,visualization'
			// (as you require)
		}
	})

	/* eslint-disable no-new */
	new Vue({
		el: '#app',
		router,
		components: { App },
		template: '<App/>'
	})

	var cors_api_host = 'cors-anywhere.herokuapp.com';
	var cors_api_url = 'https://' + cors_api_host + '/';
	var slice = [].slice;
	var origin = window.location.protocol + '//' + window.location.host;
	var open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function () {
		var args = slice.call(arguments);
		var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
		if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
			targetOrigin[1] !== cors_api_host) {
			args[1] = cors_api_url + args[1];
		}
		return open.apply(this, args);
	};
})();
