import VueResource from 'vue-resource';
import LoginPage from './../components/login-page.vue';

Vue.use(VueResource);

// for session
Vue.http.options.credentials = true;

var vm = new Vue({
    el: '#app',
    components: {
        'login-page': LoginPage
    }
});