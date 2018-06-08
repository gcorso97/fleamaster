<template>
    <div id="registrationPage" class="page-container md-layout-column">
        <md-content class="md-elevation-3">
            <form @submit.prevent="register">
                <div id="logoImage" class="centered"></div>
                <md-card-content>
                    <md-field>
                        <label>Vorname</label>
                        <md-input autofocus type="text" v-model="user.firstname" required/>
                    </md-field>
                    <md-field>
                        <label>Nachname</label>
                        <md-input autofocus type="text" v-model="user.lastname" required/>
                    </md-field>
                    <md-field>
                        <label>Straße + Hausnummer</label>
                        <md-input autofocus type="text" v-model="user.street" required/>
                    </md-field>
                    <md-field>
                        <label>Postleitzahl</label>
                        <md-input autofocus type="text" v-model="user.zipcode" required/>
                    </md-field>
                    <md-field>
                        <label>Ort</label>
                        <md-input autofocus type="text" v-model="user.city" required/>
                    </md-field>
                    <md-field>
                        <label>E-Mail</label>
                        <md-input autofocus type="text" v-model="user.mail" required v-on:input="validateRegistration" />
                    </md-field>
                    <md-field>
                        <label>Passwort</label>
                        <md-input autofocus type="password" v-model="user.password" required v-on:input="validateRegistration" />
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button id="registerBtn" @click="register" class="md-raised md-primary" disabled>Submit</md-button>
                </md-card-actions>
            </form>
        </md-content>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    street: '',
                    zipcode: '',
                    city: '',
                    mail: '',
                    password: ''
                },
                regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            };
        },

        methods: {
            validateRegistration: function () {
                var self = this,
                    mailOk = self.validEmail(self.user.mail),
                    passwordOk = self.validPassword(self.user.password);
                if (mailOk && passwordOk) {
                    registerBtn.disabled = false;
                } else {
                    registerBtn.disabled = true;
                }
            },
            validEmail: function (email) {
                var self = this;
                return self.regExpMail.test(email);
            },
            validPassword: function (password) {
                var self = this,
                    passwordLength = password.length;
                if (passwordLength >= 6) {
                    return true;
                } else {
                    return false;
                }
            },
            navigateBack: function (password) {
                this.$router.push('welcome');
            },
            register: function () {
                var self = this;
                console.log(self.user);
                self.$http.post(RESTURL + '/register', {
                    user: self.user
                }).then(function (response) {
                    console.log(response);
                    self.navigateBack();
                }, function (response) {
                    console.error(response);
                });
            }
        }
    };
</script>