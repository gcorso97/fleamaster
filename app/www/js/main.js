import VueResource from 'vue-resource';
import LoginPage from './../components/login-page.vue';

Vue.use(VueResource);

var vm = new Vue({
    el: '#app',
    components: {
        'login-page': LoginPage
    }
});