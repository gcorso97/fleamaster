import VueResource from 'vue-resource';
import App from './../components/App.vue';
import LoginPage from './../components/login-page.vue';
import RegistrationPage from './../components/registration-page.vue';
import WelcomePage from './../components/welcome-page.vue';
import AddItemPage from './../components/addItem-page.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

// for session
Vue.http.options.credentials = true;

// the router
var router = new VueRouter({
    routes: [
        {path: '/', component: LoginPage},
        {path: '/register', component: RegistrationPage},
        {path: '/welcome', component: WelcomePage},
        {path: '/addItem', component: AddItemPage}
    ]
});

// the vue instance
var vm = new Vue({
    el: '#app',
    components: {
        'app': App,
        'login-page': LoginPage,
        'registration-page': RegistrationPage,
        'addItem-page': AddItemPage,
        'welcome-page': WelcomePage
    },
    router: router,
    render: function(h) {
        return h(App);
    }
});
