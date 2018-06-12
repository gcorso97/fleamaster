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
                        <div class="md-title">{{dashboardInfo.bought}}</div>
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
                        <div class="md-title">{{dashboardInfo.sold}}</div>
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
            <div v-if="dashboardInfo.article && dashboardInfo.article.id">
                <p class="md-headline recommendation-title">Empfehlung des Tages</p>
                <md-card md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">{{dashboardInfo.article.title}}</div>
                                <div class="md-subhead">{{dashboardInfo.article.description}}</div>
                            </md-card-header-text>
                            <md-card-media>
                                <img :src="imgURL + '/' + dashboardInfo.article.id + '.png'" alt="Produktbild" onerror="this.src='img/logo.png'">
                            </md-card-media>
                        </md-card-header>
                        <md-card-actions>
                            <span><b>{{dashboardInfo.article.price}}€</b></span>
                            <md-button>
                                <md-icon class="md-primary">shopping_cart</md-icon>
                            </md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
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
                loading: true,
                showSidebar: false,
                dashboardInfo: {},
                imgURL: RESTURL
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
            }
        },
        created: function () {
            var self = this;

            self.$http.get(RESTURL + '/dashboard', {}).then(function (response) {
                self.loading = false;
                self.dashboardInfo = response.body;
            }, function (error) {
                self.loading = false;
                console.error(error);
            });
        }
    }
</script>