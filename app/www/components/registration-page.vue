<template>
    <div id="registrationPage" class="page-container md-layout-column">
        <md-content class="md-elevation-3">
            <form @submit.prevent="register">
                <md-steppers :md-active-step.sync="active" md-linear>
                    <md-step id="first" md-label="Anmeldedaten" :md-done.sync="first" :md-error="firstStepError" :md-editable="false">
                        <md-field>
                            <label>E-Mail</label>
                            <md-input autofocus type="text" v-model="user.mail" required />
                        </md-field>
                        <md-field>
                            <label>Passwort</label>
                            <md-input autofocus type="password" v-model="user.password" required />
                        </md-field>
                        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Weiter</md-button>
                    </md-step>
                    <md-step id="second" md-label="Persönliche Daten" :md-done.sync="second" :md-error="secondStepError" :md-editable="false">
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
                        <md-button @click="setDone('second')" class="md-raised md-primary">Registrieren</md-button>
                    </md-step>
                </md-steppers>
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
                active: 'first',
                firstStepError: '',
                secondStepError: '',
                regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            };
        },

        methods: {
            setDone: function(id, index) {
                var self = this,
                    proceed = function() {
                        self[id] = true;
                        self.firstStepError = self.secondStepError = '';
                        if(index) self.active = index;
                    };

                if(id === 'first') {
                    // validate registration
                    if(self.validEmail(self.user.mail) && self.validPassword(self.user.password)) proceed();
                    else self.firstStepError = 'Überprüfe die Daten.';
                } else if(id === 'second') {
                    // validate inputs
                    if(self.user.firstname && self.user.lastname && self.user.street && self.user.zipcode && self.user.city) {
                        // register account
                        self.register();
                    } else self.secondStepError = 'Überprüfe die Daten.';
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
                    self.navigateBack();
                }, function (response) {
                    console.error(response);
                    self.secondStepError = 'Da ist was schief gelaufen.';
                });
            }
        }
    };
</script>