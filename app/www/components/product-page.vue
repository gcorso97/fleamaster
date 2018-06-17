<template>
    <div id="productPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkt</span>
            <div class="md-toolbar-section-end" v-if="article && isBuyer && !buyhistory">
                <md-button class="md-primary" @click="buy(article.id)">Für {{article.price}}€ kaufen</md-button>
            </div>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <md-card class="md-card-example" v-if="article">
                <md-card-area md-inset>
                    <md-card-media md-ratio="16:9" class="product-image">
                        <img :src="imgURL + '/' + article.id + '.png'" alt="Produktbild" onerror="this.src='img/logo.png'">
                    </md-card-media>
                    <md-card-header>
                        <h2 class="md-title">{{article.title}}</h2>
                        <div class="md-subhead" v-if="distance">
                            <md-icon>location_on</md-icon>
                            <span>{{distance}}</span>
                        </div>
                    </md-card-header>
                    <md-card-content>{{article.description}}</md-card-content>
                </md-card-area>
                <md-card-content>
                    <div>
                        <md-button class="location-icon" @click="navigate()" v-if="isMobile">
                            <md-icon>navigation</md-icon>
                        </md-button>
                        <h3 class="md-subheading location-heading" v-if="distance">Standort</h3>
                    </div>
                    <div id="map" ref="map"></div>
                </md-card-content>
            </md-card>
            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
        </md-content>
    </div>
</template>

<script>
    import Sidebar from './sidebar.vue';

    export default {
        data: function () {
            return {
                showSidebar: false,
                loading: false,
                article: false,
                isBuyer: false,
                buyhistory: false,
                imgURL: RESTURL,
                distance: '',
                coords: {},
                isMobile: (typeof window.cordova !== 'undefined')
            }
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {
            buy: function(id) {
                var self = this;

                self.loading = true;
                self.$http.post(RESTURL + '/buy', {
                    id: id
                }).then(function () {
                    self.loading = false;
                    self.$router.push({path: 'products', query: {isBuyer: true}});
                }, function (error) {
                    console.log(error);
                    self.loading = false;
                });
            },
            navigate: function() {
                var self = this;

                if(typeof window.launchnavigator !== 'undefined' && self.coords.lat && self.coords.lng) {
                    launchnavigator.navigate([self.coords.lat, self.coords.lng]);
                }
            }
        },
        created: function () {
            var self = this;

            self.loading = true;
            self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true) ? true : false);
            self.buyhistory = ((self.$route.query.buyhistory === 'true' || self.$route.query.buyhistory === true) ? true : false);

            self.$http.get(RESTURL + '/article', {
                params: {
                    id: parseInt(self.$route.query.id)
                }
            }).then(function (response) {
                self.article = response.body.article;
                // get current position
                navigator.geolocation.getCurrentPosition(function(positionObj) {
                    // retrieve location info for article
                    self.$http.get(RESTURL + '/location', {
                        params: {
                            article: parseInt(self.$route.query.id),
                            lat: positionObj.coords.latitude,
                            lng: positionObj.coords.longitude
                        }
                    }).then(function(response) {
                        self.loading = false;
                        if(response.body.distance && response.body.lat && response.body.lng) {
                            // build the map
                            var map = new google.maps.Map(self.$refs.map, {
                                zoom: 16,
                                center: {lat: response.body.lat, lng: response.body.lng}
                            }),
                            marker = new google.maps.Marker({
                                position: {lat: response.body.lat, lng: response.body.lng},
                                map: map
                            });
                            self.distance = response.body.distance;
                            self.$refs.map.hidden = false;
                            self.coords = {lat: response.body.lat, lng: response.body.lng};
                        } else self.$refs.map.hidden = true;
                    }, function(error) {
                        self.loading = false;
                        self.$refs.map.hidden = true;
                        console.error(error);
                    });
                }, function(err) {
                    self.loading = false;
                    console.error(err); // TODO show dialog that location could not be resolved (permission denied?) + Cordova Plugin GeoLocation
                }, {enableHighAccuracy: true});
            }, function (error) {
                self.loading = false;
                console.error(error);
            });
        }
    }
</script>