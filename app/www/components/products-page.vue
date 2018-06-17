<template>
    <div id="productsPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkte</span>
            <div class="md-toolbar-section-end">
                <md-button class="md-primary" v-if="!buyhistory && isBuyer" @click="buyhistory=true; getItems()">Zur Kaufhistorie</md-button>
                <md-button class="md-primary" v-if="buyhistory && isBuyer" @click="buyhistory=false; getItems()">Zur Artikelliste</md-button>
            </div>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <md-empty-state v-if="!isBuyer && !items.length" md-icon="store" md-label="Noch nichts verkauft" md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!">
                <md-button @click="addItem" class="md-primary md-raised">Produkt anbieten</md-button>
            </md-empty-state>
            <div>
                <div v-if="items.length">
                    <md-list class="md-double-line">
                        <md-list-item v-for="(item, index) in items" :key="index" class="product-list" @click="openItem(item.id)" v-bind:class="{'sold-item': (item.buyer)}">
                            <md-avatar>
                                <img :src="imgURL + '/' + item.id + '.png'" alt="Produktbild" onerror="this.src='img/logo.png'">
                            </md-avatar>
                            <div class="md-list-item-text">
                                <span>{{ item.title}}</span>
                                <span>{{ item.description}}</span>
                            </div>
                            <div class="md-subhead location-icon-pin" v-if="isBuyer && !buyhistory && item.distance">
                                <md-icon>location_on</md-icon>
                                <span>{{item.distance}}</span>
                            </div>
                            <span><b>{{ item.price}}€</b></span>
                        </md-list-item>
                        <md-list>
                </div>
                <md-empty-state v-if="isBuyer && !items.length" md-icon="shopping_basket" md-label="Noch nichts los" md-description="Keine passenden Produkte gefunden. Probiere es doch später einmal erneut!">
                </md-empty-state>
            </div>
            <md-speed-dial :class="topPosition" md-direction="bottom" class="md-bottom-right add-product-speed-dial-btn" v-if="!isBuyer">
                <md-speed-dial-target @click="addItem" class="md-accent">
                    <md-icon>add</md-icon>
                </md-speed-dial-target>
            </md-speed-dial>
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
                loading: false,
                showSidebar: false,
                isBuyer: false,
                items: [],
                buyhistory: false,
                imgURL: RESTURL
            }
        },
        components: {
            Sidebar: Sidebar
        },
        watch: {
            '$route.query': 'getItems'
        },
        methods: {
            addItem: function () {
                this.$router.push('addItem');
            },
            getItems: function () {
                var self = this,
                    articles = [],
                    processedArticles = 0;

                self.loading = true;
                self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true) ? true : false);

                self.$http.get(RESTURL + ((self.isBuyer) ? ((self.buyhistory)? '/boughtarticles' : '/articles') : '/soldarticles'), {}).then(function (response) {
                    // retrieve distance for each article
                    if(response.body.articles && response.body.articles.length) {
                        // get current position
                        navigator.geolocation.getCurrentPosition(function(positionObj) {
                            response.body.articles.forEach(function(articleObj) {
                                self.$http.get(RESTURL + '/location', {
                                    params: {
                                        article: articleObj.id,
                                        lat: positionObj.coords.latitude,
                                        lng: positionObj.coords.longitude
                                    }
                                }).then(function(locationResponse) {
                                    // attach the destination
                                    articleObj.distance = locationResponse.body.distance;
                                    articles.push(articleObj);
                                    if(!response.body.articles || !response.body.articles.length) self.loading = false;
                                    if(++processedArticles === response.body.articles.length) {
                                        self.loading = false;
                                        self.items = articles;
                                    }
                                }, function(error) {
                                    // location could not be resolved
                                    articles.push(articleObj);
                                    if(!response.body.articles || !response.body.articles.length) self.loading = false;
                                    if(++processedArticles === response.body.articles.length) {
                                        self.loading = false;
                                        self.items = articles;
                                    }
                                });
                            });
                        }, function(err) {
                            self.loading = false;
                            console.error(err); // TODO show dialog that location could not be resolved (permission denied?) + Cordova Plugin GeoLocation
                        }, {enableHighAccuracy: true});
                    }
                }, function (error) {
                    console.error(error);
                    self.loading = false;
                });
            },
            openItem: function(id) {
                this.$router.push({path: 'product', query: {id: id, isBuyer: this.isBuyer, buyhistory: this.buyhistory}});
            }
        },
        created: function () {
            this.getItems();
        }
    }
</script>