<template>
    <div id="userProfilePage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Profil</span>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content class="md-elevation-3">
            <form @submit.prevent="updateUser">
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
                        <md-input autofocus type="text" v-model="user.mail" required v-on:input="validateRegistration"/>
                    </md-field>
                    <md-field>
                        <label>Passwort</label>
                        <md-input autofocus type="password" v-model="user.password" required v-on:input="validateRegistration"/>
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button id="updateBtn" @click="update" class="md-raised md-primary">aktualisieren</md-button>
                </md-card-actions>
            </form>
        </md-content>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Sidebar from './sidebar.vue';
export default {
    data: function () {
        return {
            showSidebar: false,
            user: {
                firstname: '',
                lastname: '',
                street: '',
                zipcode: '',
                city: '',
                mail: '',
                password: ' '
            },
            regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };
    },
    components: {
        Sidebar: Sidebar
    },
    methods: {
        validateRegistration: function () {
            var self = this,
                mailOk = self.validEmail(self.user.mail),
                passwordOk = self.validPassword(self.user.password);
            if (mailOk && passwordOk) {
                updateBtn.disabled = false;
            } else {
                updateBtn.disabled = true;
            }
        },
        validEmail: function (email) {
            var self = this;
            return self.regExpMail.test(email);
        },
        validPassword: function (pass) {
            var self = this,
                passwordLength = pass.length;
            if (passwordLength >= 6) {
                return true;
            } else {
                return false;
            }
        },
        navigateBack: function (password) {
            this.$router.push('welcome');
        },
        update: function () {
            var self = this;
            console.log("send:::: "+self.user.firstname);
            self.$http.put(RESTURL + '/updateUser', {
                user: self.user
            }).then(function (response) {
                console.log(response);
                self.navigateBack();
            }, function (response) {
                console.error(response);
            });
        },
        getUserData: function(){
            this.$http.get(RESTURL + '/user', {
            }).then(function (response) {
                console.log(response)
                this.user = response.body.user[0];
                this.user.password = '';
            }, function (response) {
                console.error(response);
            });
        }
    },
    beforeMount(){
        this.getUserData();
    }
};
</script>
