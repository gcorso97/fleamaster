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
                        <md-input autofocus type="text" v-model="user.mail" required />
                    </md-field>
                    <md-field>
                        <label>Passwort</label>
                        <md-input autofocus type="password" v-model="user.password" required />
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button id="updateBtn" @click="update" class="md-raised md-primary">Daten aktualisieren</md-button>
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
        update: function () {
            var self = this;
            
            self.$http.put(RESTURL + '/user', {
                user: self.user
            }).then(function (response) {
                self.$router.push('welcome');
            }, function (response) {
                console.error(response);
            });
        },
        getUserData: function() {
            var self = this;

            self.user = {};

            self.$http.get(RESTURL + '/user', {}).then(function (response) {
                if(response.body.user && response.body.user[0] != null) {
                    self.user = response.body.user[0];
                    self.user.password = '';
                }
            }, function (response) {
                console.error(response);
            });
        }
    },
    created: function() {
        this.getUserData();
    }
};
</script>