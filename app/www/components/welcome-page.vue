<template>
    <div id="welcomePage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Dashboard</span>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <p class="md-display-1 welcome-title">Willkommen zurück!</p>
            <div class="half-cards">
                <md-card class="half-card left">
                    <md-card-header>
                        <div class="md-title">7</div>
                        <div class="md-subhead">Produkte gekauft</div>
                    </md-card-header>
                    <md-card-content>
                        Durchstöbere FleaMaster und kaufe Produkte, die Dir gefallen!
                    </md-card-content>
                    <md-card-actions>
                        <md-button @click="productsPage(true)">Produkte kaufen</md-button>
                    </md-card-actions>
                </md-card>
                <md-card class="half-card right">
                    <md-card-header>
                        <div class="md-title">4</div>
                        <div class="md-subhead">Produkte verkauft</div>
                    </md-card-header>
                    <md-card-content>
                        Verkaufe Sachen in FleaMaster, die Du nicht mehr benötigst!
                    </md-card-content>
                    <md-card-actions>
                        <md-button @click="productsPage(false)">Produkte verkaufen</md-button>
                    </md-card-actions>
                </md-card>
            </div>
            <p class="md-headline recommendation-title">Empfehlung des Tages</p>
            <md-card md-with-hover>
                <md-ripple>
                    <md-card-header>
                        <md-card-header-text>
                            <div class="md-title">FleaMaster Demo</div>
                            <div class="md-subhead">Ein cooles Produkt</div>
                        </md-card-header-text>
                        <md-card-media md-big>
                            <img src="./../img/logo.png" alt="Produkt">
                        </md-card-media>
                    </md-card-header>
                </md-ripple>
            </md-card>
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
                showSidebar: false
            }
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {
            productsPage: function (isBuyer) {
                this.$router.push({
                    path: 'products',
                    query: {
                        isBuyer: isBuyer
                    }
                });
            },
            logout: function () {
                var self = this;
                self.$http.post(RESTURL + '/logout').then(function (response) {
                    // success
                    self.loading = true;
                    console.log(response);
                    self.$router.push('/');
                }, function (response) {
                    // error
                    self.loading = false;
                    console.error(response);
                });
            }
        }
    }
</script>