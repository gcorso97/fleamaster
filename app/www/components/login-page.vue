<template>
    <div id="login">
        <form @submit.prevent="login">
            <div id="logoImage" class="centered"></div>
            <div id="loginInput" class="centered">
                <input class="centered" type="text" v-model="mail" />
                <input class="centered" type="password" v-model="password" />
            </div>
            <div id="loginLinks" class="centered">
                <a href="#">Passwort zurücksetzen</a>
                <a href="#">Registieren</a>
            </div>
            <button id="loginBtn" class="centered">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            mail: '',
            password: ''
        };
    },
    methods: {
        login: function() {
            var self = this;

            self.$http.post(RESTURL + '/login', {mail: self.mail, password: self.password}).then(function(response) {
                console.log(response);
            }, function(response) {
                console.error(response);
            });
        }
    }
};
</script>
