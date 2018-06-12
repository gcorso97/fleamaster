<template>
    <div id="login" class="centered-container">
        <md-content class="md-elevation-3">
            <div class="title">
                <img src="img/logo.png">
                <div class="md-title">FleaMaster</div>
                <div class="md-body-1">Shopping. Auf besondere Weise</div>
                <div class="md-body-1 error-message" v-if="invalidCredentials">Ungültige Zugangsdaten</div>
            </div>
            <div class="form">
                <md-field>
                    <label>E-Mail</label>
                    <md-input v-model="mail" autofocus v-on:input="validateInput"></md-input>
                </md-field>
                <md-field md-has-password>
                    <label>Passwort</label>
                    <md-input v-model="password" type="password" v-on:input="validateInput"></md-input>
                </md-field>
            </div>
            <div class="actions md-layout md-alignment-center-space-between">
                <router-link to="/register">Account erstellen</router-link>
            </div>
            <div class="actions md-layout md-alignment-center-space-between">
                <router-link to="/passwordForgot">Passwort vergessen</router-link>
                <md-button class="md-raised md-primary" @click="login" id="loginBtn" disabled>Login</md-button>
            </div>
            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
        </md-content>
        <div class="background"></div>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            loading: false,
            invalidCredentials: false,
            mail: '',
            password: ''
        };
    },
    methods: {
      /**
       * Validates Userinput and switches status of the login button
       */
        validateInput: function () {
            var self = this;

            loginBtn.disabled = !(self.validMail(self.mail) && self.validPassword(self.password));
            self.invalidCredentials = false;
        },
        /**
         * Description of function
         * @param  {String} the email which the user entered
         * @return {Boolean} says if email matches regexp or not
         */
        validMail: function(mail) {
            var regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return regExpMail.test(mail);
        },
        validPassword: function(password) {
            return (this.password.length >= 6);
        },
        login: function() {
            var self = this;

            self.loading = true;
            self.$http.post(RESTURL + '/login', {mail: self.mail, password: self.password}).then(function(response) {
                // success
                self.loading = false;
                self.$router.push('welcome');
            }, function(response) {
                // error
                self.loading = false;
                self.invalidCredentials = true;
                console.error(response);
            });
        }
    }
};
</script>
